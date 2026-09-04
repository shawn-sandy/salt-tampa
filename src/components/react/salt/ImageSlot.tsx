/**
 * A photograph, or a labelled placeholder when nobody has chosen one yet.
 *
 * The design marks six unchosen images with a custom `<image-slot>` element --
 * four partner logos, two service photos and the testimonial background. The
 * library needs a real component for "picture not chosen yet" so those slots
 * render as a visible, readable label rather than a broken image or an empty
 * box a reviewer would mistake for a layout bug.
 *
 * @module components/react/salt/ImageSlot
 */

export type Props = {
  /** When omitted, the placeholder is rendered instead of an `<img>`. */
  src?: string | undefined
  /** Alternative text. Pass `''` deliberately for a decorative photograph. */
  alt?: string | undefined
  /** Label shown in the empty state. */
  placeholder?: string | undefined
  /** `rounded` applies the design's 10px photo radius; `rect` leaves square corners. */
  shape?: 'rounded' | 'rect' | undefined
  /** How a supplied photograph fills the slot. */
  fit?: 'cover' | 'contain' | undefined
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The photograph when `src` is set, otherwise a dashed placeholder box.
 */
export default function ImageSlot({
  src,
  alt = '',
  placeholder = 'Image not chosen yet',
  shape = 'rounded',
  fit = 'cover',
  className,
}: Props) {
  const classes = [
    'salt-image-slot',
    `salt-image-slot--${shape}`,
    `salt-image-slot--${fit}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {src ? (
        <img alt={alt} className="salt-image-slot__img" src={src} />
      ) : (
        <div className="salt-image-slot__empty">{placeholder}</div>
      )}
    </div>
  )
}
