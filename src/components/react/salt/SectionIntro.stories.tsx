/**
 * Storybook stories for the Salt SectionIntro block.
 *
 * @module components/react/salt/SectionIntro.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import SectionIntro from '#components/react/salt/SectionIntro'

const meta = {
  title: 'Salt/SectionIntro',
  component: SectionIntro,
  parameters: {
    docs: {
      description: {
        component:
          'The centred heading, lead paragraph and action pair that opens both the services section and the team section. The design uses it identically in both places, down to the same two button labels, so the copy is props — edit `heading` and `lead` in the Controls panel to switch between them.',
      },
    },
  },
  args: {
    heading: 'Take a look into our services!',
    lead: 'We provide many services at Trinity Cafe every second Saturday of the month. Here is what we offer!',
    secondaryLabel: 'Become a Volunteer',
    secondaryHref: '#volunteer',
    primaryLabel: 'Contact Us',
    primaryHref: '#contact',
  },
} satisfies Meta<typeof SectionIntro>

export default meta

type Story = StoryObj<typeof meta>

export const Services: Story = {}

export const Team: Story = {
  args: {
    heading: 'Meet our team members',
    lead: 'The people who lead SALT Tampa and show up every second Saturday.',
  },
}

/** Without the action row, which is what a section that leads nowhere looks like. */
export const HeadingOnly: Story = {
  args: { secondaryLabel: undefined, primaryLabel: undefined },
}
