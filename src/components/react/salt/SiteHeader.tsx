/**
 * The transparent navigation bar that overlays the hero: wordmark on the left,
 * links and a pill donate action on the right.
 *
 * The bar is positioned absolutely over the hero photograph, so it is rendered
 * inside the hero section rather than above it.
 *
 * @module components/react/salt/SiteHeader
 */

import Action from '#components/react/salt/Action'
import Wordmark from '#components/react/salt/Wordmark'

export type NavLink = {
  label: string
  href: string
}

export type Props = {
  links: NavLink[]
  donateLabel?: string | undefined
  donateHref?: string | undefined
  /** Where the wordmark links to. */
  homeHref?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The overlay navigation bar.
 */
export default function SiteHeader({
  links,
  donateLabel = 'Donate',
  donateHref = '#donate',
  homeHref = '#top',
  className,
}: Props) {
  return (
    <header className={['salt-header', className].filter(Boolean).join(' ')}>
      <Wordmark href={homeHref} size="nav" />
      <nav aria-label="Main" className="salt-header__nav">
        {links.map(link => (
          <a className="salt-header__link" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
        <Action href={donateHref} variant="pill">
          {donateLabel}
        </Action>
      </nav>
    </header>
  )
}
