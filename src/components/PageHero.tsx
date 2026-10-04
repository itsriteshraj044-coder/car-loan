import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import { useIntroDone } from '../context/IntroContext'
import Img from './Img'
import SplitText from './SplitText'
import styles from './PageHero.module.css'

interface PageHeroProps {
  crumb: string
  lines: string[]
  accent?: Record<string, string>
  lead: string
  image: string
  imageAlt: string
  footLeft?: string
  footRight?: string
}

/** Full-bleed photographic hero shared by the inner pages. */
export default function PageHero({ crumb, lines, accent, lead, image, imageAlt, footLeft, footRight }: PageHeroProps) {
  const root = useRef<HTMLElement>(null)
  const introDone = useIntroDone()

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current || !introDone) return
    const q = gsap.utils.selector(root)
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.35, defaults: { ease: 'power4.out' } })
        .fromTo(q('[data-media]'), { scale: 1.15 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
        .fromTo(q('.split-inner'), { yPercent: 115 }, { yPercent: 0, duration: 1.25, stagger: 0.06 }, 0.05)
        .fromTo(q('[data-fade]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.5)
      gsap.to(q('[data-media]'), {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [introDone])

  return (
    <section ref={root} className={styles.hero}>
      <div className={styles.media} data-media>
        <Img name={image} alt={imageAlt} eager />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <nav className={styles.crumbs} aria-label="Breadcrumb" data-fade>
        <Link to="/">Home</Link>
        <span className={styles.sep} aria-hidden="true" />
        <span aria-current="page">{crumb}</span>
      </nav>

      <div className={styles.grid}>
        <SplitText as="h1" className={styles.title} lines={lines} accent={accent} />
        <p className={styles.lead} data-fade>{lead}</p>
      </div>

      {(footLeft || footRight) && (
        <div className={styles.foot} data-fade>
          <span>{footLeft}</span>
          <span>{footRight}</span>
        </div>
      )}
    </section>
  )
}
