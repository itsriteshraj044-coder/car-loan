import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import Img from './Img'
import styles from './ImageReveal.module.css'

interface ImageRevealProps {
  name: string
  alt: string
  sizes?: string
  className?: string
  /** reveal direction of the clip-path wipe */
  from?: 'bottom' | 'left' | 'right'
  parallax?: boolean
  caption?: string
  eager?: boolean
}

/** Image that wipes in with a clip-path and settles from a slight zoom, with optional parallax drift. */
export default function ImageReveal({ name, alt, sizes, className, from = 'bottom', parallax = true, caption, eager }: ImageRevealProps) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !wrap.current || !inner.current) return
    const start = { bottom: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' }[from]
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: wrap.current, start: 'top 85%', once: true } })
      tl.fromTo(wrap.current, { clipPath: start }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' })
        .fromTo(inner.current, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
      if (parallax) {
        gsap.fromTo(
          inner.current!.firstElementChild,
          { yPercent: -5 },
          { yPercent: 5, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      }
    }, wrap)
    return () => ctx.revert()
  }, [from, parallax])

  return (
    <div ref={wrap} className={`${styles.wrap} ${className ?? ''}`}>
      <div ref={inner} className={styles.inner}>
        <div style={{ width: '100%', height: '100%' }}>
          <Img name={name} alt={alt} sizes={sizes} eager={eager} />
        </div>
      </div>
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  )
}
