import { useRef, type ReactNode, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import styles from './CTAButton.module.css'

type Variant = 'primary' | 'light' | 'ghost' | 'ghostDark'

interface CTAButtonProps {
  children: ReactNode
  to?: string
  href?: string
  type?: 'button' | 'submit'
  variant?: Variant
  size?: 'md' | 'sm'
  block?: boolean
  magnetic?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const MotionLink = motion.create(Link)

/** Brand CTA: fill-wipe on hover, sliding arrow, optional magnetic pull on fine pointers. */
export default function CTAButton({
  children, to, href, type = 'button', variant = 'primary', size = 'md', block, magnetic = true, disabled, onClick, className,
}: CTAButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const fine = useRef(typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic || !fine.current) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const cls = [styles.btn, variant !== 'primary' && styles[variant], size === 'sm' && styles.sm, block && styles.block, className]
    .filter(Boolean).join(' ')

  const content = (
    <>
      <span>{children}</span>
      <span className={styles.chip} aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.2} />
        <ArrowRight size={18} strokeWidth={2.2} />
      </span>
    </>
  )
  const common = {
    className: cls,
    style: { x: sx, y: sy },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    whileTap: { scale: 0.97 },
    'data-cursor': 'hover',
  }

  if (to) return <MotionLink to={to} {...common} onClick={onClick}>{content}</MotionLink>
  if (href) return <motion.a href={href} {...common} onClick={onClick}>{content}</motion.a>
  return <motion.button type={type} disabled={disabled} {...common} onClick={onClick}>{content}</motion.button>
}
