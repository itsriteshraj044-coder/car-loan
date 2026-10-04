import { useLayoutEffect, type RefObject } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * Declarative scroll animations for everything inside `scope`:
 *
 *   data-reveal               fade + rise when entering the viewport
 *   data-reveal="stagger"     same, applied to direct children in sequence
 *   data-reveal="line"        horizontal rule that draws from the left
 *   data-parallax="0.15"      vertical drift while the element crosses the viewport
 *   data-words                each word brightens as the paragraph is scrolled (scrubbed)
 */
export function useScrollAnimation(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const reduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const kind = el.dataset.reveal
        if (reduced) {
          gsap.set(el, { opacity: 1 })
          return
        }
        const trigger = { trigger: el, start: 'top 86%', once: true }

        if (kind === 'stagger') {
          gsap.set(el, { opacity: 1 })
          gsap.from(el.children, { y: 48, opacity: 0, duration: 1, stagger: 0.09, scrollTrigger: trigger })
        } else if (kind === 'line') {
          gsap.fromTo(el, { opacity: 1, scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.4, ease: 'power4.inOut', scrollTrigger: trigger })
        } else {
          gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, scrollTrigger: trigger })
        }
      })

      if (reduced) return

      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.15')
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          { yPercent: speed * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })

      root.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
        const words = el.querySelectorAll('.w')
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true } },
        )
      })
    }, root)

    // images/fonts can shift layout after mount
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
