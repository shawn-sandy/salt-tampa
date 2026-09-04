/**
 * Storybook stories for the Salt TeamSlider.
 *
 * @module components/react/salt/TeamSlider.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import andrea from '#assets/salt/images/team-andrea.jpg?url'
import niehel from '#assets/salt/images/team-niehel.jpg?url'
import TeamSlider from '#components/react/salt/TeamSlider'
import type { TeamMember } from '#components/react/salt/TeamSlider'

/** The two members the design names, with the biographies it ships. */
const MEMBERS: TeamMember[] = [
  {
    name: 'Nehiel',
    role: 'Co-Lead',
    photoSrc: niehel,
    facebookHref: 'https://facebook.com/',
    linkedinHref: 'https://linkedin.com/',
    bio: "I believe in the power of a smile, a hug, and listening to someone's story, because during difficult moments in my life, others gave me the strength to keep going. I've been a co-leader with SALT for the past four years, and it has been a blessing to not only encourage someone who is facing uncertainty, but to help provide an opportunity for our volunteers to collaborate in sharing hope with someone. SALT stands for Service And Love Together, and I have had the chance to serve on multiple mission trips to Costa Rica, Botswana, and beyond!",
  },
  {
    name: 'Andrea',
    role: 'Co-Lead',
    photoSrc: andrea,
    facebookHref: 'https://facebook.com/',
    linkedinHref: 'https://linkedin.com/',
    bio: 'I’m passionate about being part of this community and building each other up. I was drawn to SALT because it gave me the chance to meet people face to face and know them beyond their life situation. I’ve loved co-leading this ministry since it launched in October 2021.\n\nBy day, I’m a case manager working with kids and families across Tampa Bay, with a heart for our most vulnerable neighbors.',
  },
]

const meta = {
  title: 'Salt/TeamSlider',
  component: TeamSlider,
  parameters: {
    docs: {
      description: {
        component:
          'The team slider owns the member index and wraps it at both ends. The design file\'s slider logic lives in a canvas-only scripting layer that does not survive export, so the wrap-around is rebuilt rather than ported: press previous on the first member and the last appears, with the counter reading "2 / 2".',
      },
    },
  },
  args: { members: MEMBERS },
} satisfies Meta<typeof TeamSlider>

export default meta

type Story = StoryObj<typeof meta>

export const TwoMembers: Story = {}

/** Opening on the last member, so pressing next wraps forward to the first. */
export const StartingOnTheLast: Story = {
  args: { initialIndex: 1 },
}

/** A single member: the controls still work, and both directions are no-ops. */
export const OneMember: Story = {
  args: { members: MEMBERS.slice(0, 1) },
}
