import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface FileUploadArgs {
  variant: "default" | "compact" | "button";
  multiple: boolean;
  accept: string;
  maxSize: number;
  maxFiles: number;
  disabled: boolean;
  required: boolean;
  error: boolean;
  showFileList: boolean;
  showPreview: boolean;
  label: string;
  placeholder: string;
  dragDropText: string;
  helperText: string;
  errorText: string;
}

const meta: Meta<FileUploadArgs> = {
  title: "Components/FileUpload",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "button"],
      description: "FileUpload variant",
    },
    multiple: {
      control: { type: "boolean" },
      description: "Allow multiple file selection",
    },
    accept: {
      control: { type: "text" },
      description: "Accepted file types",
    },
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in bytes",
    },
    maxFiles: {
      control: { type: "number" },
      description: "Maximum number of files",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    required: {
      control: { type: "boolean" },
      description: "Required state",
    },
    error: {
      control: { type: "boolean" },
      description: "Error state",
    },
    showFileList: {
      control: { type: "boolean" },
      description: "Show file list",
    },
    showPreview: {
      control: { type: "boolean" },
      description: "Show file preview",
    },
    label: {
      control: { type: "text" },
      description: "Label text",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    dragDropText: {
      control: { type: "text" },
      description: "Drag and drop text",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text",
    },
    errorText: {
      control: { type: "text" },
      description: "Error message",
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadArgs>;

export const Default: Story = {
  args: {
    variant: "default",
    multiple: false,
    accept: "",
    maxSize: 0,
    maxFiles: 0,
    disabled: false,
    required: false,
    error: false,
    showFileList: true,
    showPreview: false,
    label: "",
    placeholder: "",
    dragDropText: "",
    helperText: "",
    errorText: "",
  },
  render: (args) => html`
    <ha-file-upload
      variant="${args.variant}"
      ?multiple="${args.multiple}"
      accept="${args.accept}"
      max-size="${args.maxSize}"
      max-files="${args.maxFiles}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?show-file-list="${args.showFileList}"
      ?show-preview="${args.showPreview}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      drag-drop-text="${args.dragDropText}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
    ></ha-file-upload>
  `,
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: "Upload Files",
    helperText: "Drag and drop files here or click to browse",
  },
  render: Default.render,
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
    label: "Upload Multiple Files",
    helperText: "You can select multiple files",
  },
  render: Default.render,
};

export const WithAccept: Story = {
  args: {
    ...Default.args,
    accept: "image/*",
    label: "Upload Images Only",
    helperText: "Only image files are accepted",
  },
  render: Default.render,
};

export const WithMaxSize: Story = {
  args: {
    ...Default.args,
    maxSize: 5242880, // 5MB
    label: "Upload File (Max 5MB)",
    helperText: "Maximum file size is 5MB",
  },
  render: Default.render,
};

export const WithMaxFiles: Story = {
  args: {
    ...Default.args,
    multiple: true,
    maxFiles: 3,
    label: "Upload up to 3 Files",
    helperText: "You can upload maximum 3 files",
  },
  render: Default.render,
};

export const WithPreview: Story = {
  args: {
    ...Default.args,
    multiple: true,
    accept: "image/*",
    showPreview: true,
    label: "Upload Images with Preview",
    helperText: "Image preview will be shown",
  },
  render: Default.render,
};

export const CompactVariant: Story = {
  args: {
    ...Default.args,
    variant: "compact",
    label: "Compact File Upload",
  },
  render: Default.render,
};

export const ButtonVariant: Story = {
  args: {
    ...Default.args,
    variant: "button",
    placeholder: "Choose File",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    label: "Disabled File Upload",
  },
  render: Default.render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: "Please upload a valid file",
    label: "File Upload with Error",
  },
  render: Default.render,
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
    label: "Required File Upload",
    helperText: "This field is required",
  },
  render: Default.render,
};

export const WithEvents: Story = {
  args: {
    ...Default.args,
    multiple: true,
    label: "File Upload with Events",
    helperText: "Check the Actions panel for events",
  },
  render: (args) => html`
    <ha-file-upload
      variant="${args.variant}"
      ?multiple="${args.multiple}"
      accept="${args.accept}"
      max-size="${args.maxSize}"
      max-files="${args.maxFiles}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?show-file-list="${args.showFileList}"
      ?show-preview="${args.showPreview}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      drag-drop-text="${args.dragDropText}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      @file-select="${(e: CustomEvent) => {
        console.log("Files selected:", e.detail);
      }}"
      @file-remove="${(e: CustomEvent) => {
        console.log("File removed:", e.detail);
      }}"
      @file-clear="${(e: CustomEvent) => {
        console.log("Files cleared:", e.detail);
      }}"
      @validation-error="${(e: CustomEvent) => {
        console.log("Validation error:", e.detail);
      }}"
    ></ha-file-upload>
  `,
};
