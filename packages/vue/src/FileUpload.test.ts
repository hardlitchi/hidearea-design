import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FileUpload from './FileUpload.vue';
import { HaFileUpload } from '@hidearea-design/core';

// Register the custom element globally for testing environments
if (!customElements.get('ha-file-upload')) {
  customElements.define('ha-file-upload', HaFileUpload);
}

describe('FileUpload (Vue Wrapper)', () => {
  it('should render the ha-file-upload web component', () => {
    const wrapper = mount(FileUpload);
    expect(wrapper.find('ha-file-upload').exists()).toBe(true);
  });

  it('should pass props to the web component', async () => {
    const wrapper = mount(FileUpload, {
      props: {
        multiple: true,
        disabled: true,
        label: 'Test Label',
        maxSize: 1024,
      },
    });

    const webComponent = wrapper.find('ha-file-upload').element as HaFileUpload;

    expect(webComponent.multiple).toBe(true);
    expect(webComponent.disabled).toBe(true);
    expect(webComponent.getAttribute('label')).toBe('Test Label');
    expect(webComponent.maxSize).toBe(1024);
  });

  it('should emit file-select event', async () => {
    const wrapper = mount(FileUpload);

    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const event = new CustomEvent('file-select', {
      detail: {
        files: [file],
        validFiles: [file],
        invalidFiles: [],
      },
    });

    const webComponent = wrapper.find('ha-file-upload').element;
    webComponent.dispatchEvent(event);

    expect(wrapper.emitted('file-select')).toHaveLength(1);
    expect(wrapper.emitted('file-select')![0]).toEqual([[file], [file], []]);
  });

  it('should expose public methods via expose', () => {
    const wrapper = mount(FileUpload);
    const vm = wrapper.vm as unknown as {
      getFiles: () => File[];
      addFiles: (files: File[]) => void;
      removeFile: (fileOrId: File | string) => void;
      clearFiles: () => void;
      validate: () => boolean;
      openFilePicker: () => void;
    };

    // Mock the web component's methods
    const webComponent = wrapper.find('ha-file-upload').element as HaFileUpload;
    webComponent.getFiles = vi.fn(() => [new File([''], 'mock.txt')]);
    webComponent.addFiles = vi.fn();
    webComponent.removeFile = vi.fn();
    webComponent.clearFiles = vi.fn();
    webComponent.validate = vi.fn(() => true);
    webComponent.openFilePicker = vi.fn();

    vm.getFiles();
    expect(webComponent.getFiles).toHaveBeenCalled();

    const file = new File([''], 'test.txt');
    vm.addFiles([file]);
    expect(webComponent.addFiles).toHaveBeenCalledWith([file]);

    vm.removeFile(file);
    expect(webComponent.removeFile).toHaveBeenCalledWith(file);

    vm.clearFiles();
    expect(webComponent.clearFiles).toHaveBeenCalled();

    vm.validate();
    expect(webComponent.validate).toHaveBeenCalled();

    vm.openFilePicker();
    expect(webComponent.openFilePicker).toHaveBeenCalled();
  });
});
