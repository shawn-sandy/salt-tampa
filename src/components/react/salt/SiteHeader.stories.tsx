/**
 * Storybook stories for the Salt SiteHeader.
 *
 * @module components/react/salt/SiteHeader.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import SiteHeader from '#components/react/salt/SiteHeader'
import type { NavLink } from '#components/react/salt/SiteHeader'

/** The four links the design's navigation bar carries. */
const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Mission', href: '#mission' },
  { label: 'Our Team', href: '#about' },
  { label: 'Volunteer', href: '#volunteer' },
]

const meta = {
  title: 'Salt/SiteHeader',
  component: SiteHeader,
  parameters: {
    docs: {
      description: {
        component:
          'The transparent navigation bar that overlays the hero. It is positioned absolutely, so on the page it is rendered inside the hero section rather than above it; this story supplies a dark ground to stand in for the photograph.',
      },
    },
  },
  args: { links: NAV_LINKS, donateLabel: 'Donate', donateHref: '#donate' },
  decorators: [
    Story => (
      <div style={{ background: 'var(--salt-slate)', minHeight: '140px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** A shorter navigation, which is what the bar looks like before links are added. */
export const FewerLinks: Story = {
  args: { links: NAV_LINKS.slice(0, 2) },
}
