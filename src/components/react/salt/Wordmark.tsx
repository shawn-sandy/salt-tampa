/**
 * The Salt Tampa lockup at its two drawn sizes: 22px tall in the navigation
 * bar and 20px in the footer.
 *
 * The artwork is `public/images/navbar-salt-logo.svg`, white on transparent.
 * The footer sits on white, so it is used as a CSS mask rather than an `<img>`:
 * its alpha channel supplies the shape and `currentcolor` supplies the ink,
 * letting one asset draw white over the hero and sage in the footer.
 * The element carries the brand name as its accessible name, so a screen
 * reader still announces "Salt Tampa".
 *
 * @module components/react/salt/Wordmark
 */

export type Props = {
  /** `nav` is the 22px white lockup over the hero; `footer` is the 20px green one. */
  size?: 'nav' | 'footer' | undefined
  /** Renders the lockup as a link. */
  href?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The lockup, as an `<a>` when `href` is supplied.
 */
export default function Wordmark({ size = 'nav', href, className }: Props) {
  const classes = ['salt-wordmark', `salt-wordmark--${size}`, className].filter(Boolean).join(' ')

  // A link already announces its accessible name; `role="img"` on the anchor
  // would take the link semantics away, so only the standalone span carries it.
  if (href) {
    return <a aria-label="Salt Tampa" className={classes} href={href} />
  }

  return <span aria-label="Salt Tampa" className={classes} role="img" />
}
