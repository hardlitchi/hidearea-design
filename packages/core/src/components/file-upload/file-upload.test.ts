import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaFileUpload } from "./file-upload";

describe("HaFileUpload", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-file-upload")) {
      customElements.define("ha-file-upload", HaFileUpload);
    }
    await waitForCustomElement("ha-file-upload");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-file-upload")).toBe(HaFileUpload);
    });

    it("should create an instance", () => {
      const fileUpload = document.createElement(
        "ha-file-upload"
      ) as HaFileUpload;
      expect(fileUpload).toBeInstanceOf(HaFileUpload);
      expect(fileUpload).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const fileUpload = document.createElement(
        "ha-file-upload"
      ) as HaFileUpload;
      document.body.appendChild(fileUpload);
      expect(fileUpload.shadowRoot).not.toBeNull();
      document.body.removeChild(fileUpload);
    });
  });

  describe("Default Values", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should have default variant as default", () => {
      expect(fileUpload.variant).toBe("default");
    });

    it("should not be multiple by default", () => {
      expect(fileUpload.multiple).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(fileUpload.disabled).toBe(false);
    });

    it("should not be required by default", () => {
      expect(fileUpload.required).toBe(false);
    });

    it("should not have error state by default", () => {
      expect(fileUpload.error).toBe(false);
    });

    it("should show file list by default", () => {
      expect(fileUpload.showFileList).toBe(true);
    });

    it("should not show preview by default", () => {
      expect(fileUpload.showPreview).toBe(false);
    });

    it("should start with empty file list", () => {
      expect(fileUpload.getFiles()).toEqual([]);
    });
  });

  describe("Attributes", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should update variant attribute", () => {
      fileUpload.setAttribute("variant", "compact");
      expect(fileUpload.variant).toBe("compact");
    });

    it("should update multiple attribute", () => {
      fileUpload.setAttribute("multiple", "");
      expect(fileUpload.multiple).toBe(true);
    });

    it("should update disabled attribute", () => {
      fileUpload.setAttribute("disabled", "");
      expect(fileUpload.disabled).toBe(true);
    });

    it("should update required attribute", () => {
      fileUpload.setAttribute("required", "");
      expect(fileUpload.required).toBe(true);
    });

    it("should update error attribute", () => {
      fileUpload.setAttribute("error", "");
      expect(fileUpload.error).toBe(true);
    });

    it("should update accept attribute", () => {
      fileUpload.setAttribute("accept", "image/*");
      expect(fileUpload.accept).toBe("image/*");
    });

    it("should update maxSize attribute", () => {
      fileUpload.setAttribute("max-size", "1048576");
      expect(fileUpload.maxSize).toBe(1048576);
    });

    it("should update maxFiles attribute", () => {
      fileUpload.setAttribute("max-files", "5");
      expect(fileUpload.maxFiles).toBe(5);
    });

    it("should update showFileList attribute", () => {
      fileUpload.setAttribute("show-file-list", "false");
      expect(fileUpload.showFileList).toBe(false);
    });

    it("should update showPreview attribute", () => {
      fileUpload.setAttribute("show-preview", "true");
      expect(fileUpload.showPreview).toBe(true);
    });
  });

  describe("File Selection", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should add files programmatically", () => {
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      expect(fileUpload.getFiles()).toHaveLength(1);
      expect(fileUpload.getFiles()[0]).toBe(file);
    });

    it("should add multiple files when multiple is true", () => {
      fileUpload.multiple = true;
      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1, file2]);
      expect(fileUpload.getFiles()).toHaveLength(2);
    });

    it("should replace file when multiple is false", () => {
      fileUpload.multiple = false;
      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1]);
      fileUpload.addFiles([file2]);
      expect(fileUpload.getFiles()).toHaveLength(1);
      expect(fileUpload.getFiles()[0]).toBe(file2);
    });

    it("should emit file-select event when files are added", () => {
      const handler = vi.fn();
      fileUpload.addEventListener("file-select", handler);

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.files).toEqual([file]);
      expect(handler.mock.calls[0][0].detail.validFiles).toEqual([file]);
    });
  });

  describe("File Removal", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      fileUpload.multiple = true;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should remove file by file object", () => {
      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1, file2]);
      fileUpload.removeFile(file1);
      expect(fileUpload.getFiles()).toHaveLength(1);
      expect(fileUpload.getFiles()[0]).toBe(file2);
    });

    it("should emit file-remove event when file is removed", () => {
      const handler = vi.fn();
      fileUpload.addEventListener("file-remove", handler);

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      fileUpload.removeFile(file);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.file).toBe(file);
    });

    it("should clear all files", () => {
      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1, file2]);
      fileUpload.clearFiles();
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should emit file-clear event when files are cleared", () => {
      const handler = vi.fn();
      fileUpload.addEventListener("file-clear", handler);

      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1, file2]);
      fileUpload.clearFiles();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.clearedFiles).toHaveLength(2);
    });
  });

  describe("File Validation", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should validate file type", () => {
      fileUpload.accept = "image/*";
      const validFile = new File(["content"], "test.png", {
        type: "image/png",
      });
      const invalidFile = new File(["content"], "test.txt", {
        type: "text/plain",
      });

      fileUpload.addFiles([validFile]);
      expect(fileUpload.getFiles()).toHaveLength(1);

      fileUpload.clearFiles();
      fileUpload.addFiles([invalidFile]);
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should validate file size", () => {
      fileUpload.maxSize = 100; // 100 bytes
      const content = "a".repeat(50); // 50 bytes
      const validFile = new File([content], "small.txt", {
        type: "text/plain",
      });
      const invalidContent = "a".repeat(200); // 200 bytes
      const invalidFile = new File([invalidContent], "large.txt", {
        type: "text/plain",
      });

      fileUpload.addFiles([validFile]);
      expect(fileUpload.getFiles()).toHaveLength(1);

      fileUpload.clearFiles();
      fileUpload.addFiles([invalidFile]);
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should validate max files count", () => {
      fileUpload.multiple = true;
      fileUpload.maxFiles = 2;

      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      const file3 = new File(["content3"], "test3.txt", {
        type: "text/plain",
      });

      fileUpload.addFiles([file1, file2]);
      expect(fileUpload.getFiles()).toHaveLength(2);

      fileUpload.addFiles([file3]);
      expect(fileUpload.getFiles()).toHaveLength(2); // Should not add the 3rd file
    });

    it("should emit validation-error event for invalid files", () => {
      const handler = vi.fn();
      fileUpload.addEventListener("validation-error", handler);

      fileUpload.accept = "image/*";
      const invalidFile = new File(["content"], "test.txt", {
        type: "text/plain",
      });

      fileUpload.addFiles([invalidFile]);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.invalidFiles).toHaveLength(1);
      expect(handler.mock.calls[0][0].detail.invalidFiles[0].file).toBe(
        invalidFile
      );
      expect(handler.mock.calls[0][0].detail.invalidFiles[0].error).toContain(
        "type"
      );
    });
  });

  describe("Drag and Drop", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should handle dragenter event", () => {
      const dropzone = queryShadow(
        fileUpload,
        ".file-upload__dropzone"
      ) as HTMLDivElement;
      const event = new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true,
      });

      dropzone?.dispatchEvent(event);

      expect(
        dropzone?.classList.contains("file-upload__dropzone--dragging")
      ).toBe(true);
    });

    it("should handle dragleave event", () => {
      const dropzone = queryShadow(
        fileUpload,
        ".file-upload__dropzone"
      ) as HTMLDivElement;

      // First enter
      const enterEvent = new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true,
      });
      dropzone?.dispatchEvent(enterEvent);

      // Then leave
      const leaveEvent = new DragEvent("dragleave", {
        bubbles: true,
        cancelable: true,
      });
      dropzone?.dispatchEvent(leaveEvent);

      expect(
        dropzone?.classList.contains("file-upload__dropzone--dragging")
      ).toBe(false);
    });

    it("should handle drop event with files", () => {
      const dropzone = queryShadow(
        fileUpload,
        ".file-upload__dropzone"
      ) as HTMLDivElement;

      const file = new File(["content"], "test.txt", { type: "text/plain" });

      // Create a mock DataTransfer with files
      const mockDataTransfer = {
        files: [file] as unknown as FileList,
        items: {
          add: vi.fn(),
        },
        types: ['Files'],
      };

      const event = new DragEvent("drop", {
        bubbles: true,
        cancelable: true,
      });

      // Manually set dataTransfer on the event
      Object.defineProperty(event, 'dataTransfer', {
        value: mockDataTransfer,
        writable: false,
      });

      dropzone?.dispatchEvent(event);

      expect(fileUpload.getFiles()).toHaveLength(1);
    });

    it("should not handle drag events when disabled", () => {
      fileUpload.disabled = true;

      const dropzone = queryShadow(
        fileUpload,
        ".file-upload__dropzone"
      ) as HTMLDivElement;
      const event = new DragEvent("dragenter", {
        bubbles: true,
        cancelable: true,
      });

      dropzone?.dispatchEvent(event);

      expect(
        dropzone?.classList.contains("file-upload__dropzone--dragging")
      ).toBe(false);
    });
  });

  describe("Variants", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should apply default variant class", () => {
      fileUpload.variant = "default";
      const container = queryShadow(
        fileUpload,
        ".file-upload--default"
      ) as HTMLDivElement;
      expect(container).not.toBeNull();
    });

    it("should apply compact variant class", () => {
      fileUpload.variant = "compact";
      const container = queryShadow(
        fileUpload,
        ".file-upload--compact"
      ) as HTMLDivElement;
      expect(container).not.toBeNull();
    });

    it("should apply button variant class", () => {
      fileUpload.variant = "button";
      const container = queryShadow(
        fileUpload,
        ".file-upload--button"
      ) as HTMLDivElement;
      expect(container).not.toBeNull();
    });
  });

  describe("Public API", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should expose getFiles method", () => {
      expect(typeof fileUpload.getFiles).toBe("function");
      expect(fileUpload.getFiles()).toEqual([]);
    });

    it("should expose addFiles method", () => {
      expect(typeof fileUpload.addFiles).toBe("function");
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      expect(fileUpload.getFiles()).toHaveLength(1);
    });

    it("should expose removeFile method", () => {
      expect(typeof fileUpload.removeFile).toBe("function");
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      fileUpload.removeFile(file);
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should expose clearFiles method", () => {
      expect(typeof fileUpload.clearFiles).toBe("function");
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      fileUpload.clearFiles();
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should expose validate method", () => {
      expect(typeof fileUpload.validate).toBe("function");
      expect(fileUpload.validate()).toBe(true);
    });

    it("should expose openFilePicker method", () => {
      expect(typeof fileUpload.openFilePicker).toBe("function");
    });
  });

  describe("Validation Method", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should return true when not required and no files", () => {
      fileUpload.required = false;
      expect(fileUpload.validate()).toBe(true);
    });

    it("should return false when required and no files", () => {
      fileUpload.required = true;
      expect(fileUpload.validate()).toBe(false);
    });

    it("should return true when required and has files", () => {
      fileUpload.required = true;
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      expect(fileUpload.validate()).toBe(true);
    });
  });

  describe("Disabled State", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should not add files when disabled", () => {
      fileUpload.disabled = true;
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should apply disabled class when disabled", () => {
      fileUpload.disabled = true;
      const container = queryShadow(
        fileUpload,
        ".file-upload--disabled"
      ) as HTMLDivElement;
      expect(container).not.toBeNull();
    });
  });

  describe("Error State", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should apply error class when error is true", () => {
      fileUpload.error = true;
      const container = queryShadow(
        fileUpload,
        ".file-upload--error"
      ) as HTMLDivElement;
      expect(container).not.toBeNull();
    });
  });

  describe("File List Display", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should show file list when showFileList is true", () => {
      fileUpload.showFileList = true;
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);

      const fileList = queryShadow(
        fileUpload,
        ".file-upload__file-list"
      ) as HTMLDivElement;
      expect(fileList).not.toBeNull();
    });

    it("should hide file list when showFileList is false", () => {
      fileUpload.showFileList = false;
      const file = new File(["content"], "test.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);

      const fileList = queryShadow(
        fileUpload,
        ".file-upload__file-list"
      ) as HTMLDivElement;
      expect(fileList).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    let fileUpload: HaFileUpload;

    beforeEach(() => {
      fileUpload = document.createElement("ha-file-upload") as HaFileUpload;
      document.body.appendChild(fileUpload);
    });

    afterEach(() => {
      document.body.removeChild(fileUpload);
    });

    it("should handle zero-byte files", () => {
      const file = new File([], "empty.txt", { type: "text/plain" });
      fileUpload.addFiles([file]);
      expect(fileUpload.getFiles()).toHaveLength(1);
    });

    it("should handle files with no extension", () => {
      const file = new File(["content"], "noextension", {
        type: "text/plain",
      });
      fileUpload.addFiles([file]);
      expect(fileUpload.getFiles()).toHaveLength(1);
    });

    it("should handle duplicate file names", () => {
      fileUpload.multiple = true;
      const file1 = new File(["content1"], "duplicate.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "duplicate.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1, file2]);
      expect(fileUpload.getFiles()).toHaveLength(2);
    });

    it("should handle adding empty file array", () => {
      fileUpload.addFiles([]);
      expect(fileUpload.getFiles()).toHaveLength(0);
    });

    it("should handle removing non-existent file", () => {
      const file1 = new File(["content1"], "test1.txt", {
        type: "text/plain",
      });
      const file2 = new File(["content2"], "test2.txt", {
        type: "text/plain",
      });
      fileUpload.addFiles([file1]);
      fileUpload.removeFile(file2); // Try to remove file that wasn't added
      expect(fileUpload.getFiles()).toHaveLength(1);
    });

    it("should handle clearing when no files exist", () => {
      fileUpload.clearFiles();
      expect(fileUpload.getFiles()).toHaveLength(0);
    });
  });
});
