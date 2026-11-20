import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { mailto, site } from '../data/site'

export const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
]

export type Values = Record<string, string>
export type Errors = Record<string, string>

export const isPhone = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''))
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

/**
 * Sends the enquiry by opening the visitor's email app with a prefilled message to CARZENX.
 * The site is static hosting, so there is no server to post to. To capture leads on a server,
 * replace this function with a fetch() to your endpoint.
 */
export function sendLead(subject: string, rows: [string, string][]) {
  const body = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = mailto(subject, `${body}\n\nSent from the CARZENX website.`)
}

export function useForm(initial: Values, validate: (v: Values) => Errors) {
  const [values, setValues] = useState<Values>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const set = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target as HTMLInputElement
    const v = t.type === 'checkbox' ? (t.checked ? 'yes' : '') : t.value
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: '' }))
  }
  const check = (keys?: string[]) => {
    const all = validate(values)
    const found: Errors = {}
    Object.entries(all).forEach(([k, v]) => {
      if (v && (!keys || keys.includes(k))) found[k] = v
    })
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) document.getElementById(`f-${first}`)?.focus()
    return !first
  }
  return { values, setValues, errors, set, check }
}

type F = ReturnType<typeof useForm>

export function Field({
  f,
  k,
  label,
  type = 'text',
  full,
  optional,
  autoComplete,
  inputMode,
  placeholder,
}: {
  f: F
  k: string
  label: string
  type?: string
  full?: boolean
  optional?: boolean
  autoComplete?: string
  inputMode?: 'tel' | 'email' | 'text' | 'numeric'
  placeholder?: string
}) {
  const err = f.errors[k]
  return (
    <div className={`fld ${full ? 'full' : ''} ${err ? 'bad' : ''}`}>
      <label htmlFor={`f-${k}`}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {type === 'textarea' ? (
        <textarea id={`f-${k}`} name={k} value={f.values[k] ?? ''} onChange={f.set(k)} aria-invalid={!!err} aria-describedby={err ? `e-${k}` : undefined} placeholder={placeholder} />
      ) : (
        <input
          id={`f-${k}`}
          name={k}
          type={type}
          value={f.values[k] ?? ''}
          onChange={f.set(k)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          aria-invalid={!!err}
          aria-describedby={err ? `e-${k}` : undefined}
        />
      )}
      {err && <p className="err" id={`e-${k}`}>{err}</p>}
    </div>
  )
}

export function Select({ f, k, label, options, full, optional }: { f: F; k: string; label: string; options: string[]; full?: boolean; optional?: boolean }) {
  const err = f.errors[k]
  return (
    <div className={`fld ${full ? 'full' : ''} ${err ? 'bad' : ''}`}>
      <label htmlFor={`f-${k}`}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      <select id={`f-${k}`} name={k} value={f.values[k] ?? ''} onChange={f.set(k)} aria-invalid={!!err} aria-describedby={err ? `e-${k}` : undefined}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {err && <p className="err" id={`e-${k}`}>{err}</p>}
    </div>
  )
}

export function Consent({ f }: { f: F }) {
  const err = f.errors.consent
  return (
    <div className={`ck ${err ? 'bad' : ''}`}>
      <input id="f-consent" type="checkbox" checked={f.values.consent === 'yes'} onChange={f.set('consent')} aria-invalid={!!err} aria-describedby={err ? 'e-consent' : undefined} />
      <label htmlFor="f-consent">
        I agree to be contacted by CARZENX about this enquiry by phone, SMS, WhatsApp or email, and I accept the{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
        {err && <span className="err" id="e-consent" style={{ display: 'block', marginTop: 4 }}>{err}</span>}
      </label>
    </div>
  )
}

export function Thanks({ title, children, onReset }: { title: string; children?: ReactNode; onReset: () => void }) {
  const h = useRef<HTMLHeadingElement>(null)
  return (
    <div className="thanks" role="status">
      <div className="ok">
        <Check size={38} strokeWidth={2.4} aria-hidden="true" />
      </div>
      <h2 ref={(el) => { h.current = el; el?.focus() }} tabIndex={-1}>{title}</h2>
      {children}
      <p>
        Your email app should have opened with your details filled in. Press send there to reach us. If it did not open, call{' '}
        <a href={site.phone.href} style={{ color: 'var(--blue)', fontWeight: 700 }}>{site.phone.display}</a> or write to{' '}
        <a href={site.email.href} style={{ color: 'var(--blue)', fontWeight: 700 }}>{site.email.display}</a>.
      </p>
      <div className="row">
        <Link to="/" className="btn btn-dark">Back to home</Link>
        <button type="button" className="btn btn-line" onClick={onReset}>Send another enquiry</button>
      </div>
    </div>
  )
}

/* ---------- Single-page enquiry form (Contact + Dealer pages) ---------- */
const financeTopics = ['New Car Loan', 'Used Car Loan', 'Car Refinance', 'BT Top-up', 'Loan + RTO Services', 'Something else']
const partnerTypes = ['New car dealer', 'Used car dealer', 'Finance consultant / DSA', 'Other automobile business']

export function EnquiryForm({ variant }: { variant: 'finance' | 'partner' }) {
  const partner = variant === 'partner'
  const initial: Values = partner
    ? { name: '', business: '', type: '', phone: '', email: '', city: '', state: '', message: '', consent: '', website: '' }
    : { name: '', phone: '', email: '', topic: '', city: '', message: '', consent: '', website: '' }
  const f = useForm(initial, (v) => ({
    name: v.name.trim().length < 2 ? 'Please enter your name.' : '',
    phone: !isPhone(v.phone) ? 'Enter a valid 10-digit Indian mobile number.' : '',
    email: v.email && !isEmail(v.email) ? 'Enter a valid email address.' : '',
    topic: !partner && !v.topic ? 'Choose what you need help with.' : '',
    business: partner && v.business.trim().length < 2 ? 'Please enter your business name.' : '',
    type: partner && !v.type ? 'Choose your business type.' : '',
    city: partner && !v.city.trim() ? 'Please enter your city.' : '',
    consent: !v.consent ? 'Please accept to continue.' : '',
  }))
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (f.values.website) return // honeypot
    if (!f.check()) return
    const v = f.values
    if (partner) {
      sendLead(`Partner enquiry: ${v.business}`, [
        ['Name', v.name], ['Business', v.business], ['Business type', v.type], ['Mobile', v.phone], ['Email', v.email],
        ['City', v.city], ['State', v.state], ['Message', v.message],
      ])
    } else {
      sendLead(`Car finance enquiry: ${v.topic}`, [
        ['Name', v.name], ['Mobile', v.phone], ['Email', v.email], ['Requirement', v.topic], ['City', v.city], ['Message', v.message],
      ])
    }
    setSent(true)
  }

  if (sent)
    return (
      <div className="fm">
        <Thanks title="Thank you, almost done." onReset={() => { f.setValues(initial); setSent(false) }} />
      </div>
    )

  return (
    <form className="fm" onSubmit={submit} noValidate>
      <div className="fm-grid">
        <Field f={f} k="name" label="Full name" autoComplete="name" />
        {partner ? (
          <>
            <Field f={f} k="business" label="Business name" autoComplete="organization" />
            <Select f={f} k="type" label="Business type" options={partnerTypes} />
          </>
        ) : (
          <Select f={f} k="topic" label="I need help with" options={financeTopics} />
        )}
        <Field f={f} k="phone" label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" />
        <Field f={f} k="email" label="Email" type="email" autoComplete="email" inputMode="email" optional />
        <Field f={f} k="city" label="City" autoComplete="address-level2" optional={!partner} />
        {partner && <Select f={f} k="state" label="State / UT" options={states} optional />}
        <Field f={f} k="message" label={partner ? 'Tell us about your business' : 'Message'} type="textarea" full optional />
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" tabIndex={-1} autoComplete="off" value={f.values.website} onChange={f.set('website')} />
        </div>
        <Consent f={f} />
        <div className="fm-actions">
          <span className="t-small">We never ask for card numbers, PINs or OTPs.</span>
          <button className="btn btn-blue btn-lg" type="submit">
            {partner ? 'Send partner enquiry' : 'Send enquiry'} <span className="arr">→</span>
          </button>
        </div>
      </div>
    </form>
  )
}
