/**
 * The Salt Tampa lockup at its three drawn sizes: 21px tall in the navigation
 * bar, 19px in the footer, and display size inside the hero.
 *
 * The bars draw `public/images/navbar-salt-logo.svg`, the compact lockup with
 * the emblem set inline between the words; the hero draws
 * `public/images/salt-logo.svg`, whose skyline emblem stands above the
 * letterforms and needs the room. Both are white on transparent, and the
 * footer sits on white, so they are used as CSS masks rather than `<img>`s:
 * the alpha channel supplies the shape and `currentcolor` supplies the ink,
 * letting one asset draw white over a photograph and sage in the footer.
 *
 * The nav and footer elements carry the brand name as their accessible name,
 * so a screen reader still announces "Salt Tampa"; the hero one repeats the
 * nav lockup and is hidden from assistive tech instead.
 *
 * @module components/react/salt/Wordmark
 */

export type Props = {
  /**
   * `nav` is the 21px white lockup over the hero; `footer` is the 19px green
   * one; `hero` is the display-size white lockup inside the hero itself.
   */
  size?: 'nav' | 'footer' | 'hero' | undefined
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

  // The hero lockup sits under the navigation bar's, which already announces
  // the brand, so it is decorative and stays out of the accessibility tree.
  if (size === 'hero') {
    return <span aria-hidden="true" className={classes} />
  }

  // A link already announces its accessible name; `role="img"` on the anchor
  // would take the link semantics away, so only the standalone span carries it.
  if (href) {
    return <a aria-label="Salt Tampa" className={classes} href={href} />
  }

  return <span aria-label="Salt Tampa" className={classes} role="img" />
}
