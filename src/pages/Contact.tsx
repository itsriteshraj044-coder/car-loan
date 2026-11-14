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
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIntroDone } from '../context/IntroContext'
import { gsap, prefersReducedMotion } from '../hooks/gsap'
import styles from './Contact.module.css'

/** The four loan types offered in the enquiry form. Values match service ids so /contact?service=… pre-selects. */
const loanTypes = [
  { value: 'new-car-loan', label: 'New car loan' },
  { value: 'used-car-loan', label: 'Used car loan' },
  { value: 'bt-top-up', label: 'BT top-up (balance transfer)' },
  { value: 'car-refinance', label: 'Car refinance' },
]

const CURRENT_YEAR = 2026
const OLDEST_YEAR = 2014
const years = Array.from({ length: CURRENT_YEAR - OLDEST_YEAR + 1 }, (_, i) => {
  const y = String(CURRENT_YEAR - i)
  return { value: y, label: i === 0 ? `${y} (New)` : y }
})

const states = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
].map((s) => ({ value: s, label: s }))

type Values = {
  name: string
  phone: string
  makeModel: string
  year: string
  regState: string
  regNumber: string
  loanType: string
  message: string
  consent: boolean
}
type Errors = Partial<Record<keyof Values, string>>

/** A new car has no registration number yet, so it is only required for the other loan types. */
const needsRegNumber = (v: Values) => v.loanType !== 'new-car-loan'

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (v.makeModel.trim().length < 2) e.makeModel = 'Enter the car make and model, e.g. Maruti Swift.'
  if (!v.year) e.year = 'Select the car’s year.'
  if (!v.regState) e.regState = 'Select the registration state.'
  const reg = v.regNumber.replace(/[\s-]/g, '')
  if ((needsRegNumber(v) || reg) && !/^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{1,4}$/.test(reg)) {
    e.regNumber = 'Enter a valid registration number, e.g. BR07CR1234.'
  }
  if (!v.loanType) e.loanType = 'Select the type of loan you need.'
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
    return loanTypes.some((r) => r.value === s) ? (s as string) : ''
  }, [params])

  const [values, setValues] = useState<Values>({
    name: '', phone: '', makeModel: '', year: '', regState: '', regNumber: '', loanType: preset, message: '', consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val =
      k === 'consent' ? (e.target as HTMLInputElement).checked : k === 'regNumber' ? e.target.value.toUpperCase() : e.target.value
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

  const select = (k: keyof Values, label: string, options: { value: string; label: string }[], full = false) => (
    <div className={`${styles.field} ${full ? styles.full : ''} ${values[k] ? styles.filled : ''} ${errors[k] ? styles.invalid : ''}`}>
      <select
        id={`f-${k}`}
        name={k}
        value={values[k] as string}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        required
      >
        <option value="" disabled hidden />
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <label htmlFor={`f-${k}`}>{label}<b> *</b></label>
      <ChevronDown className={styles.chev} size={18} aria-hidden="true" />
      <span className={styles.bar} />
      {errors[k] && <span id={`e-${k}`} className={styles.error}>{errors[k]}</span>}
    </div>
  )

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
        description="Send an enquiry to CARZENX for a new car loan, used car loan, BT top-up or car refinance. Head branch Mumbai, working pan-India."
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
                  {field('makeModel', 'Car make / model')}
                  {select('year', 'Year', years)}
                  {select('regState', 'Registration state', states)}
                  {field('regNumber', needsRegNumber(values) ? 'Registration no. (e.g. BR07CR1234)' : 'Registration no. (if allotted)', {
                    required: needsRegNumber(values),
                  })}
                  {select('loanType', 'Loan type', loanTypes, true)}

                  <div className={`${styles.field} ${styles.full}`}>
                    <textarea id="f-message" name="message" placeholder=" " rows={4} value={values.message} onChange={set('message')} />
                    <label htmlFor="f-message">Message — loan amount, timeline (optional)</label>
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
