/**
 * Storybook stories for the Salt SocialLinks pair.
 *
 * @module components/react/salt/SocialLinks.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import SocialLinks from '#components/react/salt/SocialLinks'

const meta = {
  title: 'Salt/SocialLinks',
  component: SocialLinks,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Facebook and LinkedIn icon pair from a team member\'s photo caption. `owner` folds the member\'s name into each accessible name — the page carries one pair per member, so two links both announced as "Facebook" would give a screen reader user no way to tell whose profile they are opening.',
      },
    },
  },
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'dark'] } },
  args: {
    facebookHref: 'https://facebook.com/',
    linkedinHref: 'https://linkedin.com/',
    owner: 'Nehiel',
    tone: 'dark',
  },
} satisfies Meta<typeof SocialLinks>

export default meta

type Story = StoryObj<typeof meta>

export const OnWhite: Story = {}

/** How the pair is drawn: white icons inside the photo caption's scrim. */
export const OnPhotograph: Story = {
  args: { tone: 'light' },
  decorators: [
    Story => (
      <div style={{ background: 'var(--salt-ink)', padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
}

/** With only one network supplied. */
export const SingleNetwork: Story = {
  args: { linkedinHref: undefined },
}
