/**
 * Storybook stories for the Salt ImageSlot.
 *
 * @module components/react/salt/ImageSlot.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import clothes from '#assets/salt/images/service-clothes.jpg?url'
import ImageSlot from '#components/react/salt/ImageSlot'

const meta = {
  title: 'Salt/ImageSlot',
  component: ImageSlot,
  parameters: {
    docs: {
      description: {
        component:
          'A photograph, or a labelled placeholder when nobody has chosen one yet. Six slots in the design are still unchosen, so the empty state is a real state, not an error state — it renders visible placeholder text rather than a broken image or an empty box a reviewer would read as a layout bug.',
      },
    },
  },
  argTypes: {
    shape: { control: 'inline-radio', options: ['rounded', 'rect'] },
    fit: { control: 'inline-radio', options: ['cover', 'contain'] },
  },
  args: { shape: 'rounded', fit: 'cover', placeholder: 'Image not chosen yet' },
  decorators: [
    Story => (
      <div style={{ height: '250px', width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageSlot>

export default meta

type Story = StoryObj<typeof meta>

export const WithPhotograph: Story = {
  args: { src: clothes, alt: 'Volunteers at the clothing station' },
}

export const Empty: Story = {
  args: { placeholder: 'Meals and essentials photo' },
}

export const RectangularContain: Story = {
  args: { shape: 'rect', fit: 'contain', placeholder: 'Partner logo' },
}

/** Both states side by side, which is how the services grid actually renders. */
export const FilledAndEmpty: Story = {
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ height: '250px', width: '260px' }}>
        <ImageSlot alt="Volunteers at the clothing station" src={clothes} />
      </div>
      <div style={{ height: '250px', width: '260px' }}>
        <ImageSlot placeholder="Coming soon photo" />
      </div>
    </div>
  ),
}
