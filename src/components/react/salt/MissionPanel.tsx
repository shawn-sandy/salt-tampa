/**
 * A heading and paragraph sized for the orange band.
 *
 * The design places two of these -- "Our Mission" and "Our Vision" -- inside
 * one full-width orange section, side by side on wide screens and stacked on
 * narrow ones. The band itself is layout, so it lives in the page composition;
 * this component is one heading-and-paragraph block inside it.
 *
 * @module components/react/salt/MissionPanel
 */

export type Props = {
  heading: string
  body: string
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns One centred heading with its paragraph.
 */
export default function MissionPanel({ heading, body, className }: Props) {
  return (
    <div className={['salt-mission', className].filter(Boolean).join(' ')}>
      <h2 className="salt-mission__heading">{heading}</h2>
      <p className="salt-mission__body">{body}</p>
    </div>
  )
}
