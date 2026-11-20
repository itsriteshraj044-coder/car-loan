import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Phone } from 'lucide-react'
import { nav, site } from '../data/site'
import { services } from '../data/services'
import { Logo } from './ui'

const serviceHref = (id: string) => (id === 'dealer-distributorship' ? '/dealer-network' : `/services/${id}`)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const burger = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setDd(false)
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('lock', open)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (open) burger.current?.focus()
        setOpen(false)
        setDd(false)
      }
    }
    const onResize = () => window.innerWidth > 1080 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const loansActive = pathname.startsWith('/services')

  return (
    <>
      <header className={`hdr ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap hdr-in">
          <Link to="/" className="logo" aria-label="CARZENX home">
            <Logo />
          </Link>
          <nav className="nav" aria-label="Primary">
            {nav.map((n) =>
              n.to === '/services' ? (
                <div className={`dd ${dd ? 'open' : ''}`} key={n.to} onMouseLeave={() => setDd(false)}>
                  <button
                    className={`lnk ${loansActive ? 'on' : ''}`}
                    aria-expanded={dd}
                    aria-controls="loans-menu"
                    onClick={() => setDd((v) => !v)}
                  >
                    {n.label} <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  <div className="dd-menu" id="loans-menu">
                    {services.map((s) => {
                      const Icon = s.icon
                      return (
                        <Link key={s.id} to={serviceHref(s.id)}>
                          <span className="ic">
                            <Icon size={20} aria-hidden="true" />
                          </span>
                          <span>
                            <b>{s.title}</b>
                            <small>{s.nav}</small>
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <NavLink key={n.to} to={n.to} end className={({ isActive }) => `lnk ${isActive ? 'on' : ''}`}>
                  {n.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="hdr-cta">
            <a className="hdr-call" href={site.phone.href}>
              <Phone size={17} aria-hidden="true" /> {site.phone.display}
            </a>
            <Link to="/apply" className="btn btn-blue btn-sm">
              Apply Now
            </Link>
            <button
              ref={burger}
              className="burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className={`drawer ${open ? 'open' : ''}`} id="drawer" aria-hidden={!open} inert={!open}>
        {nav.map((n) => (
          <div key={n.to}>
            <NavLink to={n.to} end className={({ isActive }) => `dl ${isActive ? 'on' : ''}`}>
              {n.label}
            </NavLink>
            {n.to === '/services' && (
              <div className="sub">
                {services.map((s) => (
                  <Link key={s.id} to={serviceHref(s.id)}>
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link className="btn btn-blue btn-lg" to="/apply">
          Apply Now
        </Link>
        <a className="btn btn-ghost btn-lg" href={site.phone.href}>
          <Phone size={17} aria-hidden="true" /> {site.phone.display}
        </a>
      </div>
    </>
  )
}
