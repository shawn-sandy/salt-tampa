/**
 * Storybook stories for the ContactForm component.
 *
 * Submitting a valid form performs a real native form POST and then redirects
 * to `/success`, so these stories are intended for reviewing layout, field
 * labelling and the client-side validation summary rather than submission.
 *
 * @module components/react/ContactForm.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import ContactForm from '#components/react/ContactForm'

const meta = {
  title: 'React/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Netlify-backed contact form with client-side validation. Errors are summarised in an `Alert` with in-page links to each invalid field.',
      },
    },
  },
  argTypes: {
    csrfToken: {
      control: 'text',
      description: 'CSRF token rendered as a hidden field. Supplied by the page in production.',
    },
  },
} satisfies Meta<typeof ContactForm>

export default meta

type Story = StoryObj<typeof meta>

/** Empty form as a visitor first sees it. */
export const Default: Story = {
  args: {},
}

/** With a CSRF token injected, matching how the Astro page renders it. */
export const WithCsrfToken: Story = {
  args: {
    csrfToken: 'storybook-example-csrf-token',
  },
}
