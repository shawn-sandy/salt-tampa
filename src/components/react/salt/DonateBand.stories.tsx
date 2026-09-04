/**
 * Storybook stories for the Salt DonateBand.
 *
 * @module components/react/salt/DonateBand.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import donateBg from '#assets/salt/images/donate-bg.png?url'
import DonateBand from '#components/react/salt/DonateBand'

const meta = {
  title: 'Salt/DonateBand',
  component: DonateBand,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The donate section, rebuilt as real text over a background photograph. The design draws it as a flat photograph with its message baked into the pixels and a 12%-wide invisible link positioned over the artwork — unreadable by a screen reader, unindexable, untranslatable, unselectable. The heading, body and button here are real elements; the photograph is background. The copy is a stand-in until someone writes it, which is an open question on the plan.',
      },
    },
  },
  args: {
    heading: 'We can keep serving Tampa Bay with your help',
    body: 'Every gift pays for the showers, haircuts, clothing and meals we bring to Trinity Cafe on the second Saturday of every month.',
    actionLabel: 'Donate',
    actionHref: '#donate',
    imageSrc: donateBg,
  },
} satisfies Meta<typeof DonateBand>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Without a photograph, so the band falls back to its flat ground. */
export const NoPhotograph: Story = {
  args: { imageSrc: undefined },
}

/** Heading and button only. */
export const HeadingOnly: Story = {
  args: { body: undefined },
}
