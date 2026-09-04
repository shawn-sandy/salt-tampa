/**
 * Storybook stories for the Salt TestimonialPanel.
 *
 * @module components/react/salt/TestimonialPanel.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import tent from '#assets/salt/images/outreach-tent.jpg?url'
import TestimonialPanel from '#components/react/salt/TestimonialPanel'

const meta = {
  title: 'Salt/TestimonialPanel',
  component: TestimonialPanel,
  parameters: {
    docs: {
      description: {
        component:
          'A quote and eyebrow over a scrimmed photograph, with previous/next controls that wrap at both ends. Both quotes in the design read "Testimonial coming soon." — that is the placeholder the design shipped, not copy this component invented, and it is recorded as an open question in the plan.',
      },
    },
  },
  args: {
    quotes: ['Testimonial coming soon.', 'Testimonial coming soon.'],
    eyebrow: 'Testimonials',
  },
} satisfies Meta<typeof TestimonialPanel>

export default meta

type Story = StoryObj<typeof meta>

/** As the design ships it: placeholder quotes over an unchosen background. */
export const AsDesigned: Story = {}

export const WithPhotograph: Story = {
  args: {
    imageSrc: tent,
    imageAlt: '',
    quotes: [
      'The barbers here remembered my name. That mattered more than the haircut.',
      'A hot shower and clean clothes changed how the whole week went.',
    ],
  },
}

/** With a single quote the control row is omitted — there is nowhere to go. */
export const SingleQuote: Story = {
  args: { quotes: ['Testimonial coming soon.'], imageSrc: tent },
}
