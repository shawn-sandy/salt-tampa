/**
 * Salt Tampa React component tests.
 *
 * The library is mostly presentational markup, where a test would assert the
 * JSX rather than any behaviour. Three pieces carry real logic and are covered
 * here:
 *
 * - `Action`'s link-versus-button rule, which is a branch.
 * - `TeamSlider`'s wrap-around, which is modular arithmetic.
 * - `GalleryStrip`'s rolling window, which is modular arithmetic over a window.
 *
 * Plus one smoke test asserting the plan's objective: the homepage can be
 * rebuilt out of the library.
 */

import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Action from '#components/react/salt/Action'
import DonateBand from '#components/react/salt/DonateBand'
import GalleryStrip from '#components/react/salt/GalleryStrip'
import type { GalleryPhoto } from '#components/react/salt/GalleryStrip'
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

const MEMBERS: TeamMember[] = [
  { name: 'Nehiel', role: 'Co-Lead', bio: 'First biography.' },
  { name: 'Andrea', role: 'Co-Lead', bio: 'Second biography.' },
]

const PHOTOS: GalleryPhoto[] = [
  { src: '/a.jpg', alt: 'Photo A' },
  { src: '/b.jpg', alt: 'Photo B' },
  { src: '/c.jpg', alt: 'Photo C' },
  { src: '/d.jpg', alt: 'Photo D' },
]

/** The alt texts of the tiles currently on screen, left to right. */
function visibleTiles(): string[] {
  return screen.getAllByRole('img').map(tile => tile.getAttribute('aria-label') ?? '')
}

describe('Objective: the homepage rebuilds from the library', () => {
  it('mounts every region of the page from Salt components alone', () => {
    render(
      <div className="salt-page">
        <Hero
          eyebrow="Come to our next event!"
          header={<SiteHeader links={[{ label: 'Services', href: '#services' }]} />}
          headline="Every 2nd Saturday"
          primaryLabel="Get involved"
          secondaryLabel="What we offer"
        />
        <section className="salt-section" id="services">
          <SectionIntro heading="Take a look into our services!" lead="Here is what we offer." />
          <div className="salt-card-grid">
            <ServiceCard body="Clean clothes." title="Clothes" />
            <ServiceCard badge="Coming soon" body="On the way." title="Health screening" />
          </div>
        </section>
        <section className="salt-mission-band" id="mission">
          <div className="salt-mission-band__inner">
            <MissionPanel body="To serve the Unsheltered community." heading="Our Mission" />
            <MissionPanel body="A community where needs are met." heading="Our Vision" />
          </div>
        </section>
        <section className="salt-section" id="about">
          <TeamSlider members={MEMBERS} />
        </section>
        <PartnerGrid partners={[{}, {}, {}, {}]} />
        <DonateBand body="Every gift pays for showers." heading="Keep serving Tampa Bay" />
        <GalleryStrip photos={PHOTOS} />
        <section className="salt-section" id="testimonials">
          <TestimonialPanel quotes={['Testimonial coming soon.']} />
        </section>
        <SiteFooter
          copyright="2026 Salt Tampa Outreach. All rights reserved."
          legalLinks={[{ label: 'Privacy Policy', href: '#privacy' }]}
          links={[{ label: 'Donate', href: '#donate' }]}
        />
      </div>
    )

    // Hero + header
    expect(screen.getByText('Come to our next event!')).toBeInTheDocument()
    expect(screen.getByText('Every 2nd Saturday')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()

    // Services, including the badged card
    expect(
      screen.getByRole('heading', { name: 'Take a look into our services!' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clothes' })).toBeInTheDocument()
    expect(screen.getByText('Coming soon')).toBeInTheDocument()

    // Mission band
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Our Vision' })).toBeInTheDocument()

    // Team, partners, donate
    expect(screen.getByRole('heading', { name: 'Nehiel' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Our Partners' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep serving Tampa Bay' })).toBeInTheDocument()

    // Gallery, testimonials, footer
    expect(screen.getByRole('img', { name: 'Photo A' })).toBeInTheDocument()
    expect(screen.getByText('Testimonial coming soon.')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Footer' })).toBeInTheDocument()
    expect(screen.getByText('2026 Salt Tampa Outreach. All rights reserved.')).toBeInTheDocument()
  })
})

describe('Action: the link-versus-button rule', () => {
  it('renders an anchor carrying the href when enabled', () => {
    render(<Action href="/donate">Donate</Action>)

    const control = screen.getByRole('link', { name: 'Donate' })
    expect(control.tagName).toBe('A')
    expect(control).toHaveAttribute('href', '/donate')
  })

  it('renders a button when no href is supplied', () => {
    render(<Action>Subscribe</Action>)

    const control = screen.getByRole('button', { name: 'Subscribe' })
    expect(control.tagName).toBe('BUTTON')
    expect(control).toHaveAttribute('type', 'button')
  })

  it('renders a disabled button, not a live link, when disabled with an href', () => {
    render(
      <Action disabled href="/donate">
        Donate
      </Action>
    )

    const control = screen.getByRole('button', { name: 'Donate' })
    expect(control.tagName).toBe('BUTTON')
    expect(control).toBeDisabled()
    expect(control).not.toHaveAttribute('href')
    expect(screen.queryByRole('link', { name: 'Donate' })).not.toBeInTheDocument()
  })
})

describe('TeamSlider: index wrap-around', () => {
  it('wraps backwards from the first member to the last', async () => {
    const user = userEvent.setup()
    render(<TeamSlider members={MEMBERS} />)

    expect(screen.getByRole('heading', { name: 'Nehiel' })).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Previous team member' }))

    expect(screen.getByRole('heading', { name: 'Andrea' })).toBeInTheDocument()
    expect(screen.getByText('2 / 2')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Nehiel' })).not.toBeInTheDocument()
  })

  it('wraps forwards from the last member to the first', async () => {
    const user = userEvent.setup()
    render(<TeamSlider initialIndex={1} members={MEMBERS} />)

    expect(screen.getByText('2 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next team member' }))

    expect(screen.getByRole('heading', { name: 'Nehiel' })).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('tracks the counter across a full cycle', async () => {
    const user = userEvent.setup()
    render(<TeamSlider members={MEMBERS} />)

    const next = screen.getByRole('button', { name: 'Next team member' })
    expect(screen.getByText('1 / 2')).toBeInTheDocument()

    await user.click(next)
    expect(screen.getByText('2 / 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next team member' }))
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })
})

describe('GalleryStrip: the rolling window', () => {
  it('advances by one photograph, not by three', async () => {
    const user = userEvent.setup()
    render(<GalleryStrip photos={PHOTOS} />)

    expect(visibleTiles()).toEqual(['Photo A', 'Photo B', 'Photo C'])

    await user.click(screen.getByRole('button', { name: 'Next photos' }))

    expect(visibleTiles()).toEqual(['Photo B', 'Photo C', 'Photo D'])
  })

  it('wraps at the end of the list', async () => {
    const user = userEvent.setup()
    render(<GalleryStrip photos={PHOTOS} />)

    const advance = async () => user.click(screen.getByRole('button', { name: 'Next photos' }))

    await advance()
    await advance()
    expect(visibleTiles()).toEqual(['Photo C', 'Photo D', 'Photo A'])

    await advance()
    expect(visibleTiles()).toEqual(['Photo D', 'Photo A', 'Photo B'])

    // One more press completes the cycle and returns to the starting tiles.
    await advance()
    expect(visibleTiles()).toEqual(['Photo A', 'Photo B', 'Photo C'])
  })

  it('wraps backwards from the first tile to the last', async () => {
    const user = userEvent.setup()
    render(<GalleryStrip photos={PHOTOS} />)

    await user.click(screen.getByRole('button', { name: 'Previous photos' }))

    expect(visibleTiles()).toEqual(['Photo D', 'Photo A', 'Photo B'])
  })

  it('shows one tile per photograph when the list is shorter than the window', () => {
    render(<GalleryStrip photos={PHOTOS.slice(0, 2)} />)

    const tiles = visibleTiles()
    expect(tiles).toEqual(['Photo A', 'Photo B'])
    expect(new Set(tiles).size).toBe(tiles.length)
  })

  it('hides the controls when there is nowhere to roll to', () => {
    render(<GalleryStrip photos={PHOTOS.slice(0, 2)} />)

    expect(screen.queryByRole('button', { name: 'Next photos' })).not.toBeInTheDocument()
  })
})

describe('SocialLinks accessible names', () => {
  it('disambiguates each member’s profile links by name', () => {
    render(<TeamSlider members={[{ ...MEMBERS[0]!, facebookHref: '/fb', linkedinHref: '/li' }]} />)

    const card = screen.getByRole('article')
    expect(within(card).getByRole('link', { name: 'Nehiel on Facebook' })).toBeInTheDocument()
    expect(within(card).getByRole('link', { name: 'Nehiel on LinkedIn' })).toBeInTheDocument()
  })
})
