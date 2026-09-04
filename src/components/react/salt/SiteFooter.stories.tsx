/**
 * Storybook stories for the Salt SiteFooter.
 *
 * @module components/react/salt/SiteFooter.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import SiteFooter from '#components/react/salt/SiteFooter'
import type { FooterLink } from '#components/react/salt/SiteFooter'

/** The four links the design's footer navigation carries. */
const FOOTER_LINKS: FooterLink[] = [
  { label: 'Donate', href: '#donate' },
  { label: 'Our Services', href: '#services' },
  { label: 'Our Team', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/** The three links in the design's legal row. */
const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookies Settings', href: '#cookies' },
]

const meta = {
  title: 'Salt/SiteFooter',
  component: SiteFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The footer: wordmark, navigation row, legal row and copyright line.',
      },
    },
  },
  args: {
    links: FOOTER_LINKS,
    legalLinks: LEGAL_LINKS,
    copyright: '2026 Salt Tampa Outreach. All rights reserved.',
  },
} satisfies Meta<typeof SiteFooter>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Without the legal row, leaving the copyright line alone on its rule. */
export const NoLegalRow: Story = {
  args: { legalLinks: [] },
}
