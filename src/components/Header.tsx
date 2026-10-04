import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo'
import CTAButton from './CTAButton'
import { nav, site } from '../data/site'
import { getLenis } from '../hooks/useLenis'
import styles from './Header.module.css'

const ease = [0.22, 1, 0.36, 1] as const

export default function Header() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  const { pathname } = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (v) => setCompact(v > 40))

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const on = () => setNarrow(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // close the menu on navigation
  useEffect(() => setOpen(false), [pathname])

  // lock scrolling while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis()
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden' }
    else { lenis?.start(); document.body.style.overflow = '' }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const logoH = narrow ? (compact ? 28 : 32) : compact ? 34 : 42

  return (
    <>
      <header className={`${styles.header} ${compact || open ? styles.compact : ''}`}>
        <Logo className={styles.logo} height={logoH} />

        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              data-cursor="hover"
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && <motion.span layoutId="nav-dot" className={styles.indicator} transition={{ duration: 0.5, ease }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <CTAButton to="/contact" size="sm" className={styles.desktopCta}>Apply Now</CTAButton>
          <button
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              initial={false}
              animate={open ? { top: '50%', rotate: 45, width: '1.3rem' } : { top: '40%', rotate: 0, width: '1.3rem' }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              initial={false}
              animate={open ? { top: '50%', rotate: -45, width: '1.3rem' } : { top: '60%', rotate: 0, width: '0.85rem' }}
              transition={{ duration: 0.4, ease }}
            />
          </button>
        </div>

        <motion.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.menu}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile">
              <ul className={styles.menuList}>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.menuActive : ''}`}
                    >
                      <small>0{i + 1}</small>
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className={styles.menuFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <CTAButton to="/contact" block magnetic={false}>Get Started</CTAButton>
              <div className={styles.menuMeta}>
                <span>{site.contact.phone.value}</span>
                <span>{site.contact.email.value}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
