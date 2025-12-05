import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from './FileUpload';

describe('FileUpload (React Wrapper)', () => {
  it('should render the web component', () => {
    render(<FileUpload />);
    const { container } = render(<FileUpload />);
    const fileUploadElement = container.querySelector('ha-file-upload');
    expect(fileUploadElement).toBeInTheDocument();
    expect(fileUploadElement?.tagName.toLowerCase()).toBe('ha-file-upload');
  });

  it('should pass properties to the web component', () => {
    const { container } = render(<FileUpload multiple disabled label="Test Label" />);
    const fileUploadElement = container.querySelector('ha-file-upload');
    expect(fileUploadElement).toHaveAttribute('multiple');
    expect(fileUploadElement).toHaveAttribute('disabled');
    expect(fileUploadElement).toHaveAttribute('label', 'Test Label');
  });

  it('should handle file-select event', () => {
    const handleFileSelect = vi.fn();
    const { container } = render(<FileUpload onFileSelect={handleFileSelect} />);
    const fileUploadElement = container.querySelector('ha-file-upload');

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const event = new CustomEvent('file-select', {
      detail: {
        files: [file],
        validFiles: [file],
        invalidFiles: [],
      },
    });

    fireEvent(fileUploadElement, event);

    expect(handleFileSelect).toHaveBeenCalledTimes(1);
    expect(handleFileSelect).toHaveBeenCalledWith([file], [file], []);
  });

  it('should call public method via ref', () => {
    const ref = React.createRef<any>();
    const { container } = render(<FileUpload ref={ref} />);
    const fileUploadElement = container.querySelector('ha-file-upload') as any;
    fileUploadElement.getFiles = vi.fn(() => []);

    ref.current?.getFiles();
    expect(fileUploadElement.getFiles).toHaveBeenCalledTimes(1);
  });
});
