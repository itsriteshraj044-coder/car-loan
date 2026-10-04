import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Subtle trailing ring for fine pointers; expands over links/buttons. The native cursor stays visible. */
export default function Cursor() {
  const [enabled] = useState(
    () => window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as HTMLElement | null
      setHover(!!t?.closest('a, button, [data-cursor="hover"], input, select, textarea, label'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 999,
        pointerEvents: 'none',
        borderRadius: '50%',
        border: '1.5px solid #fff',
        mixBlendMode: 'difference',
      }}
      animate={{ width: hover ? 56 : 22, height: hover ? 56 : 22, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}
