import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import ContactForm from '../components/ContactForm'
import { PageHero, Seo } from '../components/ui'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact CARZENX | Car Loan Enquiries"
        description={`Call ${site.phone.display} or email ${site.email.display} to discuss a new car loan, used car loan, refinance, BT top-up or dealer partnership with CARZENX.`}
        path="/contact"
      />
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        title="Talk to the CARZENX team."
        sub="Questions about a loan, a document or a partnership? Call, email or send an enquiry and we will get back to you."
      />
      <section className="sec sec-grey">
        <div className="wrap contact-grid">
          <div className="cinfo">
            <a className="ccard rv" href={site.phone.href}>
              <span className="ic"><Phone size={22} aria-hidden="true" /></span>
              <span><small>Call us</small><b>{site.phone.display}</b><span>{site.hours}</span></span>
            </a>
            <a className="ccard rv" href={site.email.href}>
              <span className="ic"><Mail size={22} aria-hidden="true" /></span>
              <span><small>Support</small><b>{site.email.display}</b><span>Loan and application queries</span></span>
            </a>
            <a className="ccard rv" href={site.info.href}>
              <span className="ic"><Mail size={22} aria-hidden="true" /></span>
              <span><small>General</small><b>{site.info.display}</b><span>Partnerships and other enquiries</span></span>
            </a>
            <div className="ccard rv">
              <span className="ic"><MapPin size={22} aria-hidden="true" /></span>
              <span><small>Head branch</small><b>Mumbai, Maharashtra</b><span>Serving customers pan-India</span></span>
            </div>
            <div className="ccard rv">
              <span className="ic"><Clock size={22} aria-hidden="true" /></span>
              <span><small>Business hours</small><b>{site.hours}</b></span>
            </div>
            <p className="warn rv"><b>Stay safe:</b> CARZENX will never ask for your card number, PIN, password or OTP.</p>
          </div>
          <div className="rv">
            <h2 className="t-h2" style={{ marginBottom: 20 }}>Send an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
