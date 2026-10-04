import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let instance: Lenis | null = null

/** Access the shared Lenis instance (null when reduced motion is on). */
export const getLenis = () => instance

/** Scroll to top instantly — used between page transitions. */
export function resetScroll() {
  if (instance) instance.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

/** Boot Lenis once and drive it from GSAP's ticker so ScrollTrigger stays in sync. */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    instance = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
