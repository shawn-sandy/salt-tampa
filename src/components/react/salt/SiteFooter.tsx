/**
 * The footer: wordmark, a four-link navigation row, a legal row and the
 * copyright line.
 *
 * @module components/react/salt/SiteFooter
 */

import Wordmark from '#components/react/salt/Wordmark'

export type FooterLink = {
  label: string
  href: string
}

export type Props = {
  links: FooterLink[]
  legalLinks?: FooterLink[] | undefined
  copyright: string
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The site footer.
 */
export default function SiteFooter({ links, legalLinks = [], copyright, className }: Props) {
  return (
    <footer className={['salt-footer', className].filter(Boolean).join(' ')} id="contact">
      <div className="salt-footer__top">
        <div className="salt-footer__brand">
          <Wordmark size="footer" />
          <nav aria-label="Footer" className="salt-footer__nav">
            {links.map(link => (
              <a className="salt-footer__link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="salt-footer__legal">
        {legalLinks.length > 0 ? (
          <nav aria-label="Legal" className="salt-footer__legal-nav">
            {legalLinks.map(link => (
              <a className="salt-footer__legal-link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
        <div className="salt-footer__copyright">{copyright}</div>
      </div>
    </footer>
  )
}
