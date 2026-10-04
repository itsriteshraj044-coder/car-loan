import { useEffect, useLayoutEffect, useRef } from 'react'
import { Network, FileCheck2, CarFront } from 'lucide-react'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import { useIntroDone } from '../context/IntroContext'
import SplitText from './SplitText'
import CTAButton from './CTAButton'
import styles from './Hero.module.css'

/**
 * Hero footage: "Car Driving at Night" by Erik Mclean, Pexels (free to use, Pexels licence)
 * https://www.pexels.com/video/car-driving-at-night-13643105/
 * Re-encoded and self-hosted. Replace /public/videos/carzenx-hero.mp4 (desktop) and
 * carzenx-hero-mobile.mp4 (≤768px) to change it; the poster is /images/hero-poster.webp.
 */
const VIDEO_DESKTOP = '/videos/carzenx-hero.mp4'
const VIDEO_MOBILE = '/videos/carzenx-hero-mobile.mp4'
const POSTER = '/images/hero-poster.webp'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const introDone = useIntroDone()

  // choose the lighter file on small screens; respect reduced motion; pause when off-screen
  useEffect(() => {
    const v = video.current
    if (!v) return
    v.src = window.matchMedia('(max-width: 768px)').matches ? VIDEO_MOBILE : VIDEO_DESKTOP
    if (prefersReducedMotion()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  // entrance — runs once the loading screen has handed over
  useLayoutEffect(() => {
    if (!root.current) return
    const q = gsap.utils.selector(root)
    if (prefersReducedMotion()) {
      gsap.set(q('[data-hero-fade]'), { opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(q('.split-inner'), { yPercent: 115 })
      gsap.set(q('[data-hero-fade]'), { opacity: 0, y: 24 })
      gsap.set(media.current, { scale: 1.12 })
      if (!introDone) return
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to(media.current, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
        .to(q('.split-inner'), { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.1)
        .to(q('[data-hero-fade]'), { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.55)
    }, root)
    return () => ctx.revert()
  }, [introDone])

  // scroll parallax: footage drifts slower than the page, copy lifts and fades
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(media.current, { yPercent: 18, ease: 'none', scrollTrigger: st })
      gsap.to(content.current, { y: -90, opacity: 0.15, ease: 'none', scrollTrigger: { ...st, end: 'bottom 20%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div ref={media} className={styles.media} aria-hidden="true">
        <video ref={video} poster={POSTER} muted loop playsInline autoPlay preload="metadata" />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <span className={styles.rail} aria-hidden="true" />

      <div ref={content} className={styles.content}>
        <span className={styles.kicker} data-hero-fade>
          <span className={styles.slash} /> Car Loan · DSA Distributor
        </span>

        <SplitText
          as="h1"
          className={styles.title}
          lines={['The smarter road', 'to your next car.']}
          accent={{ smarter: styles.accent }}
        />

        <div className={styles.row}>
          <p className={styles.sub} data-hero-fade>
            CARZENX connects car buyers and automotive dealers with suitable lending partners through its DSA
            distribution network — with clear guidance, application support and documentation help at every step.
          </p>
          <div className={styles.ctas} data-hero-fade>
            <CTAButton to="/contact">Get Started</CTAButton>
            <CTAButton to="/services" variant="ghostDark">Explore Services</CTAButton>
          </div>
        </div>
      </div>

      <div className={styles.bar} data-hero-fade>
        <span className={styles.point}><CarFront size={18} /> New &amp; used car finance assistance</span>
        <span className={styles.point}><Network size={18} /> Connections with multiple lending partners</span>
        <span className={styles.point}><FileCheck2 size={18} /> Documentation guidance, start to finish</span>
        <span className={styles.scroll}>
          <span className={styles.scrollLine} /> Scroll
        </span>
      </div>
    </section>
  )
}
