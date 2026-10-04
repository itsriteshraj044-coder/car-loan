import type { ReactNode } from 'react'
import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  /** "split" puts the lead to the right of the title on wide screens */
  layout?: 'stack' | 'split' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}

export default function SectionTitle({ eyebrow, title, lead, layout = 'stack', as: H = 'h2', className }: SectionTitleProps) {
  const cls = [styles.wrap, layout === 'split' && styles.split, layout === 'center' && styles.center, className].filter(Boolean).join(' ')
  const heading = (
    <div className={styles.titleBlock}>
      <span className="eyebrow" data-reveal>{eyebrow}</span>
      <H className={styles.title} data-reveal>{title}</H>
    </div>
  )
  return (
    <div className={cls}>
      {layout === 'center' ? (
        <>
          <span className="eyebrow" data-reveal>{eyebrow}</span>
          <H className={styles.title} data-reveal>{title}</H>
        </>
      ) : heading}
      {lead && <p className={`lead ${styles.lead}`} data-reveal>{lead}</p>}
    </div>
  )
}
