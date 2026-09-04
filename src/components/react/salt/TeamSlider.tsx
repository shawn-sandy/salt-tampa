/**
 * The team slider: a portrait beside a biography, with the member index
 * wrapping around at both ends.
 *
 * The design file's slider logic lives in a canvas-only scripting layer that
 * does not survive export, so the wrap-around is rebuilt here rather than
 * ported. Stepping back from the first member lands on the last, and forward
 * from the last lands on the first -- the modular arithmetic is what the tests
 * in tests/components/SaltPatterns.react.test.tsx pin down.
 *
 * @module components/react/salt/TeamSlider
 */

import { useState } from 'react'

import TeamMemberBio from '#components/react/salt/TeamMemberBio'
import TeamMemberCard from '#components/react/salt/TeamMemberCard'

export type TeamMember = {
  name: string
  role: string
  bio: string
  photoSrc?: string | undefined
  facebookHref?: string | undefined
  linkedinHref?: string | undefined
}

export type Props = {
  members: TeamMember[]
  /** Which member to show first. */
  initialIndex?: number | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The slider, or nothing at all when `members` is empty.
 */
export default function TeamSlider({ members, initialIndex = 0, className }: Props) {
  const [index, setIndex] = useState(initialIndex)

  if (members.length === 0) return null

  const count = members.length
  const safeIndex = ((index % count) + count) % count
  const member = members[safeIndex]

  if (!member) return null

  /** Steps the index by `step`, wrapping at both ends. */
  const go = (step: number) => setIndex(current => (((current + step) % count) + count) % count)

  return (
    <div className={['salt-team-slider', className].filter(Boolean).join(' ')}>
      <TeamMemberCard
        key={`photo-${safeIndex}`}
        className="salt-slide"
        name={member.name}
        role={member.role}
        photoSrc={member.photoSrc}
        facebookHref={member.facebookHref}
        linkedinHref={member.linkedinHref}
      />
      <TeamMemberBio
        key={`bio-${safeIndex}`}
        bio={member.bio}
        className="salt-slide"
        counter={`${safeIndex + 1} / ${count}`}
        name={member.name}
        onNext={() => go(1)}
        onPrev={() => go(-1)}
        role={member.role}
      />
    </div>
  )
}
