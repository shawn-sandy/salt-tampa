/**
 * Storybook stories for the Salt GalleryStrip.
 *
 * @module components/react/salt/GalleryStrip.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import one from '#assets/salt/images/carousel-1.jpg?url'
import two from '#assets/salt/images/carousel-2.jpg?url'
import three from '#assets/salt/images/carousel-3.jpg?url'
import tent from '#assets/salt/images/outreach-tent.jpg?url'
import GalleryStrip from '#components/react/salt/GalleryStrip'
import type { GalleryPhoto } from '#components/react/salt/GalleryStrip'

/** The three photographs the design's gallery ships with. */
const PHOTOS: GalleryPhoto[] = [
  { src: one, alt: 'Volunteers serving at a SALT Tampa service day' },
  { src: two, alt: 'The mobile outreach unit parked at Trinity Cafe' },
  { src: three, alt: 'Guests and volunteers together at a service day' },
]

const meta = {
  title: 'Salt/GalleryStrip',
  component: GalleryStrip,
  parameters: {
    docs: {
      description: {
        component:
          'Three visible tiles taken from a longer list. Next advances the strip by ONE photograph, not three — the middle tile becomes the left tile and a new photograph enters on the right. Pressing next as many times as there are photographs returns to the starting tiles.',
      },
    },
  },
  args: { photos: PHOTOS },
} satisfies Meta<typeof GalleryStrip>

export default meta

type Story = StoryObj<typeof meta>

export const ThreePhotographs: Story = {}

/** A longer list, where the rolling window is easiest to see. */
export const FourPhotographs: Story = {
  args: {
    photos: [...PHOTOS, { src: tent, alt: 'Volunteers at the SALT Tampa outreach tent' }],
  },
}

/** Fewer photographs than tiles: two tiles render rather than one repeating. */
export const TwoPhotographs: Story = {
  args: { photos: PHOTOS.slice(0, 2) },
}
