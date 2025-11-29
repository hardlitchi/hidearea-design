import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface SelectArgs {
  variant: 'default' | 'filled' | 'outlined';
  size: 'sm' | 'md' | 'lg';
  placeholder: string;
  disabled: boolean;
  required: boolean;
  error: boolean;
  fullWidth: boolean;
}

const meta: Meta<SelectArgs> = {
  title: 'Forms/Select',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: 'Select variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required state',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width select',
    },
  },
};

export default meta;
type Story = StoryObj<SelectArgs>;

const countryOptions = html`
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
  <option value="au">Australia</option>
  <option value="de">Germany</option>
  <option value="fr">France</option>
  <option value="jp">Japan</option>
  <option value="cn">China</option>
  <option value="in">India</option>
  <option value="br">Brazil</option>
`;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    disabled: false,
    required: false,
    error: false,
    fullWidth: false,
  },
  render: (args) => html`
    <ha-select
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
    >
      ${countryOptions}
    </ha-select>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Default Variant</h4>
        <ha-select variant="default">
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Filled Variant</h4>
        <ha-select variant="filled">
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Outlined Variant</h4>
        <ha-select variant="outlined">
          ${countryOptions}
        </ha-select>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
        <ha-select size="sm">
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
        <ha-select size="md">
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <ha-select size="lg">
          ${countryOptions}
        </ha-select>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Normal</h4>
        <ha-select>
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Error</h4>
        <ha-select error>
          ${countryOptions}
        </ha-select>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled</h4>
        <ha-select disabled>
          ${countryOptions}
        </ha-select>
      </div>
    </div>
  `,
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
  render: (args) => html`
    <ha-select
      variant="${args.variant}"
      size="${args.size}"
      ?full-width="${args.fullWidth}"
    >
      ${countryOptions}
    </ha-select>
  `,
};

export const WithFormGroup: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <ha-form-group
        label="Country"
        helper-text="Select your country of residence"
        required
      >
        <ha-select full-width>
          ${countryOptions}
        </ha-select>
      </ha-form-group>
    </div>
  `,
};

export const WithFormGroupError: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <ha-form-group
        label="Country"
        error-text="Please select a country"
        required
        error
      >
        <ha-select full-width error>
          ${countryOptions}
        </ha-select>
      </ha-form-group>
    </div>
  `,
};

export const LanguageSelector: Story = {
  render: () => html`
    <ha-select size="sm" variant="outlined">
      <option value="">Select Language</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="ja">日本語</option>
      <option value="zh">中文</option>
      <option value="ko">한국어</option>
    </ha-select>
  `,
};

export const CategorySelector: Story = {
  render: () => html`
    <ha-select full-width>
      <option value="">All Categories</option>
      <optgroup label="Electronics">
        <option value="computers">Computers</option>
        <option value="phones">Phones</option>
        <option value="tablets">Tablets</option>
      </optgroup>
      <optgroup label="Clothing">
        <option value="mens">Men's Clothing</option>
        <option value="womens">Women's Clothing</option>
        <option value="kids">Kids' Clothing</option>
      </optgroup>
      <optgroup label="Home & Garden">
        <option value="furniture">Furniture</option>
        <option value="decor">Home Decor</option>
        <option value="garden">Garden Tools</option>
      </optgroup>
    </ha-select>
  `,
};

export const MultipleSelects: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <ha-form-group
        label="Birth Date"
      >
        <div style="display: flex; gap: 0.75rem;">
          <ha-select style="flex: 2;">
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </ha-select>
          <ha-select style="flex: 1;">
            <option value="">Day</option>
            ${Array.from({ length: 31 }, (_, i) => html`
              <option value="${String(i + 1).padStart(2, '0')}">${i + 1}</option>
            `)}
          </ha-select>
          <ha-select style="flex: 1;">
            <option value="">Year</option>
            ${Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return html`<option value="${year}">${year}</option>`;
            })}
          </ha-select>
        </div>
      </ha-form-group>
    </div>
  `,
};

export const SettingsForm: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <h3 style="margin: 0 0 1rem 0;">Settings</h3>

      <ha-form-group
        label="Language"
        helper-text="Choose your preferred language"
      >
        <ha-select full-width>
          <option value="en" selected>English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
        </ha-select>
      </ha-form-group>

      <ha-form-group
        label="Timezone"
        helper-text="Select your timezone"
      >
        <ha-select full-width>
          <option value="">Select timezone</option>
          <optgroup label="North America">
            <option value="est">Eastern Time (ET)</option>
            <option value="cst">Central Time (CT)</option>
            <option value="mst">Mountain Time (MT)</option>
            <option value="pst">Pacific Time (PT)</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="gmt">GMT</option>
            <option value="cet">Central European Time (CET)</option>
            <option value="eet">Eastern European Time (EET)</option>
          </optgroup>
          <optgroup label="Asia">
            <option value="jst">Japan Standard Time (JST)</option>
            <option value="cst-asia">China Standard Time (CST)</option>
            <option value="ist">India Standard Time (IST)</option>
          </optgroup>
        </ha-select>
      </ha-form-group>

      <ha-form-group
        label="Theme"
        helper-text="Choose your color theme"
      >
        <ha-select full-width>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </ha-select>
      </ha-form-group>

      <ha-form-group
        label="Items per page"
      >
        <ha-select>
          <option value="10">10</option>
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </ha-select>
      </ha-form-group>

      <div style="margin-top: 1rem;">
        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary">Save Settings</ha-button>
        </ha-stack>
      </div>
    </div>
  `,
};

export const AllVariantsAndSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin: 0 0 1rem 0;">Default Variant</h3>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-select variant="default" size="sm">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-select variant="default" size="md">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-select variant="default" size="lg">
              ${countryOptions}
            </ha-select>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0;">Filled Variant</h3>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-select variant="filled" size="sm">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-select variant="filled" size="md">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-select variant="filled" size="lg">
              ${countryOptions}
            </ha-select>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0;">Outlined Variant</h3>
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-select variant="outlined" size="sm">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-select variant="outlined" size="md">
              ${countryOptions}
            </ha-select>
          </div>
          <div style="flex: 1;">
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-select variant="outlined" size="lg">
              ${countryOptions}
            </ha-select>
          </div>
        </div>
      </div>
    </div>
  `,
};
