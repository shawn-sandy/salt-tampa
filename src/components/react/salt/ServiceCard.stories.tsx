/**
 * Storybook stories for the Salt ServiceCard.
 *
 * @module components/react/salt/ServiceCard.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import tent from '#assets/salt/images/outreach-tent.jpg?url'
import clothes from '#assets/salt/images/service-clothes.jpg?url'
import shower from '#assets/salt/images/service-shower.jpg?url'
import ServiceCard from '#components/react/salt/ServiceCard'

const meta = {
  title: 'Salt/ServiceCard',
  component: ServiceCard,
  parameters: {
    docs: {
      description: {
        component:
          'A 250px photograph above a title, an optional status badge, and body copy. The design shows five of these: three with a photograph, one with no chosen artwork, and one with both an empty slot and a "Coming soon" badge — so all three states ship, not just the happy case.',
      },
    },
  },
  args: {
    title: 'Clothes',
    body: 'Find clean clothes at our mobile station. We offer a variety of sizes and styles, ensuring everyone can find something that fits and feels good.',
    imageSrc: clothes,
    imageAlt: 'Volunteers at the clothing station',
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ServiceCard>

export default meta

type Story = StoryObj<typeof meta>

export const WithPhotograph: Story = {}

/** No artwork chosen yet, so the card shows `ImageSlot`'s labelled placeholder. */
export const EmptyImageSlot: Story = {
  args: {
    title: 'Meals & Essentials',
    body: 'Take away meals and accessories, offered alongside our main stations.',
    imageSrc: undefined,
    placeholder: 'Meals and essentials photo',
  },
}

/** Placeholder artwork and a status badge, exactly as the design draws it. */
export const WithBadge: Story = {
  args: {
    title: 'Health screening',
    body: "Basic health screenings are on the way. We're working with partners to bring them to a future service day.",
    imageSrc: undefined,
    placeholder: 'Coming soon photo',
    badge: 'Coming soon',
  },
}

/**
 * The full three-up grid. Resize the preview below 640px and it reflows to a
 * single column.
 */
export const Grid: Story = {
  decorators: [],
  render: () => (
    <div className="salt-card-grid" style={{ marginTop: 0 }}>
      <ServiceCard
        body="Find clean clothes at our mobile station. We offer a variety of sizes and styles, ensuring everyone can find something that fits and feels good."
        imageAlt="Volunteers at the clothing station"
        imageSrc={clothes}
        title="Clothes"
      />
      <ServiceCard
        body="Our skilled barbers provide free haircuts, beard trims, and styling to help you look and feel your best."
        imageAlt="Volunteers at the SALT Tampa outreach tent"
        imageSrc={tent}
        title="Haircuts"
      />
      <ServiceCard
        body="Salt's mobile shower unit offers a clean, private space to refresh. We provide toiletries and towels, ensuring a comfortable experience."
        imageAlt="The mobile shower unit"
        imageSrc={shower}
        title="Showers"
      />
      <ServiceCard
        body="Take away meals and accessories, offered alongside our main stations."
        placeholder="Meals and essentials photo"
        title="Meals & Essentials"
      />
      <ServiceCard
        badge="Coming soon"
        body="Basic health screenings are on the way. We're working with partners to bring them to a future service day."
        placeholder="Coming soon photo"
        title="Health screening"
      />
    </div>
  ),
}
