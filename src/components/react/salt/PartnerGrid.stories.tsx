/**
 * Storybook stories for the Salt PartnerGrid.
 *
 * @module components/react/salt/PartnerGrid.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import PartnerGrid from '#components/react/salt/PartnerGrid'

const meta = {
  title: 'Salt/PartnerGrid',
  component: PartnerGrid,
  parameters: {
    docs: {
      description: {
        component:
          "The four-up partner logo row. All four slots are unchosen in the design, so each renders `ImageSlot`'s labelled placeholder until artwork arrives — who is supplying the logos is an open question on the plan.",
      },
    },
  },
  args: {
    heading: 'Our Partners',
    partners: [{}, {}, {}, {}],
  },
} satisfies Meta<typeof PartnerGrid>

export default meta

type Story = StoryObj<typeof meta>

/** As the design ships it: four empty slots. */
export const AllPlaceholders: Story = {}

/** Fewer partners than the four the design draws. */
export const TwoPartners: Story = {
  args: { partners: [{}, {}] },
}
