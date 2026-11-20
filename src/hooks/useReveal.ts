import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Adds `.in` to `.rv` and `.tl` elements as they scroll into view. Re-scans on route change. */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in), .tl:not(.in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in')
            io.unobserve(x.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((e) => io.observe(e))
    // Content that changes after mount (tabs, form steps) is picked up here.
    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>('.rv:not(.in), .tl:not(.in)').forEach((e) => io.observe(e))
    })
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}
