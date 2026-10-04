import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo'
import CTAButton from './CTAButton'
import { nav, site, disclosure } from '../data/site'
import { services } from '../data/services'
import { getLenis } from '../hooks/useLenis'
import styles from './Footer.module.css'

export default function Footer() {
  const toTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const contact = Object.values(site.contact)

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo height={52} />
          <p>
            CARZENX is a car loan DSA distributor. We help car buyers and automotive dealers connect with suitable
            lending partners, and support every application with clear guidance and documentation help.
          </p>
          <div><CTAButton to="/contact" size="sm">Get Started</CTAButton></div>
        </div>

        <div className={styles.cols}>
          <div>
            <h3 className={styles.colTitle}>Navigate</h3>
            <ul className={styles.list}>
              {nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.list}>
              {services.map((s) => <li key={s.id}><Link to={`/services#${s.id}`}>{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.list}>
              {contact.map((c) => (
                <li key={c.label} className={styles.contactItem}>
                  <small>{c.label}</small>
                  {c.href ? <a href={c.href}>{c.value}</a> : <span className={c.placeholder ? styles.placeholder : ''}>{c.value}</span>}
                </li>
              ))}
              {site.social.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.statement}>
        <h2>Finance, <span>clearly</span><br />driven<em>.</em></h2>
        <button className={styles.toTop} onClick={toTop}>Back to top <ArrowUp size={16} /></button>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} CARZENX. All rights reserved.</span>
        <p className={styles.disclosure}>{disclosure}</p>
        <span>{site.tagline}</span>
      </div>
    </footer>
  )
}
