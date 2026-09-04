/**
 * A quote and eyebrow over a scrimmed photograph, with previous/next controls.
 *
 * Both quotes in the design read "Testimonial coming soon." -- that is the
 * placeholder the design shipped, not copy this component invented, and it is
 * recorded as an open question in the plan.
 *
 * @module components/react/salt/TestimonialPanel
 */

import { useState } from 'react'

import IconButton from '#components/react/salt/IconButton'
import ImageSlot from '#components/react/salt/ImageSlot'

export type Props = {
  /** One or more quotes; the controls step through them and wrap at both ends. */
  quotes: string[]
  /** Small uppercase label above the quote. */
  eyebrow?: string | undefined
  /** Background photograph. When omitted the panel shows a labelled placeholder. */
  imageSrc?: string | undefined
  imageAlt?: string | undefined
  placeholder?: string | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The testimonial panel, or nothing at all when `quotes` is empty.
 */
export default function TestimonialPanel({
  quotes,
  eyebrow = 'Testimonials',
  imageSrc,
  imageAlt = '',
  placeholder = 'Service day photo not chosen yet',
  className,
}: Props) {
  const [index, setIndex] = useState(0)

  if (quotes.length === 0) return null

  const count = quotes.length
  const safeIndex = ((index % count) + count) % count
  const quote = quotes[safeIndex]

  const go = (step: number) => setIndex(current => (((current + step) % count) + count) % count)

  return (
    <div className={['salt-testimonial', className].filter(Boolean).join(' ')}>
      <ImageSlot alt={imageAlt} fit="cover" placeholder={placeholder} shape="rect" src={imageSrc} />
      <div className="salt-testimonial__scrim" />
      <div className="salt-testimonial__content">
        <div className="salt-testimonial__eyebrow">{eyebrow}</div>
        <p className="salt-slide salt-testimonial__quote" key={safeIndex}>
          {quote}
        </p>
        {count > 1 ? (
          <div className="salt-testimonial__controls">
            <IconButton
              direction="prev"
              label="Previous testimonial"
              onClick={() => go(-1)}
              tone="outline"
            />
            <IconButton
              direction="next"
              label="Next testimonial"
              onClick={() => go(1)}
              tone="outline"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
