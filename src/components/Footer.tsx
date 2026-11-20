import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { disclosure, site } from '../data/site'
import { services } from '../data/services'
import { Logo } from './ui'

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Link to="/" className="logo-pill" aria-label="CARZENX home">
              <Logo height={38} />
            </Link>
            <p>Connecting car buyers, dealers and lenders across India with dependable car loan distribution since {site.since}.</p>
          </div>
          <div>
            <p className="fh">Company</p>
            <ul>
              <li><Link className="fl" to="/about">About us</Link></li>
              <li><Link className="fl" to="/dealer-network">Dealer network</Link></li>
              <li><Link className="fl" to="/apply">Apply now</Link></li>
              <li><Link className="fl" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="fh">Loans</p>
            <ul>
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link className="fl" to={`/services/${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="fh">Tools</p>
            <ul>
              <li><Link className="fl" to="/services#emi">EMI calculator</Link></li>
              <li><Link className="fl" to="/services">All loan products</Link></li>
              <li><Link className="fl" to="/dealer-network#partner-form">Become a partner</Link></li>
              <li><Link className="fl" to="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="fh">Contact</p>
            <ul>
              <li className="ci"><Phone size={16} aria-hidden="true" /><a href={site.phone.href}>{site.phone.display}</a></li>
              <li className="ci"><Mail size={16} aria-hidden="true" /><a href={site.email.href}>{site.email.display}</a></li>
              <li className="ci"><Mail size={16} aria-hidden="true" /><a href={site.info.href}>{site.info.display}</a></li>
              <li className="ci"><MapPin size={16} aria-hidden="true" /><span>{site.office}</span></li>
              <li className="ci"><Clock size={16} aria-hidden="true" /><span>{site.hours}</span></li>
            </ul>
          </div>
        </div>
        <p className="ftr-disc">{disclosure}</p>
        <div className="ftr-bar">
          <span>© {new Date().getFullYear()} CARZENX. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
