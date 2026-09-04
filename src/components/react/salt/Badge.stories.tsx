/**
 * Storybook stories for the Salt Badge.
 *
 * @module components/react/salt/Badge.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import Badge from '#components/react/salt/Badge'

const meta = {
  title: 'Salt/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The uppercase status pill beside a service title. The design uses exactly one, "Coming soon", but the label is content rather than a variant.',
      },
    },
  },
  args: { children: 'Coming soon' },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const ComingSoon: Story = {}

export const LongerLabel: Story = {
  args: { children: 'Second Saturdays only' },
}
