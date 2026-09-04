/**
 * Storybook stories for the Salt MissionPanel.
 *
 * @module components/react/salt/MissionPanel.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import MissionPanel from '#components/react/salt/MissionPanel'

const meta = {
  title: 'Salt/MissionPanel',
  component: MissionPanel,
  parameters: {
    docs: {
      description: {
        component:
          'A heading and paragraph sized for the orange band. The design stacks two of these — "Our Mission" and "Our Vision" — inside one full-width orange section, so the band is layout and this is the text block inside it.',
      },
    },
  },
  args: {
    heading: 'Our Mission',
    body: 'To serve the Unsheltered community in Tampa Bay, through a dynamic, mobile, drop-in center dedicated to addressing immediate needs.',
  },
  decorators: [
    Story => (
      <div className="salt-mission-band">
        <div className="salt-mission-band__inner">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof MissionPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Mission: Story = {}

export const Vision: Story = {
  args: {
    heading: 'Our Vision',
    body: 'We envision a community where every individual’s basic needs are met, and where a dynamic, mobile resource hub bridges the gap between people and the support services they need to thrive and grow.',
  },
}

/** Both panels stacked, which is how the band actually renders. */
export const Band: Story = {
  decorators: [],
  render: () => (
    <div className="salt-mission-band">
      <div className="salt-mission-band__inner">
        <MissionPanel
          body="To serve the Unsheltered community in Tampa Bay, through a dynamic, mobile, drop-in center dedicated to addressing immediate needs."
          heading="Our Mission"
        />
        <MissionPanel
          body="We envision a community where every individual’s basic needs are met, and where a dynamic, mobile resource hub bridges the gap between people and the support services they need to thrive and grow."
          heading="Our Vision"
        />
      </div>
    </div>
  ),
}
