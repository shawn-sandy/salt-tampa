/**
 * Storybook stories for the ContactForm component.
 *
 * @module components/react/ContactForm.stories
 */

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'
import { useLayoutEffect } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import ContactForm from '#components/react/ContactForm'

/**
 * Neutralises the native form submission for the lifetime of a story.
 *
 * On valid input `ContactForm` calls `form.submit()` directly. That is a native
 * DOM call, so it cannot be stopped with `preventDefault()` — it would navigate
 * the Storybook iframe away from the story. This decorator replaces
 * `HTMLFormElement.prototype.submit` with a no-op while a story is mounted, and
 * restores it afterwards.
 *
 * Client-side validation is untouched, so the error-summary path still behaves
 * exactly as it does in the app.
 *
 * This stops the form POST only. On valid input the component then sets its own
 * `isSubmitted` state and assigns `window.location.href = '/success'`, which
 * still navigates the preview iframe — that assignment cannot be intercepted
 * from page code. The invalid-input stories below never reach that branch.
 *
 * @returns A Storybook decorator that renders its story without native submits.
 */
const preventNativeSubmit: Decorator = function PreventNativeSubmit(Story) {
  useLayoutEffect(() => {
    const original = HTMLFormElement.prototype.submit
    HTMLFormElement.prototype.submit = function noopSubmit() {
      // Intentionally empty: submitting for real would leave Storybook.
    }

    return () => {
      HTMLFormElement.prototype.submit = original
    }
  }, [])

  return <Story />
}

const meta = {
  title: 'React/ContactForm',
  component: ContactForm,
  decorators: [preventNativeSubmit],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Netlify-backed contact form with client-side validation. Errors are summarised in an `Alert` with in-page links to each invalid field. The native form POST is stubbed out in Storybook, but a *valid* submit still runs the component's own redirect to `/success` and so leaves the preview — use the ValidationErrors and InvalidEmail stories to exercise the form in place.",
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

/**
 * Empty form as a visitor first sees it.
 *
 * Filling this in with valid data and submitting will redirect the preview to
 * `/success`, as it would on the site; reselect the story to come back.
 */
export const Default: Story = {
  args: {},
}

/** With a CSRF token injected, matching how the Astro page renders it. */
export const WithCsrfToken: Story = {
  args: {
    csrfToken: 'storybook-example-csrf-token',
  },
}

/**
 * Submitting an empty form surfaces the validation summary, with one in-page
 * link per invalid field. This path never submits, so it is safe to replay.
 */
export const ValidationErrors: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: /send/i }))

    const alert = await canvas.findByRole('alert')
    await expect(alert).toBeInTheDocument()
    await expect(within(alert).getByRole('link', { name: /name/i })).toBeInTheDocument()
    await expect(within(alert).getByRole('link', { name: /email/i })).toBeInTheDocument()
  },
}

/**
 * A single invalid field: a malformed email address is rejected even though
 * every other required field is filled in.
 */
export const InvalidEmail: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText(/full name/i), 'Ada Lovelace')
    await userEvent.type(canvas.getByLabelText(/email/i), 'not-an-email')
    await userEvent.type(canvas.getByLabelText(/subject/i), 'Hello')
    await userEvent.type(canvas.getByLabelText(/enter your message/i), 'Testing the contact form.')
    await userEvent.click(canvas.getByRole('button', { name: /send/i }))

    const alert = await canvas.findByRole('alert')
    await expect(within(alert).getByRole('link', { name: /email/i })).toBeInTheDocument()
  },
}
