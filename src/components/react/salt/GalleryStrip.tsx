/**
 * A rolling three-up photo strip.
 *
 * The strip shows three tiles taken from a longer list and advances by ONE
 * photograph per press, not three -- so the middle tile becomes the left tile
 * and a new photograph enters on the right. Pressing next as many times as
 * there are photographs returns to the starting tiles.
 *
 * A list shorter than three shows one tile per photograph rather than
 * repeating one to fill the row.
 *
 * @module components/react/salt/GalleryStrip
 */

import { useState } from 'react'

import IconButton from '#components/react/salt/IconButton'

export type GalleryPhoto = {
  src: string
  /** Describes this photograph for a screen reader. */
  alt: string
}

export type Props = {
  photos: GalleryPhoto[]
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/** How many tiles the design shows at once. */
const VISIBLE = 3

/**
 * @param props - See {@link Props}.
 * @returns The strip with its controls, or nothing at all when `photos` is empty.
 */
export default function GalleryStrip({ photos, className }: Props) {
  const [offset, setOffset] = useState(0)

  if (photos.length === 0) return null

  const count = photos.length
  const visible = Math.min(VISIBLE, count)
  const start = ((offset % count) + count) % count

  const go = (step: number) => setOffset(current => (((current + step) % count) + count) % count)

  const tiles = Array.from({ length: visible }, (_, k) => {
    const photo = photos[(start + k) % count]
    return { key: (start + k) % count, photo }
  })

  return (
    <div className={['salt-gallery', className].filter(Boolean).join(' ')}>
      <div className="salt-gallery__tiles">
        {tiles.map(({ key, photo }) =>
          photo ? (
            <div
              aria-label={photo.alt}
              className="salt-gallery__tile salt-slide"
              key={key}
              role="img"
              style={{ backgroundImage: `url("${photo.src}")` }}
            />
          ) : null
        )}
      </div>
      {count > visible ? (
        <div className="salt-gallery__controls">
          <IconButton direction="prev" label="Previous photos" onClick={() => go(-1)} tone="sage" />
          <IconButton direction="next" label="Next photos" onClick={() => go(1)} tone="sage" />
        </div>
      ) : null}
    </div>
  )
}
