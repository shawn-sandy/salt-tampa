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
          'The lockup at its two drawn sizes. The design file supplies the wordmark as a flattened bitmap; it is rebuilt here as the salt-crystal glyph beside real text, so the brand name is selectable, translatable, indexable and readable by a screen reader.',
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['nav', 'footer'] } },
  args: { size: 'footer' },
} satisfies Meta<typeof Wordmark>

export default meta

type Story = StoryObj<typeof meta>

/** The 18px green lockup used in the footer. */
export const Footer: Story = {}

/** The 20px white lockup, drawn over the hero photograph. */
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
