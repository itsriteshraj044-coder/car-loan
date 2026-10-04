import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import styles from './LoadingScreen.module.css'

/**
 * ~1.8s brand intro: the logo wipes in left→right (like the X's motion line),
 * a blue/red progress line fills, then the white panel lifts away revealing a
 * blue wipe and the site beneath.
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    document.body.classList.add('is-loading')
    const q = gsap.utils.selector(root)
    const done = () => {
      document.body.classList.remove('is-loading')
      onComplete()
    }

    if (prefersReducedMotion()) {
      const t = gsap.to(root.current, { opacity: 0, duration: 0.3, delay: 0.4, onComplete: done })
      return () => { t.kill() }
    }

    const counter = { v: 0 }
    const tl = gsap.timeline({ onComplete: done })
    tl.set(q('[data-logo]'), { clipPath: 'inset(0% 100% 0% 0%)', scale: 0.94, opacity: 1 })
      .to(q('[data-logo]'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' }, 0.1)
      .to(q('[data-logo]'), { scale: 1, duration: 1.4, ease: 'power3.out' }, 0.1)
      .to(q('[data-fill]'), { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0.15)
      .to(counter, {
        v: 100, duration: 1.15, ease: 'power2.inOut',
        onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0') },
      }, 0.15)
      .to(q('[data-center]'), { y: -30, opacity: 0, duration: 0.45, ease: 'power2.in' }, 1.35)
      .to(q('[data-white]'), { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 1.45)
      .to(q('[data-red]'), { yPercent: -100, scaleY: 0, duration: 0.6, ease: 'power4.inOut' }, 1.5)
      .to(q('[data-blue]'), { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 1.6)

    return () => { tl.kill(); document.body.classList.remove('is-loading') }
  }, [onComplete])

  return (
    <div ref={root} className={styles.screen} role="status" aria-label="Loading CARZENX">
      <div className={`${styles.layer} ${styles.blue}`} data-blue>
        <div className={`${styles.layer} ${styles.red}`} data-red />
      </div>
      <div className={`${styles.layer} ${styles.white}`} data-white>
        <div className={styles.center} data-center>
          <img
            className={styles.logo}
            src="/images/carzenx-logo-720.png"
            alt="CARZENX — Car Loan • DSA Distributor"
            width={1479}
            height={350}
            data-logo
            style={{ opacity: 0 }}
          />
          <div className={styles.bar}><span className={styles.fill} data-fill /></div>
          <div className={styles.meta}>
            <span>Car Loan · DSA Distributor</span>
            <span className={styles.count} ref={count}>000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
