/**
 * The hero: a photograph, a gradient scrim, and the event eyebrow, headline
 * and two calls to action.
 *
 * The photograph is a CSS background on the section rather than an `<img>`, so
 * `background-size: cover` sizes it at every width without the element needing
 * its own height. That makes it decorative to assistive tech, which suits a
 * backdrop -- every word in the hero is real text in the DOM.
 *
 * The design sizes this block's type in `cqw` -- a percentage of the container
 * width -- which renders the eyebrow at roughly five pixels on a 320px phone.
 * Faithful to the drawing, unreadable in practice. `.salt-hero__*` uses fixed
 * sizes instead, and the action row wraps rather than overflowing.
 *
 * @module components/react/salt/Hero
 */

import type { ReactNode } from 'react'

import Action from '#components/react/salt/Action'

export type Props = {
  /** Background photograph, painted on the section with `background-size: cover`. */
  imageSrc?: string | undefined
  /** Small uppercase line above the headline. */
  eyebrow?: string | undefined
  headline: string
  primaryLabel?: string | undefined
  primaryHref?: string | undefined
  secondaryLabel?: string | undefined
  secondaryHref?: string | undefined
  /** The overlay navigation bar, rendered inside the hero so it sits over the photograph. */
  header?: ReactNode | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The hero section.
 */
export default function Hero({
  imageSrc,
  eyebrow,
  headline,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  header,
  className,
}: Props) {
  return (
    <section
      className={['salt-hero', className].filter(Boolean).join(' ')}
      id="top"
      style={imageSrc ? { backgroundImage: `url(${JSON.stringify(imageSrc)})` } : undefined}
    >
      <div className="salt-hero__scrim" />
      {header}
      <div className="salt-hero__content">
        {eyebrow ? <div className="salt-hero__eyebrow">{eyebrow}</div> : null}
        <p className="salt-hero__headline">{headline}</p>
        {primaryLabel || secondaryLabel ? (
          <div className="salt-hero__actions">
            {secondaryLabel ? (
              <Action href={secondaryHref} variant="light">
                {secondaryLabel}
              </Action>
            ) : null}
            {primaryLabel ? (
              <Action href={primaryHref} variant="solid">
                {primaryLabel}
              </Action>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
