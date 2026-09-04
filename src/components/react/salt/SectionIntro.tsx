/**
 * The centred heading, lead paragraph and action pair that opens both the
 * services section and the team section.
 *
 * The design uses this block identically in both places, down to the same two
 * button labels, so the copy is props rather than markup.
 *
 * @module components/react/salt/SectionIntro
 */

import Action from '#components/react/salt/Action'

export type Props = {
  heading: string
  lead: string
  /** Label for the bare ghost action on the left. Omit to drop it. */
  secondaryLabel?: string | undefined
  secondaryHref?: string | undefined
  /** Label for the orange action on the right. Omit to drop it. */
  primaryLabel?: string | undefined
  primaryHref?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The centred intro block, with the action row omitted when no label is given.
 */
export default function SectionIntro({
  heading,
  lead,
  secondaryLabel,
  secondaryHref,
  primaryLabel,
  primaryHref,
  className,
}: Props) {
  const hasActions = Boolean(secondaryLabel) || Boolean(primaryLabel)

  return (
    <div className={['salt-section-intro', className].filter(Boolean).join(' ')}>
      <h2 className="salt-section-intro__heading">{heading}</h2>
      <p className="salt-section-intro__lead">{lead}</p>
      {hasActions ? (
        <div className="salt-section-intro__actions">
          {secondaryLabel ? (
            <Action arrow href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Action>
          ) : null}
          {primaryLabel ? (
            <Action arrow href={primaryHref} variant="solid">
              {primaryLabel}
            </Action>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
