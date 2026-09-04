/**
 * A 400px portrait with a gradient scrim caption carrying the member's name,
 * role and social links.
 *
 * @module components/react/salt/TeamMemberCard
 */

import SocialLinks from '#components/react/salt/SocialLinks'

export type Props = {
  name: string
  role: string
  photoSrc?: string | undefined
  /** Defaults to the member's name, which is what the photograph shows. */
  photoAlt?: string | undefined
  facebookHref?: string | undefined
  linkedinHref?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The portrait with its scrim caption.
 */
export default function TeamMemberCard({
  name,
  role,
  photoSrc,
  photoAlt,
  facebookHref,
  linkedinHref,
  className,
}: Props) {
  return (
    <article className={['salt-team-card', className].filter(Boolean).join(' ')}>
      {photoSrc ? (
        <img alt={photoAlt ?? name} className="salt-team-card__photo" src={photoSrc} />
      ) : null}
      <div className="salt-team-card__caption">
        <div className="salt-team-card__name">{name}</div>
        <div className="salt-team-card__role">{role}</div>
        <SocialLinks
          owner={name}
          tone="light"
          facebookHref={facebookHref}
          linkedinHref={linkedinHref}
        />
      </div>
    </article>
  )
}
