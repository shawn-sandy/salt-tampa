/**
 * A 250px photograph above a title, an optional status badge, and body copy.
 *
 * The design shows five of these. Three carry a photograph, one has no chosen
 * artwork, and one carries both an empty slot and a "Coming soon" badge, so
 * the component has to handle every combination rather than only the happy
 * case.
 *
 * @module components/react/salt/ServiceCard
 */

import Badge from '#components/react/salt/Badge'
import ImageSlot from '#components/react/salt/ImageSlot'

export type Props = {
  title: string
  body: string
  /** When omitted, the card shows `ImageSlot`'s labelled placeholder. */
  imageSrc?: string | undefined
  imageAlt?: string | undefined
  /** Label shown in the empty state when there is no `imageSrc`. */
  placeholder?: string | undefined
  /** Status pill beside the title, e.g. "Coming soon". */
  badge?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns One service card.
 */
export default function ServiceCard({
  title,
  body,
  imageSrc,
  imageAlt = '',
  placeholder = 'Service photo not chosen yet',
  badge,
  className,
}: Props) {
  return (
    <article className={['salt-service-card', className].filter(Boolean).join(' ')}>
      <div className="salt-service-card__media">
        <ImageSlot
          alt={imageAlt}
          fit="cover"
          placeholder={placeholder}
          shape="rounded"
          src={imageSrc}
        />
      </div>
      <div className="salt-service-card__text">
        <div className="salt-service-card__title-row">
          <h3 className="salt-service-card__title">{title}</h3>
          {badge ? <Badge>{badge}</Badge> : null}
        </div>
        <p className="salt-service-card__body">{body}</p>
      </div>
    </article>
  )
}
