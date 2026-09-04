/**
 * Storybook stories for the Salt TeamMemberCard.
 *
 * @module components/react/salt/TeamMemberCard.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import andrea from '#assets/salt/images/team-andrea.jpg?url'
import niehel from '#assets/salt/images/team-niehel.jpg?url'
import TeamMemberCard from '#components/react/salt/TeamMemberCard'

const meta = {
  title: 'Salt/TeamMemberCard',
  component: TeamMemberCard,
  parameters: {
    docs: {
      description: {
        component:
          "A 400px portrait with a gradient scrim caption carrying the member's name, role and social links.",
      },
    },
  },
  args: {
    name: 'Nehiel',
    role: 'Co-Lead',
    photoSrc: niehel,
    facebookHref: 'https://facebook.com/',
    linkedinHref: 'https://linkedin.com/',
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TeamMemberCard>

export default meta

type Story = StoryObj<typeof meta>

export const Nehiel: Story = {}

export const Andrea: Story = {
  args: { name: 'Andrea', photoSrc: andrea },
}

/** No portrait supplied, so only the caption renders over the card's ground. */
export const WithoutPhotograph: Story = {
  args: { photoSrc: undefined },
}
