import { fileUploadStyles } from "./file-upload.styles";

export interface FileUploadFile {
  file: File;
  id: string;
  preview?: string;
  error?: string;
}

export type FileUploadVariant = "default" | "compact" | "button";

export class HaFileUpload extends HTMLElement {
  private _files: FileUploadFile[] = [];
  private _dragCounter = 0;
  private _isDragging = false;

  private dropzoneElement!: HTMLDivElement;
  private inputElement!: HTMLInputElement;
  private fileListElement!: HTMLDivElement;
  private errorElement!: HTMLDivElement;

  static get observedAttributes() {
    return [
      "multiple",
      "accept",
      "max-size",
      "max-files",
      "disabled",
      "variant",
      "show-preview",
      "show-file-list",
      "required",
      "error",
      "label",
      "placeholder",
      "drag-drop-text",
      "helper-text",
      "error-text",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
    this.revokeObjectURLs();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Public API
  getFiles(): File[] {
    return this._files.map((f) => f.file);
  }

  addFiles(files: File[]): void {
    // Don't add files if disabled
    if (this.disabled) {
      return;
    }

    // Clear existing files if not multiple
    if (!this.multiple) {
      this.revokeObjectURLs();
      this._files = [];
    }

    const validatedFiles = this.validateFiles(files);
    this._files.push(...validatedFiles.valid);

    if (validatedFiles.invalid.length > 0) {
      this.dispatchValidationError(validatedFiles.invalid);
    }

    this.updateFileList();
    this.dispatchFileSelect();
  }

  removeFile(fileOrId: File | string): void {
    const id = typeof fileOrId === "string" ? fileOrId : this.getFileId(fileOrId);
    const index = this._files.findIndex((f) => f.id === id);

    if (index !== -1) {
      const removed = this._files[index];
      this.revokeObjectURL(removed);
      this._files.splice(index, 1);
      this.updateFileList();
      this.dispatchFileRemove(removed.file);
    }
  }

  clearFiles(): void {
    const clearedFiles = this._files.map((f) => f.file);
    this.revokeObjectURLs();
    this._files = [];
    this.updateFileList();
    this.dispatchFileClear(clearedFiles);
  }

  validate(): boolean {
    if (this.required && this._files.length === 0) {
      this.showError("At least one file is required");
      return false;
    }
    this.hideError();
    return true;
  }

  openFilePicker(): void {
    if (!this.disabled) {
      this.inputElement.click();
    }
  }

  // Getters
  get multiple(): boolean {
    return this.hasAttribute("multiple");
  }

  set multiple(value: boolean) {
    if (value) {
      this.setAttribute("multiple", "");
    } else {
      this.removeAttribute("multiple");
    }
  }

  get accept(): string {
    return this.getAttribute("accept") || "";
  }

  set accept(value: string) {
    this.setAttribute("accept", value);
  }

  get maxSize(): number {
    const value = this.getAttribute("max-size");
    return value ? parseInt(value, 10) : Infinity;
  }

  set maxSize(value: number) {
    this.setAttribute("max-size", String(value));
  }

  get maxFiles(): number {
    const value = this.getAttribute("max-files");
    return value ? parseInt(value, 10) : Infinity;
  }

  set maxFiles(value: number) {
    this.setAttribute("max-files", String(value));
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get variant(): FileUploadVariant {
    return (this.getAttribute("variant") as FileUploadVariant) || "default";
  }

  set variant(value: FileUploadVariant) {
    this.setAttribute("variant", value);
  }

  get showPreview(): boolean {
    return this.hasAttribute("show-preview");
  }

  set showPreview(value: boolean) {
    if (value) {
      this.setAttribute("show-preview", "");
    } else {
      this.removeAttribute("show-preview");
    }
  }

  get showFileList(): boolean {
    return this.getAttribute("show-file-list") !== "false";
  }

  set showFileList(value: boolean) {
    this.setAttribute("show-file-list", String(value));
  }

  get required(): boolean {
    return this.hasAttribute("required");
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }

  get error(): boolean {
    return this.hasAttribute("error");
  }

  set error(value: boolean) {
    if (value) {
      this.setAttribute("error", "");
    } else {
      this.removeAttribute("error");
    }
  }

  // Private methods
  private render() {
    if (!this.shadowRoot) return;

    const label = this.getAttribute("label") || "";
    const placeholder = this.getAttribute("placeholder") || "Choose files or drag and drop";
    const dragDropText = this.getAttribute("drag-drop-text") || "Drop files here";
    const helperText = this.getAttribute("helper-text") || "";
    const errorText = this.getAttribute("error-text") || "";

    this.shadowRoot.innerHTML = `
      <style>${fileUploadStyles}</style>
      <div class="file-upload file-upload--${this.variant} ${this.disabled ? "file-upload--disabled" : ""} ${this.error ? "file-upload--error" : ""}" part="container">
        ${label ? `<label class="file-upload__label" part="label">${label}${this.required ? ' <span class="required">*</span>' : ""}</label>` : ""}

        <div class="file-upload__dropzone ${this._isDragging ? "file-upload__dropzone--dragging" : ""}" part="dropzone" tabindex="${this.disabled ? "-1" : "0"}">
          <input
            type="file"
            class="file-upload__input"
            part="input"
            ${this.multiple ? "multiple" : ""}
            ${this.accept ? `accept="${this.accept}"` : ""}
            ${this.disabled ? "disabled" : ""}
          />
          <div class="file-upload__content">
            <svg class="file-upload__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="file-upload__placeholder">${this._isDragging ? dragDropText : placeholder}</p>
          </div>
        </div>

        ${this.showFileList ? `<div class="file-upload__file-list" part="file-list"></div>` : ""}

        ${helperText && !this.error ? `<p class="file-upload__helper-text" part="helper-text">${helperText}</p>` : ""}
        ${this.error && errorText ? `<p class="file-upload__error-message" part="error-message">${errorText}</p>` : ""}
        <div class="file-upload__error" part="error-message" style="display: none;"></div>
      </div>
    `;

    this.dropzoneElement = this.shadowRoot.querySelector(".file-upload__dropzone")!;
    this.inputElement = this.shadowRoot.querySelector(".file-upload__input")!;
    this.fileListElement = this.shadowRoot.querySelector(".file-upload__file-list")!;
    this.errorElement = this.shadowRoot.querySelector(".file-upload__error")!;

    this.updateFileList();
  }

  private attachEventListeners() {
    if (this.inputElement) {
      this.inputElement.addEventListener("change", this.handleFileSelect);
    }

    if (this.dropzoneElement) {
      this.dropzoneElement.addEventListener("click", this.handleDropzoneClick);
      this.dropzoneElement.addEventListener("keydown", this.handleKeyDown);
      this.dropzoneElement.addEventListener("dragenter", this.handleDragEnter);
      this.dropzoneElement.addEventListener("dragover", this.handleDragOver);
      this.dropzoneElement.addEventListener("dragleave", this.handleDragLeave);
      this.dropzoneElement.addEventListener("drop", this.handleDrop);
    }
  }

  private detachEventListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener("change", this.handleFileSelect);
    }

    if (this.dropzoneElement) {
      this.dropzoneElement.removeEventListener("click", this.handleDropzoneClick);
      this.dropzoneElement.removeEventListener("keydown", this.handleKeyDown);
      this.dropzoneElement.removeEventListener("dragenter", this.handleDragEnter);
      this.dropzoneElement.removeEventListener("dragover", this.handleDragOver);
      this.dropzoneElement.removeEventListener("dragleave", this.handleDragLeave);
      this.dropzoneElement.removeEventListener("drop", this.handleDrop);
    }
  }

  private handleFileSelect = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(Array.from(input.files));
      input.value = ""; // Reset input
    }
  };

  private handleDropzoneClick = () => {
    this.openFilePicker();
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.openFilePicker();
    }
  };

  private handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this._dragCounter++;

    if (this._dragCounter === 1 && !this.disabled) {
      this._isDragging = true;
      this.dropzoneElement.classList.add("file-upload__dropzone--dragging");
    }
  };

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  private handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this._dragCounter--;

    if (this._dragCounter === 0) {
      this._isDragging = false;
      this.dropzoneElement.classList.remove("file-upload__dropzone--dragging");
    }
  };

  private handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    this._dragCounter = 0;
    this._isDragging = false;
    this.dropzoneElement.classList.remove("file-upload__dropzone--dragging");

    if (this.disabled) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.addFiles(Array.from(files));
    }
  };

  private validateFiles(files: File[]): {
    valid: FileUploadFile[];
    invalid: Array<{ file: File; error: string }>;
  } {
    const valid: FileUploadFile[] = [];
    const invalid: Array<{ file: File; error: string }> = [];

    for (const file of files) {
      // Check max files
      if (this._files.length + valid.length >= this.maxFiles) {
        invalid.push({ file, error: `Maximum ${this.maxFiles} files allowed` });
        continue;
      }

      // Check file size
      if (file.size > this.maxSize) {
        invalid.push({
          file,
          error: `File size exceeds ${this.formatBytes(this.maxSize)}`,
        });
        continue;
      }

      // Check file type
      if (this.accept && !this.isAcceptedFileType(file)) {
        invalid.push({ file, error: `File type not accepted` });
        continue;
      }

      // Create file object
      const fileObj: FileUploadFile = {
        file,
        id: this.generateFileId(file),
      };

      // Generate preview for images
      if (this.showPreview && file.type.startsWith("image/")) {
        fileObj.preview = URL.createObjectURL(file);
      }

      valid.push(fileObj);
    }

    return { valid, invalid };
  }

  private isAcceptedFileType(file: File): boolean {
    if (!this.accept) return true;

    const acceptedTypes = this.accept.split(",").map((t) => t.trim());

    for (const type of acceptedTypes) {
      // Exact match
      if (type === file.type) return true;

      // Wildcard match (e.g., "image/*")
      if (type.endsWith("/*")) {
        const category = type.slice(0, -2);
        if (file.type.startsWith(category + "/")) return true;
      }

      // Extension match (e.g., ".pdf")
      if (type.startsWith(".")) {
        if (file.name.toLowerCase().endsWith(type.toLowerCase())) return true;
      }
    }

    return false;
  }

  private updateFileList() {
    if (!this.fileListElement || !this.showFileList) return;

    if (this._files.length === 0) {
      this.fileListElement.innerHTML = "";
      return;
    }

    this.fileListElement.innerHTML = this._files
      .map(
        (fileObj) => `
      <div class="file-upload__file-item ${fileObj.error ? "file-upload__file-item--error" : ""}" part="file-item" data-file-id="${fileObj.id}">
        ${
          fileObj.preview
            ? `<img src="${fileObj.preview}" alt="${fileObj.file.name}" class="file-upload__file-preview" part="file-preview" />`
            : `<div class="file-upload__file-icon" part="file-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                 </svg>
               </div>`
        }
        <div class="file-upload__file-info">
          <span class="file-upload__file-name" part="file-name">${fileObj.file.name}</span>
          <span class="file-upload__file-size" part="file-size">${this.formatBytes(fileObj.file.size)}</span>
          ${fileObj.error ? `<span class="file-upload__file-error">${fileObj.error}</span>` : ""}
        </div>
        <button type="button" class="file-upload__remove-button" part="remove-button" data-file-id="${fileObj.id}" aria-label="Remove ${fileObj.file.name}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `
      )
      .join("");

    // Attach remove button listeners
    const removeButtons = this.fileListElement.querySelectorAll(".file-upload__remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const fileId = (e.currentTarget as HTMLElement).dataset.fileId;
        if (fileId) {
          this.removeFile(fileId);
        }
      });
    });
  }

  private generateFileId(file: File): string {
    return `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
  }

  private getFileId(file: File): string {
    const found = this._files.find((f) => f.file === file);
    return found?.id || "";
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    if (!isFinite(bytes)) return "∞";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }

  private revokeObjectURL(fileObj: FileUploadFile) {
    if (fileObj.preview) {
      URL.revokeObjectURL(fileObj.preview);
    }
  }

  private revokeObjectURLs() {
    this._files.forEach((f) => this.revokeObjectURL(f));
  }

  private showError(message: string) {
    if (this.errorElement) {
      this.errorElement.textContent = message;
      this.errorElement.style.display = "block";
    }
  }

  private hideError() {
    if (this.errorElement) {
      this.errorElement.textContent = "";
      this.errorElement.style.display = "none";
    }
  }

  // Event dispatchers
  private dispatchFileSelect() {
    const validFiles = this._files.filter((f) => !f.error);
    const invalidFiles = this._files.filter((f) => f.error);

    this.dispatchEvent(
      new CustomEvent("file-select", {
        detail: {
          files: this._files.map((f) => f.file),
          validFiles: validFiles.map((f) => f.file),
          invalidFiles: invalidFiles.map((f) => ({
            file: f.file,
            error: f.error!,
          })),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchFileRemove(file: File) {
    this.dispatchEvent(
      new CustomEvent("file-remove", {
        detail: {
          file,
          remainingFiles: this._files.map((f) => f.file),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchFileClear(clearedFiles: File[]) {
    this.dispatchEvent(
      new CustomEvent("file-clear", {
        detail: { clearedFiles },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchValidationError(
    invalidFiles: Array<{ file: File; error: string }>
  ) {
    this.dispatchEvent(
      new CustomEvent("validation-error", {
        detail: { invalidFiles },
        bubbles: true,
        composed: true,
      })
    );
  }
}

// Register the custom element
if (!customElements.get("ha-file-upload")) {
  customElements.define("ha-file-upload", HaFileUpload);
}
