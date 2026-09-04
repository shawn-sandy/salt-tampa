/**
 * The Salt Tampa lockup at its two drawn sizes: 20px in the navigation bar and
 * 18px in the footer.
 *
 * The design file supplies the wordmark as a flattened bitmap. It is rebuilt
 * here as the salt-crystal glyph beside real text, so the brand name is
 * selectable, translatable, indexable, and readable by a screen reader -- none
 * of which a picture of a word is.
 *
 * @module components/react/salt/Wordmark
 */

export type Props = {
  /** `nav` is the 20px white lockup over the hero; `footer` is the 18px green one. */
  size?: 'nav' | 'footer' | undefined
  /** Wraps the lockup in a link. */
  href?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/** The salt-crystal glyph, shared by both sizes. */
function Glyph() {
  return (
    <svg
      aria-hidden="true"
      className="salt-wordmark__glyph"
      height="18"
      viewBox="0 0 23.158 20"
      width="21"
    >
      <path
        d="M 15.893 2.426 C 15.542 1.577 14.328 1.611 14.025 2.478 L 11.549 9.567 C 11.263 10.386 10.141 10.477 9.727 9.715 L 7.362 5.369 C 6.954 4.619 5.855 4.692 5.55 5.49 L 0.519 18.643 C 0.269 19.297 0.752 20 1.453 20 L 21.662 20 C 22.375 20 22.859 19.276 22.587 18.618 L 15.893 2.426 Z"
        fillRule="nonzero"
      />
    </svg>
  )
}

/**
 * @param props - See {@link Props}.
 * @returns The lockup, wrapped in an `<a>` when `href` is supplied.
 */
export default function Wordmark({ size = 'nav', href, className }: Props) {
  const classes = ['salt-wordmark', `salt-wordmark--${size}`, className].filter(Boolean).join(' ')

  const content = (
    <>
      <Glyph />
      <span className="salt-wordmark__word">Salt Tampa</span>
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    )
  }

  return <span className={classes}>{content}</span>
}
