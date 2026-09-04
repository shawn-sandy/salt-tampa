/**
 * The donate section, rebuilt as real text over a background photograph.
 *
 * The design draws this section as a flat photograph with its message baked
 * into the pixels and a 12%-wide invisible link positioned over the artwork.
 * No screen reader can read that, no search engine can index it, no translator
 * can translate it, and nobody can select or resize it. The heading, the body
 * copy and the button are real elements here; the photograph is background.
 *
 * @module components/react/salt/DonateBand
 */

import Action from '#components/react/salt/Action'

export type Props = {
  heading: string
  body?: string | undefined
  actionLabel?: string | undefined
  actionHref?: string | undefined
  /** Background photograph. Decorative -- the message is real text above it. */
  imageSrc?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The donate band.
 */
export default function DonateBand({
  heading,
  body,
  actionLabel = 'Donate',
  actionHref = '#donate',
  imageSrc,
  className,
}: Props) {
  return (
    <section className={['salt-donate', className].filter(Boolean).join(' ')} id="donate">
      {imageSrc ? <img alt="" className="salt-donate__image" src={imageSrc} /> : null}
      <div className="salt-donate__scrim" />
      <div className="salt-donate__content">
        <h2 className="salt-donate__heading">{heading}</h2>
        {body ? <p className="salt-donate__body">{body}</p> : null}
        {actionLabel ? (
          <Action href={actionHref} variant="solid">
            {actionLabel}
          </Action>
        ) : null}
      </div>
    </section>
  )
}
