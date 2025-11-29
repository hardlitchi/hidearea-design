import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface TextareaArgs {
  variant: 'default' | 'filled' | 'outlined';
  size: 'sm' | 'md' | 'lg';
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: boolean;
  fullWidth: boolean;
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  rows: number;
}

const meta: Meta<TextareaArgs> = {
  title: 'Forms/Textarea',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: 'Textarea variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Textarea size',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Readonly state',
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
      description: 'Full width textarea',
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'Resize behavior',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible rows',
    },
  },
};

export default meta;
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Enter your message...',
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    fullWidth: false,
    resize: 'vertical',
    rows: 4,
  },
  render: (args) => html`
    <ha-textarea
      variant="${args.variant}"
      size="${args.size}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
      resize="${args.resize}"
      rows="${args.rows}"
    ></ha-textarea>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Default Variant</h4>
        <ha-textarea variant="default" placeholder="Default textarea" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Filled Variant</h4>
        <ha-textarea variant="filled" placeholder="Filled textarea" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Outlined Variant</h4>
        <ha-textarea variant="outlined" placeholder="Outlined textarea" full-width></ha-textarea>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
        <ha-textarea size="sm" placeholder="Small textarea" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
        <ha-textarea size="md" placeholder="Medium textarea" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <ha-textarea size="lg" placeholder="Large textarea" full-width></ha-textarea>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Normal</h4>
        <ha-textarea placeholder="Normal textarea" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Error</h4>
        <ha-textarea placeholder="Error textarea" error full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled</h4>
        <ha-textarea placeholder="Disabled textarea" disabled full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Readonly</h4>
        <ha-textarea
          value="This is readonly text that cannot be modified."
          readonly
          full-width
        ></ha-textarea>
      </div>
    </div>
  `,
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
  render: Default.render,
};

export const ResizeBehaviors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Vertical (default)</h4>
        <ha-textarea placeholder="Resize vertically" resize="vertical" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Horizontal</h4>
        <ha-textarea placeholder="Resize horizontally" resize="horizontal"></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Both</h4>
        <ha-textarea placeholder="Resize both directions" resize="both" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">None</h4>
        <ha-textarea placeholder="No resize" resize="none" full-width></ha-textarea>
      </div>
    </div>
  `,
};

export const WithFormGroup: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ha-form-group
        label="Message"
        helper-text="Enter your message (max 500 characters)"
        required
      >
        <ha-textarea
          placeholder="Type your message here..."
          maxlength="500"
          full-width
        ></ha-textarea>
      </ha-form-group>
    </div>
  `,
};

export const WithFormGroupError: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ha-form-group
        label="Message"
        error-text="Message must be at least 10 characters long"
        required
        error
      >
        <ha-textarea
          placeholder="Type your message here..."
          error
          full-width
        ></ha-textarea>
      </ha-form-group>
    </div>
  `,
};

export const CustomRows: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">2 Rows</h4>
        <ha-textarea placeholder="2 rows" rows="2" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">6 Rows</h4>
        <ha-textarea placeholder="6 rows" rows="6" full-width></ha-textarea>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">10 Rows</h4>
        <ha-textarea placeholder="10 rows" rows="10" full-width></ha-textarea>
      </div>
    </div>
  `,
};

export const CommentForm: Story = {
  render: () => html`
    <div style="max-width: 700px;">
      <ha-stack direction="vertical" gap="4">
        <h3 style="margin: 0;">Leave a Comment</h3>

        <ha-form-group label="Your Name" required>
          <ha-input
            type="text"
            placeholder="John Doe"
            full-width
          ></ha-input>
        </ha-form-group>

        <ha-form-group label="Email" required>
          <ha-input
            type="email"
            placeholder="john@example.com"
            full-width
          ></ha-input>
        </ha-form-group>

        <ha-form-group
          label="Comment"
          helper-text="Share your thoughts (min 10 characters)"
          required
        >
          <ha-textarea
            placeholder="Write your comment here..."
            minlength="10"
            rows="5"
            full-width
          ></ha-textarea>
        </ha-form-group>

        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary">Post Comment</ha-button>
        </ha-stack>
      </ha-stack>
    </div>
  `,
};

export const FeedbackForm: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <ha-stack direction="vertical" gap="6">
        <h2 style="margin: 0;">Feedback Form</h2>

        <ha-grid columns="2" gap="4">
          <ha-form-group label="Name" required>
            <ha-input
              type="text"
              placeholder="Your name"
              full-width
            ></ha-input>
          </ha-form-group>

          <ha-form-group label="Email" required>
            <ha-input
              type="email"
              placeholder="your@email.com"
              full-width
            ></ha-input>
          </ha-form-group>
        </ha-grid>

        <ha-form-group label="Category" required>
          <ha-select full-width>
            <option value="">Select a category</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement Suggestion</option>
            <option value="other">Other</option>
          </ha-select>
        </ha-form-group>

        <ha-form-group
          label="Feedback"
          helper-text="Please provide detailed feedback (minimum 20 characters)"
          required
        >
          <ha-textarea
            placeholder="Describe your feedback in detail..."
            minlength="20"
            rows="8"
            full-width
          ></ha-textarea>
        </ha-form-group>

        <ha-form-group label="Additional Notes (Optional)">
          <ha-textarea
            placeholder="Any additional information..."
            rows="4"
            full-width
          ></ha-textarea>
        </ha-form-group>

        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary">Submit Feedback</ha-button>
        </ha-stack>
      </ha-stack>
    </div>
  `,
};

export const AllVariantsAndSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin: 0 0 1rem 0;">Default Variant</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-textarea variant="default" size="sm" placeholder="Small"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-textarea variant="default" size="md" placeholder="Medium"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-textarea variant="default" size="lg" placeholder="Large"></ha-textarea>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0;">Filled Variant</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-textarea variant="filled" size="sm" placeholder="Small"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-textarea variant="filled" size="md" placeholder="Medium"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-textarea variant="filled" size="lg" placeholder="Large"></ha-textarea>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 1rem 0;">Outlined Variant</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Small</p>
            <ha-textarea variant="outlined" size="sm" placeholder="Small"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Medium</p>
            <ha-textarea variant="outlined" size="md" placeholder="Medium"></ha-textarea>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">Large</p>
            <ha-textarea variant="outlined" size="lg" placeholder="Large"></ha-textarea>
          </div>
        </div>
      </div>
    </div>
  `,
};
