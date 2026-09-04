/**
 * The text half of the team slider: name, uppercase role, biography, and the
 * previous/next controls with their position counter.
 *
 * The counter is passed in rather than derived, because the component that
 * owns the index is `TeamSlider` and this one is presentational.
 *
 * @module components/react/salt/TeamMemberBio
 */

import IconButton from '#components/react/salt/IconButton'

export type Props = {
  name: string
  role: string
  /** Newlines are preserved, so a multi-paragraph biography renders as drawn. */
  bio: string
  /** Position text, e.g. "1 / 2". Omit along with the handlers to hide the control row. */
  counter?: string | undefined
  onPrev?: (() => void) | undefined
  onNext?: (() => void) | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The biography block, with the control row omitted when no handler is given.
 */
export default function TeamMemberBio({
  name,
  role,
  bio,
  counter,
  onPrev,
  onNext,
  className,
}: Props) {
  const hasControls = Boolean(onPrev) || Boolean(onNext)

  return (
    <div className={['salt-team-bio', className].filter(Boolean).join(' ')}>
      <div className="salt-team-bio__head">
        <h3 className="salt-team-bio__name">{name}</h3>
        <div className="salt-team-bio__role">{role}</div>
      </div>
      <p className="salt-team-bio__text">{bio}</p>
      {hasControls ? (
        <div className="salt-team-bio__controls">
          <IconButton
            direction="prev"
            label="Previous team member"
            tone="orange"
            onClick={onPrev}
          />
          <IconButton direction="next" label="Next team member" tone="orange" onClick={onNext} />
          {counter ? <div className="salt-team-bio__counter">{counter}</div> : null}
        </div>
      ) : null}
    </div>
  )
}
