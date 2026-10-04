import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

const ease = [0.76, 0, 0.24, 1] as const

const curtain: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 150,
  pointerEvents: 'none',
  background: 'var(--dark)',
}
const stripe: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 4,
  background: 'linear-gradient(90deg, var(--blue) 0 80%, var(--red) 80% 100%)',
}

/**
 * Route transition: a dark curtain with a blue/red edge sweeps up over the old
 * page, then lifts away from the new one while its content rises in.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.main
        id="main"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0.6, y: -30, transition: { duration: 0.5, ease } }}
      >
        {children}
      </motion.main>

      {/* exit cover: grows from the bottom */}
      <motion.div
        aria-hidden="true"
        style={{ ...curtain, transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease } }}
      >
        <span style={{ ...stripe, top: 0 }} />
      </motion.div>

      {/* enter reveal: shrinks toward the top */}
      <motion.div
        aria-hidden="true"
        style={{ ...curtain, transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease } }}
        exit={{ scaleY: 0 }}
      >
        <span style={{ ...stripe, bottom: 0 }} />
      </motion.div>
    </>
  )
}
