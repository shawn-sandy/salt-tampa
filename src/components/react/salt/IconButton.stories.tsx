/**
 * Storybook stories for the Salt IconButton.
 *
 * @module components/react/salt/IconButton.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import IconButton from '#components/react/salt/IconButton'

const meta = {
  title: 'Salt/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The circular previous/next control in its three tones. `label` is required and becomes the `aria-label`: the control carries only an arrow glyph, and the page holds three pairs of these, so "next" alone would be ambiguous. The drawn circle stays 34px while an invisible centred overlay grows the pointer target to 44×44px for WCAG 2.5.8.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['orange', 'sage', 'outline'] },
    direction: { control: 'inline-radio', options: ['prev', 'next'] },
  },
  args: { label: 'Next team member', direction: 'next', tone: 'orange' },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Orange: Story = {}

export const Sage: Story = {
  args: { tone: 'sage', label: 'Next photos' },
}

/** Drawn over a photograph, so this one is shown on a dark ground. */
export const Outline: Story = {
  args: { tone: 'outline', label: 'Next testimonial' },
  decorators: [
    Story => (
      <div style={{ background: 'var(--salt-ink)', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
}

export const BothDirections: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '14px' }}>
      <IconButton direction="prev" label="Previous team member" tone="orange" />
      <IconButton direction="next" label="Next team member" tone="orange" />
    </div>
  ),
}
