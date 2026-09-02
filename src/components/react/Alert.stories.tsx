/**
 * Storybook stories for the Alert component.
 *
 * @module components/react/Alert.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import Alert from '#components/react/Alert'

const meta = {
  title: 'React/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Inline status message rendered with `role="alert"` so assistive technology announces it as soon as it appears. Styling comes from `src/styles/components/_alert.scss`.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['error', 'success', 'info'],
      description: 'Severity of the message, which drives the `alert-*` class.',
    },
    children: {
      control: 'text',
      description: 'Message content. Accepts any React node, not just text.',
    },
  },
  args: {
    type: 'info',
    children: 'Your changes have been saved.',
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Your message was sent successfully.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    children: 'We could not send your message. Please try again.',
  },
}

/** Alerts accept arbitrary markup, which is how `ContactForm` lists field errors. */
export const WithRichContent: Story = {
  args: {
    type: 'error',
    children: (
      <>
        <h6>Please correct the following errors</h6>
        <ul data-list="unstyled">
          <li>
            <a href="#name">Name is required</a>
          </li>
          <li>
            <a href="#email">Enter a valid email address</a>
          </li>
        </ul>
      </>
    ),
  },
}
