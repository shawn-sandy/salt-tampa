/**
 * The one action control behind all four button flavours in the Salt Tampa
 * homepage design.
 *
 * The design draws these as four separately-styled boxes -- an orange fill, a
 * bare label with a trailing arrow, a white fill with a shadow, and a fully
 * rounded navigation chip. They are one control with different fills and
 * radii, so they are one component with a `variant` prop; that is what keeps
 * hover, focus and disabled behaviour identical across all four.
 *
 * Renders an `<a>` when `href` is set and the control is enabled, and a
 * `<button>` otherwise. A disabled control is never a live link: `aria-disabled`
 * alone leaves the `href` followable by pointer and keyboard, so the only form
 * the browser actually refuses to activate is `<button disabled>`.
 *
 * @module components/react/salt/Action
 */

import type { ReactNode } from 'react'

export type Props = {
  /** `solid` is the orange fill, `ghost` a bare label, `light` a white fill with a shadow, `pill` the rounded nav chip. */
  variant?: 'solid' | 'ghost' | 'light' | 'pill' | undefined
  /** Renders an `<a>` instead of a `<button>`, unless the control is disabled. */
  href?: string | undefined
  /** Forces a `<button disabled>` even when `href` is set. */
  disabled?: boolean | undefined
  /** Only applies when rendering a `<button>`. */
  type?: 'button' | 'submit' | 'reset' | undefined
  /** Appends the design's trailing arrow glyph after the label. */
  arrow?: boolean | undefined
  onClick?: (() => void) | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
  children: ReactNode
}

/**
 * @param props - See {@link Props}.
 * @returns An `<a>` for an enabled link, otherwise a `<button>`.
 */
export default function Action({
  variant = 'solid',
  href,
  disabled = false,
  type = 'button',
  arrow = false,
  onClick,
  className,
  children,
}: Props) {
  const isLink = Boolean(href) && !disabled
  const classes = ['salt-action', `salt-action--${variant}`, className].filter(Boolean).join(' ')

  const content = (
    <>
      {children}
      {arrow ? (
        <span aria-hidden="true" className="salt-action__arrow">
          &rarr;
        </span>
      ) : null}
    </>
  )

  if (isLink) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {content}
    </button>
  )
}
