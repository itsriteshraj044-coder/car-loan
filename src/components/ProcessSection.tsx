import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import SectionTitle from './SectionTitle'
import styles from './ProcessSection.module.css'

export interface ProcessStep {
  title: string
  text: string
}

interface ProcessSectionProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  steps: ProcessStep[]
  dark?: boolean
  id?: string
  /** extra content rendered below the timeline, inside the same section */
  children?: ReactNode
}

/** Numbered timeline whose brand-coloured rail fills as you scroll (horizontal on desktop, vertical on mobile). */
export default function ProcessSection({ eyebrow, title, lead, steps, dark, id, children }: ProcessSectionProps) {
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!track.current) return
    const q = gsap.utils.selector(track)
    if (prefersReducedMotion()) {
      gsap.set(q('[data-fill]'), { scaleX: 1, scaleY: 1 })
      return
    }
    const mm = gsap.matchMedia()
    const build = (axis: 'scaleX' | 'scaleY') => {
      gsap.fromTo(q('[data-fill]'), { [axis]: 0 }, {
        [axis]: 1, ease: 'none',
        scrollTrigger: { trigger: track.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      })
      gsap.from(q('[data-step]'), {
        y: 50, opacity: 0, duration: 1, stagger: 0.14,
        scrollTrigger: { trigger: track.current, start: 'top 82%', once: true },
      })
    }
    mm.add('(min-width: 901px)', () => build('scaleX'))
    mm.add('(max-width: 900px)', () => build('scaleY'))
    return () => mm.revert()
  }, [])

  return (
    <section id={id} className={`section ${dark ? 'section--dark' : ''} ${styles.section} ${dark ? styles.dark : ''}`}>
      <div className={styles.head}>
        <SectionTitle eyebrow={eyebrow} title={title} lead={lead} layout="split" />
      </div>
      <div ref={track} className={styles.track}>
        <span className={styles.rail} aria-hidden="true" />
        <span className={styles.fill} data-fill aria-hidden="true" />
        <ol className={styles.list} style={{ ['--cols' as string]: steps.length }}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step} data-step>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.text}</p>
          </li>
        ))}
        </ol>
      </div>
      {children}
    </section>
  )
}
