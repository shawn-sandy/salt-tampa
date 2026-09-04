/**
 * The four-up partner logo row.
 *
 * All four slots are unchosen in the design, so each renders `ImageSlot`'s
 * labelled placeholder until artwork arrives.
 *
 * @module components/react/salt/PartnerGrid
 */

import ImageSlot from '#components/react/salt/ImageSlot'

export type Partner = {
  /** When omitted, the slot shows its placeholder label. */
  src?: string | undefined
  /** The partner's name. Used as the logo's alternative text. */
  alt?: string | undefined
  placeholder?: string | undefined
}

export type Props = {
  heading?: string | undefined
  partners: Partner[]
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
}

/**
 * @param props - See {@link Props}.
 * @returns The heading with its logo row.
 */
export default function PartnerGrid({ heading = 'Our Partners', partners, className }: Props) {
  return (
    <section className={['salt-partners', className].filter(Boolean).join(' ')} id="partners">
      <div className="salt-partners__inner">
        <h2 className="salt-partners__heading">{heading}</h2>
        <div className="salt-partners__grid">
          {partners.map((partner, i) => (
            <div className="salt-partners__slot" key={partner.src ?? `slot-${i}`}>
              <ImageSlot
                alt={partner.alt ?? ''}
                fit="contain"
                placeholder={partner.placeholder ?? 'Partner logo'}
                shape="rect"
                src={partner.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
