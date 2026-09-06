/**
 * The whole Salt Tampa homepage, assembled from the library.
 *
 * This story is the library's own completeness test: the page is built from
 * Salt components and layout wrappers only. Anything the page needs that the
 * library does not provide would have to appear here as raw markup, and would
 * show up nowhere else.
 *
 * @module components/react/salt/Homepage.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import one from '#assets/salt/images/carousel-1.jpg?url'
import two from '#assets/salt/images/carousel-2.jpg?url'
import three from '#assets/salt/images/carousel-3.jpg?url'
import donateBg from '#assets/salt/images/donate-bg.png?url'
import skyline from '#assets/salt/images/hero-skyline.png?url'
import tent from '#assets/salt/images/outreach-tent.jpg?url'
import clothes from '#assets/salt/images/service-clothes.jpg?url'
import shower from '#assets/salt/images/service-shower.jpg?url'
import andrea from '#assets/salt/images/team-andrea.jpg?url'
import niehel from '#assets/salt/images/team-niehel.jpg?url'
import DonateBand from '#components/react/salt/DonateBand'
import GalleryStrip from '#components/react/salt/GalleryStrip'
import Hero from '#components/react/salt/Hero'
import MissionPanel from '#components/react/salt/MissionPanel'
import PartnerGrid from '#components/react/salt/PartnerGrid'
import SectionIntro from '#components/react/salt/SectionIntro'
import ServiceCard from '#components/react/salt/ServiceCard'
import SiteFooter from '#components/react/salt/SiteFooter'
import SiteHeader from '#components/react/salt/SiteHeader'
import TeamSlider from '#components/react/salt/TeamSlider'
import type { TeamMember } from '#components/react/salt/TeamSlider'
import TestimonialPanel from '#components/react/salt/TestimonialPanel'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Mission', href: '#mission' },
  { label: 'Our Team', href: '#about' },
  { label: 'Volunteer', href: '#volunteer' },
]

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

/** The complete page, in the design's section order. */
function Homepage() {
  return (
    <div className="salt-page">
      <Hero
        eyebrow="Come to our next event!"
        header={<SiteHeader links={NAV_LINKS} />}
        headline="Every 2nd Saturday"
        imageSrc={skyline}
        logo
        primaryHref="#volunteer"
        primaryLabel="Get involved"
        secondaryHref="#services"
        secondaryLabel="What we offer"
      />

      <section className="salt-section" id="services">
        <SectionIntro
          heading="Take a look into our services!"
          lead="We provide many services at Trinity Cafe every second Saturday of the month. Here is what we offer!"
          primaryHref="#contact"
          primaryLabel="Contact Us"
          secondaryHref="#volunteer"
          secondaryLabel="Become a Volunteer"
        />
        <div className="salt-card-grid">
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
      </section>

      <section className="salt-mission-band" id="mission">
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
      </section>

      <section className="salt-section" id="about">
        <SectionIntro
          heading="Meet our team members"
          lead="The people who lead SALT Tampa and show up every second Saturday."
          primaryHref="#contact"
          primaryLabel="Contact Us"
          secondaryHref="#volunteer"
          secondaryLabel="Become a Volunteer"
        />
        <TeamSlider members={MEMBERS} />
      </section>

      <PartnerGrid heading="Our Partners" partners={[{}, {}, {}, {}]} />

      <DonateBand
        actionHref="#donate"
        actionLabel="Donate"
        body="Every gift pays for the showers, haircuts, clothing and meals we bring to Trinity Cafe on the second Saturday of every month."
        heading="We can keep serving Tampa Bay with your help"
        imageSrc={donateBg}
      />

      <GalleryStrip
        photos={[
          { src: one, alt: 'Volunteers serving at a SALT Tampa service day' },
          { src: two, alt: 'The mobile outreach unit parked at Trinity Cafe' },
          { src: three, alt: 'Guests and volunteers together at a service day' },
        ]}
      />

      <section className="salt-section" id="testimonials">
        <TestimonialPanel quotes={['Testimonial coming soon.', 'Testimonial coming soon.']} />
      </section>

      <SiteFooter
        copyright="2026 Salt Tampa Outreach. All rights reserved."
        legalLinks={[
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Cookies Settings', href: '#cookies' },
        ]}
        links={[
          { label: 'Donate', href: '#donate' },
          { label: 'Our Services', href: '#services' },
          { label: 'Our Team', href: '#about' },
          { label: 'Contact', href: '#contact' },
        ]}
      />
    </div>
  )
}

const meta = {
  title: 'Salt/Homepage',
  component: Homepage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The whole Salt Tampa homepage, assembled from the library in the design's section order: header, hero, services, mission, team, partners, donate, gallery, testimonials, footer. Every visible element is a Salt component; the only raw markup is the `<section>` and grid wrappers that carry the layout classes from `_salt-patterns.css`.",
      },
    },
  },
} satisfies Meta<typeof Homepage>

export default meta

type Story = StoryObj<typeof meta>

export const FullPage: Story = {}
