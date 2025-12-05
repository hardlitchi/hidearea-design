import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaFileUpload as HaFileUploadElement,
  FileUploadFile,
  FileUploadVariant,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface FileUploadProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "onChange" | "onInput" | "onError"
  > {
  /**
   * File upload variant
   * @default "default"
   */
  variant?: FileUploadVariant;

  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Accepted file types (e.g., "image/*,application/pdf")
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Maximum number of files
   */
  maxFiles?: number;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Required state
   * @default false
   */
  required?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Show file list
   * @default true
   */
  showFileList?: boolean;

  /**
   * Show file preview
   * @default false
   */
  showPreview?: boolean;

  /**
   * Label text
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Drag and drop text
   */
  dragDropText?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Error message
   */
  errorText?: string;

  /**
   * File select event handler
   */
  onFileSelect?: (
    files: File[],
    validFiles: File[],
    invalidFiles: Array<{ file: File; error: string }>
  ) => void;

  /**
   * File remove event handler
   */
  onFileRemove?: (file: File, remainingFiles: File[]) => void;

  /**
   * File clear event handler
   */
  onFileClear?: (clearedFiles: File[]) => void;

  /**
   * Validation error event handler
   */
  onValidationError?: (
    invalidFiles: Array<{ file: File; error: string }>
  ) => void;
}

export interface FileUploadRef {
  getFiles: () => File[];
  addFiles: (files: File[]) => void;
  removeFile: (fileOrId: File | string) => void;
  clearFiles: () => void;
  validate: () => boolean;
  openFilePicker: () => void;
}

/**
 * FileUpload component
 *
 * A React wrapper for the `ha-file-upload` web component.
 *
 * @example
 * ```tsx
 * <FileUpload
 *   multiple
 *   accept="image/*"
 *   maxSize={5242880} // 5MB
 *   onFileSelect={(files) => console.log(files)}
 * />
 * ```
 */
export const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(
  (
    {
      variant = "default",
      multiple = false,
      accept,
      maxSize,
      maxFiles,
      disabled = false,
      required = false,
      error = false,
      showFileList = true,
      showPreview = false,
      label,
      placeholder,
      dragDropText,
      helperText,
      errorText,
      onFileSelect,
      onFileRemove,
      onFileClear,
      onValidationError,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaFileUploadElement>(null);

    useImperativeHandle(ref, () => ({
      getFiles: () => elementRef.current?.getFiles() ?? [],
      addFiles: (files: File[]) => elementRef.current?.addFiles(files),
      removeFile: (fileOrId: File | string) =>
        elementRef.current?.removeFile(fileOrId),
      clearFiles: () => elementRef.current?.clearFiles(),
      validate: () => elementRef.current?.validate() ?? false,
      openFilePicker: () => elementRef.current?.openFilePicker(),
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.multiple = multiple;
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      element.showFileList = showFileList;
      element.showPreview = showPreview;

      if (accept !== undefined) {
        element.setAttribute("accept", accept);
      }
      if (maxSize !== undefined) {
        element.setAttribute("max-size", String(maxSize));
      }
      if (maxFiles !== undefined) {
        element.setAttribute("max-files", String(maxFiles));
      }
      if (label !== undefined) {
        element.setAttribute("label", label);
      }
      if (placeholder !== undefined) {
        element.setAttribute("placeholder", placeholder);
      }
      if (dragDropText !== undefined) {
        element.setAttribute("drag-drop-text", dragDropText);
      }
      if (helperText !== undefined) {
        element.setAttribute("helper-text", helperText);
      }
      if (errorText !== undefined) {
        element.setAttribute("error-text", errorText);
      }
    }, [
      variant,
      multiple,
      accept,
      maxSize,
      maxFiles,
      disabled,
      required,
      error,
      showFileList,
      showPreview,
      label,
      placeholder,
      dragDropText,
      helperText,
      errorText,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleFileSelect = (e: Event) => {
        const customEvent = e as CustomEvent<{
          files: File[];
          validFiles: File[];
          invalidFiles: Array<{ file: File; error: string }>;
        }>;
        onFileSelect?.(
          customEvent.detail.files,
          customEvent.detail.validFiles,
          customEvent.detail.invalidFiles
        );
      };

      const handleFileRemove = (e: Event) => {
        const customEvent = e as CustomEvent<{
          file: File;
          remainingFiles: File[];
        }>;
        onFileRemove?.(
          customEvent.detail.file,
          customEvent.detail.remainingFiles
        );
      };

      const handleFileClear = (e: Event) => {
        const customEvent = e as CustomEvent<{ clearedFiles: File[] }>;
        onFileClear?.(customEvent.detail.clearedFiles);
      };

      const handleValidationError = (e: Event) => {
        const customEvent = e as CustomEvent<{
          invalidFiles: Array<{ file: File; error: string }>;
        }>;
        onValidationError?.(customEvent.detail.invalidFiles);
      };

      element.addEventListener("file-select", handleFileSelect);
      element.addEventListener("file-remove", handleFileRemove);
      element.addEventListener("file-clear", handleFileClear);
      element.addEventListener("validation-error", handleValidationError);

      return () => {
        element.removeEventListener("file-select", handleFileSelect);
        element.removeEventListener("file-remove", handleFileRemove);
        element.removeEventListener("file-clear", handleFileClear);
        element.removeEventListener("validation-error", handleValidationError);
      };
    }, [onFileSelect, onFileRemove, onFileClear, onValidationError]);

    return <ha-file-upload ref={elementRef} {...props} />;
  }
);

FileUpload.displayName = "FileUpload";

// Export types
export type { FileUploadFile, FileUploadVariant };
