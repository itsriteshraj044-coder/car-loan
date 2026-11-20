import { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { site } from './data/site'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import DealerNetwork from './pages/DealerNetwork'
import Apply from './pages/Apply'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView())
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/dealer-distributorship" element={<Navigate to="/dealer-network" replace />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/dealer-network" element={<DealerNetwork />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply-now" element={<Navigate to="/apply" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
          <Route path="/terms-and-conditions" element={<Legal doc="terms" />} />
          <Route path="/disclaimer" element={<Legal doc="disclaimer" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div className="mcta" role="region" aria-label="Quick actions">
        <Link className="p" to="/apply">Apply now</Link>
        <a href={site.phone.href}><Phone size={16} aria-hidden="true" /> Call</a>
      </div>
    </>
  )
}
