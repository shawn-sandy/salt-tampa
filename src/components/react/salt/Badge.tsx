/**
 * The uppercase status pill the design puts beside a service title, drawn as
 * orange text on an orange tint.
 *
 * Only one appears in the design ("Coming soon"), but the label is content
 * rather than a fixed string, so it is a child rather than a variant.
 *
 * @module components/react/salt/Badge
 */

import type { ReactNode } from 'react'

export type Props = {
  /** Extra classes appended to the generated ones. */
  className?: string | undefined
  children: ReactNode
}

/**
 * @param props - See {@link Props}.
 * @returns A `<span>` styled as the status pill.
 */
export default function Badge({ className, children }: Props) {
  return <span className={['salt-badge', className].filter(Boolean).join(' ')}>{children}</span>
}
