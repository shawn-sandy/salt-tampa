/**
 * Storybook stories for the Salt TeamMemberBio block.
 *
 * @module components/react/salt/TeamMemberBio.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import TeamMemberBio from '#components/react/salt/TeamMemberBio'

const NEHIEL_BIO =
  "I believe in the power of a smile, a hug, and listening to someone's story, because during difficult moments in my life, others gave me the strength to keep going. I've been a co-leader with SALT for the past four years, and it has been a blessing to not only encourage someone who is facing uncertainty, but to help provide an opportunity for our volunteers to collaborate in sharing hope with someone."

const meta = {
  title: 'Salt/TeamMemberBio',
  component: TeamMemberBio,
  parameters: {
    docs: {
      description: {
        component:
          'The text half of the team slider: name, uppercase role, biography, and the previous/next controls with their position counter. The counter is passed in rather than derived, because `TeamSlider` owns the index and this block is presentational. Newlines in `bio` are preserved, so a multi-paragraph biography renders as drawn.',
      },
    },
  },
  args: {
    name: 'Nehiel',
    role: 'Co-Lead',
    bio: NEHIEL_BIO,
    counter: '1 / 2',
  },
} satisfies Meta<typeof TeamMemberBio>

export default meta

type Story = StoryObj<typeof meta>

export const WithControls: Story = {
  args: { onPrev: () => {}, onNext: () => {} },
}

/** Without handlers, the control row is omitted entirely. */
export const TextOnly: Story = {}

export const MultipleParagraphs: Story = {
  args: {
    name: 'Andrea',
    bio: 'I’m passionate about being part of this community and building each other up.\n\nBy day, I’m a case manager working with kids and families across Tampa Bay, with a heart for our most vulnerable neighbors.',
    counter: '2 / 2',
    onPrev: () => {},
    onNext: () => {},
  },
}
