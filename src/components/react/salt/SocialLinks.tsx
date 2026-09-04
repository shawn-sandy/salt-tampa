/**
 * The Facebook and LinkedIn icon pair the design puts in a team member's photo
 * caption.
 *
 * `owner` disambiguates the accessible names. The page carries one of these
 * pairs per team member, so two links both named "Facebook" would give a screen
 * reader user no way to tell whose profile they are about to open.
 *
 * @module components/react/salt/SocialLinks
 */

export type Props = {
  facebookHref?: string | undefined
  linkedinHref?: string | undefined
  /** Whose profiles these are, folded into each link's accessible name. */
  owner?: string | undefined
  /** `light` for the icons over a dark photograph, `dark` for them on white. */
  tone?: 'light' | 'dark' | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns A row of social icon links; nothing at all when no href is supplied.
 */
export default function SocialLinks({
  facebookHref,
  linkedinHref,
  owner,
  tone = 'light',
  className,
}: Props) {
  if (!facebookHref && !linkedinHref) return null

  const name = (network: string) => (owner ? `${owner} on ${network}` : network)

  return (
    <div className={['salt-social', `salt-social--${tone}`, className].filter(Boolean).join(' ')}>
      {facebookHref ? (
        <a aria-label={name('Facebook')} className="salt-social__link" href={facebookHref}>
          <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
            <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5h1.7V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.5v3h2.8v8h3.2z" />
          </svg>
        </a>
      ) : null}
      {linkedinHref ? (
        <a aria-label={name('LinkedIn')} className="salt-social__link" href={linkedinHref}>
          <svg aria-hidden="true" fill="currentColor" height="15" viewBox="0 0 24 24" width="15">
            <path d="M6.9 8.4H4V20h2.9V8.4zM5.4 3.5a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM20 13.6c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.9-2.9 1.6V8.4H10.5V20h2.9v-6.2c0-1.3.6-2.1 1.8-2.1 1.1 0 1.9.7 1.9 2.1V20H20v-6.4z" />
          </svg>
        </a>
      ) : null}
    </div>
  )
}
