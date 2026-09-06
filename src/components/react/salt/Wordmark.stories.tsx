/**
 * Storybook stories for the Salt Wordmark.
 *
 * @module components/react/salt/Wordmark.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import Wordmark from '#components/react/salt/Wordmark'

const meta = {
  title: 'Salt/Wordmark',
  component: Wordmark,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The lockup at its two drawn sizes. The artwork is a white-on-transparent SVG used as a CSS mask, so one asset renders white over the hero and sage in the footer; the element carries the brand name as its accessible name.',
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['nav', 'footer'] } },
  args: { size: 'footer' },
} satisfies Meta<typeof Wordmark>

export default meta

type Story = StoryObj<typeof meta>

/** The 30px green lockup used in the footer. */
export const Footer: Story = {}

/** The 33px white lockup, drawn over the hero photograph. */
export const Nav: Story = {
  args: { size: 'nav', href: '#top' },
  decorators: [
    Story => (
      <div style={{ background: 'var(--salt-slate)', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
}
