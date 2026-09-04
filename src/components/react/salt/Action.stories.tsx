/**
 * Storybook stories for the Salt Action control.
 *
 * @module components/react/salt/Action.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import Action from '#components/react/salt/Action'

const meta = {
  title: 'Salt/Action',
  component: Action,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One control behind all four button flavours the design draws. Renders an `<a>` when `href` is set and the control is enabled, and a `<button>` otherwise — switch the `disabled` control to true and the rendered element changes to `<button disabled>`, so a disabled control is never a live link.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'ghost', 'light', 'pill'] },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
  },
  args: {
    children: 'Contact Us',
    href: '#contact',
    variant: 'solid',
    arrow: true,
    disabled: false,
  },
} satisfies Meta<typeof Action>

export default meta

type Story = StoryObj<typeof meta>

export const Solid: Story = {}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Become a Volunteer' },
}

export const Light: Story = {
  args: { variant: 'light', children: 'What we offer', arrow: false },
}

export const Pill: Story = {
  args: { variant: 'pill', children: 'Donate', arrow: false, href: '#donate' },
}

/** With `href` still set. The control renders as `<button disabled>`, not a link. */
export const Disabled: Story = {
  args: { disabled: true },
}

/**
 * All four flavours, each on the ground it is drawn against. `solid`, `light`
 * and `pill` sit over the hero photograph; `ghost` is only ever used on white,
 * because its label is `--salt-graphite` and it has no fill of its own.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <div
        style={{
          alignItems: 'center',
          background: 'var(--salt-slate)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '24px',
        }}
      >
        <Action arrow href="#contact" variant="solid">
          Contact Us
        </Action>
        <Action href="#services" variant="light">
          What we offer
        </Action>
        <Action href="#donate" variant="pill">
          Donate
        </Action>
      </div>
      <div
        style={{
          alignItems: 'center',
          background: 'var(--salt-surface)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '24px',
        }}
      >
        <Action arrow href="#volunteer" variant="ghost">
          Become a Volunteer
        </Action>
      </div>
    </div>
  ),
}
