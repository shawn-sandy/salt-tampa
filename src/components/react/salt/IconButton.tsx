/**
 * The circular previous/next control, drawn at 34px in three tones: orange on
 * the team slider, sage on the photo gallery, and a translucent outline over
 * the testimonial photograph.
 *
 * `label` is required and becomes the button's `aria-label`. The control
 * carries only an arrow glyph, so without it a screen reader announces nothing
 * but a direction -- and there are three pairs of these on the page, which
 * makes "next" alone ambiguous.
 *
 * The drawn circle stays 34px. WCAG 2.5.8 asks for a 44x44px pointer target,
 * so `.salt-icon-button::after` grows the hit box with a centred invisible
 * overlay rather than by enlarging the button.
 *
 * @module components/react/salt/IconButton
 */

export type Props = {
  /** Accessible name, e.g. "Previous team member". Required -- the glyph alone says nothing useful. */
  label: string
  /** Which arrow to draw. */
  direction?: 'prev' | 'next' | undefined
  /** `orange` on the team slider, `sage` on the gallery, `outline` over a photograph. */
  tone?: 'orange' | 'sage' | 'outline' | undefined
  onClick?: (() => void) | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns A round `<button>` carrying a directional arrow.
 */
export default function IconButton({
  label,
  direction = 'next',
  tone = 'orange',
  onClick,
  className,
}: Props) {
  const classes = ['salt-icon-button', `salt-icon-button--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button aria-label={label} className={classes} onClick={onClick} type="button">
      <span aria-hidden="true">{direction === 'prev' ? '←' : '→'}</span>
    </button>
  )
}
