import { useLayoutEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ChevronDown, Check } from 'lucide-react'
import Seo from '../components/Seo'
import SplitText from '../components/SplitText'
import SectionTitle from '../components/SectionTitle'
import CTAButton from '../components/CTAButton'
import Img from '../components/Img'
import { site } from '../data/site'
import { services } from '../data/services'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIntroDone } from '../context/IntroContext'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import styles from './Contact.module.css'

const requirements = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'other', label: 'Something else' },
]

type Values = { name: string; phone: string; email: string; city: string; requirement: string; message: string; consent: boolean }
type Errors = Partial<Record<keyof Values, string>>

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (v.city.trim().length < 2) e.city = 'Please enter your city.'
  if (!v.requirement) e.requirement = 'Select what you need help with.'
  if (!v.consent) e.consent = 'Please confirm you agree to be contacted.'
  return e
}

const icons = { phone: Phone, email: Mail, office: MapPin, hours: Clock }

export default function Contact() {
  const root = useRef<HTMLDivElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const introDone = useIntroDone()
  const [params] = useSearchParams()
  useScrollAnimation(root)

  const preset = useMemo(() => {
    const s = params.get('service')
    return requirements.some((r) => r.value === s) ? (s as string) : ''
  }, [params])

  const [values, setValues] = useState<Values>({ name: '', phone: '', email: '', city: '', requirement: preset, message: '', consent: false })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = k === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value
    setValues((v) => ({ ...v, [k]: val }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    // TODO: connect to a real endpoint (CRM, email service or API). Submission is simulated for now.
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  // entrance for the split hero
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !visual.current || !introDone) return
    const q = gsap.utils.selector(visual)
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.35, defaults: { ease: 'power4.out' } })
        .fromTo(q('[data-media]'), { scale: 1.15 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
        .fromTo(q('.split-inner'), { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.06 }, 0.05)
        .fromTo(q('[data-fade]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.45)
    }, visual)
    return () => ctx.revert()
  }, [introDone])

  const field = (k: keyof Values, label: string, opts: { type?: string; autoComplete?: string; full?: boolean; required?: boolean; inputMode?: 'tel' | 'email' | 'text' } = {}) => (
    <div className={`${styles.field} ${opts.full ? styles.full : ''} ${errors[k] ? styles.invalid : ''}`}>
      <input
        id={`f-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        placeholder=" "
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        value={values[k] as string}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        required={opts.required !== false}
      />
      <label htmlFor={`f-${k}`}>{label}{opts.required !== false && <b> *</b>}</label>
      <span className={styles.bar} />
      {errors[k] && <span id={`e-${k}`} className={styles.error}>{errors[k]}</span>}
    </div>
  )

  const contactItems = (Object.keys(site.contact) as (keyof typeof site.contact)[]).map((key) => ({ key, ...site.contact[key] }))

  return (
    <div ref={root}>
      <Seo
        title="Contact CARZENX | Car Loan Enquiry"
        description="Send an enquiry to CARZENX for new or used car loan assistance, documentation guidance or dealer finance partnership. Our team will get back to you."
        path="/contact"
      />

      <section className={styles.split} aria-label="Contact CARZENX">
        <div ref={visual} className={styles.visual}>
          <div className={styles.visualMedia} data-media aria-hidden="true">
            <Img name="interior-dark" alt="" eager sizes="(max-width: 1024px) 100vw, 48vw" />
          </div>
          <div>
            <nav className={styles.crumbs} aria-label="Breadcrumb" data-fade>
              <Link to="/">Home</Link>
              <span className={styles.sep} aria-hidden="true" />
              <span aria-current="page">Contact</span>
            </nav>
            <SplitText as="h1" className={styles.title} lines={["Let’s talk", 'about your', 'next car.']} accent={{ next: 'text-red' }} />
            <p className={styles.intro} data-fade>
              Share a few details and our team will reach out to understand your requirement and explain your options with
              our lending partners.
            </p>
          </div>

          <ul className={styles.details} data-fade>
            {contactItems.map((c) => {
              const Icon = icons[c.key]
              return (
                <li key={c.key} className={styles.detail}>
                  <span className={styles.detailIcon}><Icon size={18} aria-hidden="true" /></span>
                  <div>
                    <small>{c.label}</small>
                    {c.href ? <a href={c.href}>{c.value}</a> : <span className={c.placeholder ? styles.ph : ''}>{c.value}</span>}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.formSide}>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="done"
                className={styles.success}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                role="status"
              >
                <span className={styles.successIcon}><Check size={26} aria-hidden="true" /></span>
                <h3>Thank you, {values.name.split(' ')[0]}.</h3>
                <p>
                  Your enquiry has been received. A member of the CARZENX team will contact you on {values.phone} to discuss your
                  requirement.
                </p>
                <CTAButton to="/services" variant="ghost">Explore services</CTAButton>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
                <div className={styles.formHead}>
                  <span className="eyebrow">Enquiry form</span>
                  <h2>Tell us what you need.</h2>
                  <p>Fields marked <span className="text-red">*</span> are required.</p>
                </div>
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  {field('name', 'Full name', { autoComplete: 'name' })}
                  {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                  {field('email', 'Email address', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                  {field('city', 'City', { autoComplete: 'address-level2' })}

                  <div className={`${styles.field} ${styles.full} ${values.requirement ? styles.filled : ''} ${errors.requirement ? styles.invalid : ''}`}>
                    <select
                      id="f-requirement"
                      name="requirement"
                      value={values.requirement}
                      onChange={set('requirement')}
                      aria-invalid={!!errors.requirement}
                      aria-describedby={errors.requirement ? 'e-requirement' : undefined}
                      required
                    >
                      <option value="" disabled hidden />
                      {requirements.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <label htmlFor="f-requirement">Vehicle / loan requirement<b> *</b></label>
                    <ChevronDown className={styles.chev} size={18} aria-hidden="true" />
                    <span className={styles.bar} />
                    {errors.requirement && <span id="e-requirement" className={styles.error}>{errors.requirement}</span>}
                  </div>

                  <div className={`${styles.field} ${styles.full}`}>
                    <textarea id="f-message" name="message" placeholder=" " rows={4} value={values.message} onChange={set('message')} />
                    <label htmlFor="f-message">Message — car model, budget, timeline (optional)</label>
                    <span className={styles.bar} />
                  </div>

                  <div className={styles.full}>
                    <label className={styles.consent}>
                      <input
                        id="f-consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={set('consent')}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'e-consent' : undefined}
                      />
                      <span>
                        I agree to be contacted by CARZENX about my enquiry, and understand that my details will be shared with
                        lending partners only with my consent.
                      </span>
                    </label>
                    {errors.consent && <span id="e-consent" className={styles.error}>{errors.consent}</span>}
                  </div>

                  <div className={`${styles.full} ${styles.submitRow}`}>
                    <CTAButton type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
                    </CTAButton>
                    <p className={styles.small}>CARZENX is a DSA. Loan approval and terms are decided by the lending partner.</p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="next-title">
        <SectionTitle
          eyebrow="What happens next"
          title={<span id="next-title">After you get in touch.</span>}
          lead="No obligation, no pressure — just a clear conversation about your requirement."
          layout="split"
        />
        <div className={styles.next} data-reveal="stagger">
          <article className={styles.nextCard}>
            <span>01</span>
            <h3>We call you back</h3>
            <p>Our team reaches out to understand the car you have in mind, your budget and your timeline.</p>
          </article>
          <article className={styles.nextCard}>
            <span>02</span>
            <h3>You get a checklist</h3>
            <p>We share the documents lenders typically request for your profile and vehicle.</p>
          </article>
          <article className={styles.nextCard}>
            <span>03</span>
            <h3>We connect you with lenders</h3>
            <p>Your complete application goes to suitable lending partners, and we keep you updated.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
