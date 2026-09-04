/**
 * Storybook stories for the Salt Hero.
 *
 * @module components/react/salt/Hero.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import skyline from '#assets/salt/images/hero-skyline.png?url'
import Hero from '#components/react/salt/Hero'
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
  title: 'Salt/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The hero: a photograph, a gradient scrim, and the event eyebrow, headline and two calls to action. The design sizes this block's type in `cqw` — a percentage of the container width — which renders the eyebrow at roughly five pixels on a 320px phone. Fixed sizes replace it, and the action row wraps rather than overflowing; resize the preview to 320px to see it.",
      },
    },
  },
  args: {
    imageSrc: skyline,
    imageAlt: 'The Tampa skyline behind the SALT Tampa wordmark',
    eyebrow: 'Come to our next event!',
    headline: 'Every 2nd Saturday',
    secondaryLabel: 'What we offer',
    secondaryHref: '#services',
    primaryLabel: 'Get involved',
    primaryHref: '#volunteer',
  },
} satisfies Meta<typeof Hero>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** With the overlay navigation bar, which is how the page renders it. */
export const WithHeader: Story = {
  args: { header: <SiteHeader links={NAV_LINKS} /> },
}

/** Headline only, with no event to announce. */
export const HeadlineOnly: Story = {
  args: { eyebrow: undefined, primaryLabel: undefined, secondaryLabel: undefined },
}
