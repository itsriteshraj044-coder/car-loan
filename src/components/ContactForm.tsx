import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { ArrowLeftRight, CarFront, FileCheck2, Gauge, RefreshCw, UserPlus, type LucideIcon } from 'lucide-react'
import { Consent, Field, SearchSelect, Select, Thanks, isPhone, sendLead, useForm, type Values } from './forms'
import { carMakes, modelsFor } from '../data/carModels'

type F = ReturnType<typeof useForm>

/** Vehicle registration state codes (RTO prefixes). */
export const stateCodes: Record<string, string> = {
  'Andaman and Nicobar Islands': 'AN', 'Andhra Pradesh': 'AP', 'Arunachal Pradesh': 'AR', Assam: 'AS', Bihar: 'BR',
  Chandigarh: 'CH', Chhattisgarh: 'CG', 'Dadra and Nagar Haveli and Daman and Diu': 'DD', Delhi: 'DL', Goa: 'GA',
  Gujarat: 'GJ', Haryana: 'HR', 'Himachal Pradesh': 'HP', 'Jammu and Kashmir': 'JK', Jharkhand: 'JH', Karnataka: 'KA',
  Kerala: 'KL', Ladakh: 'LA', Lakshadweep: 'LD', 'Madhya Pradesh': 'MP', Maharashtra: 'MH', Manipur: 'MN',
  Meghalaya: 'ML', Mizoram: 'MZ', Nagaland: 'NL', Odisha: 'OD', Puducherry: 'PY', Punjab: 'PB', Rajasthan: 'RJ',
  Sikkim: 'SK', 'Tamil Nadu': 'TN', Telangana: 'TS', Tripura: 'TR', 'Uttar Pradesh': 'UP', Uttarakhand: 'UK',
  'West Bengal': 'WB',
}
const regStates = Object.keys(stateCodes).sort()

const NOW = new Date().getFullYear()
export const years = Array.from({ length: NOW - 2014 + 1 }, (_, i) => NOW - i).map((y) => (y === NOW ? `${y} (New)` : String(y)))

type Need = { v: string; icon: LucideIcon; d: string }
const needs: Need[] = [
  { v: 'New car', icon: CarFront, d: 'Loan for a new car' },
  { v: 'Old car', icon: Gauge, d: 'Loan for a used car' },
  { v: 'BT Top-up', icon: ArrowLeftRight, d: 'Move your loan + top-up' },
  { v: 'Reference', icon: UserPlus, d: 'Refer a customer to us' },
]

/** Loan pages that link to /apply?loan=<id>, mapped to the requirement they pre-select. */
const presetNeed: Record<string, Need> = {
  'new-car-loan': needs[0],
  'used-car-loan': needs[1],
  'bt-top-up': needs[2],
  'car-refinance': { v: 'Car refinance', icon: RefreshCw, d: 'Loan on a car you own' },
  'loan-rto-services': { v: 'Loan + RTO', icon: FileCheck2, d: 'Loan with RTO paperwork' },
}
/** The requirement a loan page pre-selects, if any. */
export const needFor = (loanId?: string | null) => (loanId ? presetNeed[loanId] : undefined)

/** Registration number split into boxes: state code / RTO / series / number, e.g. BR 07 CR 0001. */
const parts = [
  { k: 'r1', len: 2, ph: 'BR', mode: 'text' as const, re: /[^A-Z]/g, label: 'State code' },
  { k: 'r2', len: 2, ph: '07', mode: 'numeric' as const, re: /[^0-9]/g, label: 'RTO code' },
  { k: 'r3', len: 3, ph: 'CR', mode: 'text' as const, re: /[^A-Z]/g, label: 'Series' },
  { k: 'r4', len: 4, ph: '0001', mode: 'numeric' as const, re: /[^0-9]/g, label: 'Number' },
]

export const regNumber = (v: Values) => [v.r1, v.r2, v.r3, v.r4].filter(Boolean).join(' ')
export const regValid = (v: Values) =>
  /^[A-Z]{2}$/.test(v.r1) && /^\d{1,2}$/.test(v.r2) && /^[A-Z]{0,3}$/.test(v.r3) && /^\d{1,4}$/.test(v.r4)

/** Registration state (with RTO code) + boxed registration number. Uses form keys regState, r1–r4. */
export function RegFields({ f, optional }: { f: F; optional?: boolean }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const v = f.values
  const regErr = f.errors.r1
  const setPart = (i: number, raw: string) => {
    const p = parts[i]
    const val = raw.toUpperCase().replace(p.re, '').slice(0, p.len)
    f.setValues((s) => ({ ...s, [p.k]: val }))
    if (val.length === p.len && i < parts.length - 1) refs.current[i + 1]?.focus()
  }
  const onKey = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !v[parts[i].k] && i > 0) refs.current[i - 1]?.focus()
  }
  const pickState = (st: string) => f.setValues((x) => ({ ...x, regState: st, r1: x.r1 || stateCodes[st] || '' }))
  return (
    <>
      <div className={`fld ${f.errors.regState ? 'bad' : ''}`}>
        <label htmlFor="f-regState">Registration state</label>
        <select id="f-regState" value={v.regState} onChange={(e) => pickState(e.target.value)} aria-invalid={!!f.errors.regState}>
          <option value="">Select</option>
          {regStates.map((st) => <option key={st} value={st}>{st} ({stateCodes[st]})</option>)}
        </select>
        {f.errors.regState && <p className="err">{f.errors.regState}</p>}
      </div>
      <div className={`fld ${regErr ? 'bad' : ''}`}>
        <label htmlFor="f-r1">
          Registration number {optional && <span className="opt">(optional for a new car)</span>}
        </label>
        <div className="reg" role="group" aria-label="Registration number">
          {parts.map((p, i) => (
            <input
              key={p.k}
              id={i === 0 ? 'f-r1' : undefined}
              ref={(el) => { refs.current[i] = el }}
              value={v[p.k]}
              onChange={(e) => setPart(i, e.target.value)}
              onKeyDown={onKey(i)}
              placeholder={p.ph}
              maxLength={p.len}
              inputMode={p.mode}
              autoCapitalize="characters"
              aria-label={p.label}
              aria-invalid={!!regErr}
              style={{ flex: p.len }}
            />
          ))}
        </div>
        {regErr && <p className="err">{regErr}</p>}
      </div>
    </>
  )
}

/** Validation message for the registration number, or ''. */
export function regError(v: Values, required: boolean) {
  const anyReg = v.r1 || v.r2 || v.r3 || v.r4
  if (!anyReg) return required ? 'Enter the registration number, e.g. BR 07 CR 0001.' : ''
  return regValid(v) ? '' : 'Check the registration number, e.g. BR 07 CR 0001.'
}

/** `preset` is a loan page id (e.g. "car-refinance"); its requirement starts selected. */
export default function ContactForm({ preset }: { preset?: string | null }) {
  const pre = needFor(preset)
  // Requirements that aren't among the usual four (refinance, Loan + RTO) are added as a fifth choice.
  const choices = pre && !needs.includes(pre) ? [pre, ...needs] : needs
  const initial: Values = { need: pre?.v ?? '', name: '', phone: '', make: '', model: '', year: '', regState: '', r1: '', r2: '', r3: '', r4: '', message: '', consent: '', website: '' }
  const f = useForm(initial, (v) => {
    const isNew = v.need === 'New car' || v.year.includes('New')
    return {
      need: !v.need ? 'Choose what you need.' : '',
      name: v.name.trim().length < 2 ? 'Please enter your full name.' : '',
      phone: !isPhone(v.phone) ? 'Enter a valid 10-digit Indian mobile number.' : '',
      make: v.need !== 'Reference' && !v.make.trim() ? 'Choose the car make.' : '',
      model: v.need !== 'Reference' && v.model.trim().length < 1 ? 'Choose the car model.' : '',
      year: v.need !== 'Reference' && !v.year ? 'Choose the year.' : '',
      regState: v.need !== 'Reference' && !v.regState ? 'Choose the registration state.' : '',
      r1: v.need === 'Reference' ? '' : regError(v, !isNew),
      message: v.need === 'Reference' && !v.message.trim() ? 'Tell us who you are referring.' : '',
      consent: !v.consent ? 'Please accept to continue.' : '',
    }
  })
  const [sent, setSent] = useState(false)
  const v = f.values
  const isNew = v.need === 'New car' || v.year.includes('New')
  const isRef = v.need === 'Reference'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (v.website) return
    if (!f.check()) return
    sendLead(`Enquiry: ${v.need} - ${v.name}`, [
      ['Requirement', v.need],
      ['Full name', v.name],
      ['Phone', v.phone],
      ['Make', v.make],
      ['Model', v.model],
      ['Year', v.year],
      ['Registration state', v.regState],
      ['Registration number', regNumber(v)],
      ['Message', v.message],
    ])
    setSent(true)
  }

  if (sent)
    return (
      <div className="fm">
        <Thanks title={`Thank you, ${v.name.split(' ')[0]}.`} onReset={() => { f.setValues(initial); setSent(false) }}>
          <p>Our team will call you on {v.phone} about your {v.need.toLowerCase()} enquiry.</p>
        </Thanks>
      </div>
    )

  return (
    <form className="fm" onSubmit={submit} noValidate>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="fld" style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, padding: 0 }}>What do you need?</legend>
        <div className={`choice ${choices.length > 4 ? 'five' : 'four'}`}>
          {choices.map((n, i) => {
            const Icon = n.icon
            return (
              <label key={n.v}>
                {/* Coming from a loan page locks the requirement to that loan */}
                <input type="radio" name="need" id={i === 0 ? 'f-need' : undefined} value={n.v} checked={v.need === n.v} onChange={f.set('need')} disabled={!!pre && n !== pre} />
                <Icon size={22} aria-hidden="true" />
                <b>{n.v}</b>
                <small>{n.d}</small>
              </label>
            )
          })}
        </div>
        {f.errors.need && <p className="err" style={{ marginTop: 10 }}>{f.errors.need}</p>}
      </fieldset>

      <div className="fm-grid">
        <Field f={f} k="name" label="Full name" autoComplete="name" />
        <Field f={f} k="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" />

        {!isRef && (
          <>
            <SearchSelect f={f} k="make" label="Make" options={carMakes} placeholder="Select or type to search" onPick={() => f.setField('model', '')} />
            <SearchSelect key={`model-${v.make}`} f={f} k="model" label="Model" options={modelsFor(v.make)} placeholder={v.make ? 'Select or type to search' : 'Select a make first'} disabled={!v.make} />
            <Select f={f} k="year" label="Year" options={years} />
            <RegFields f={f} optional={isNew} />
          </>
        )}

        <Field
          f={f}
          k="message"
          label={isRef ? 'Who are you referring?' : 'Message'}
          type="textarea"
          full
          optional={!isRef}
          placeholder={isRef ? 'Name, phone number and what they need' : undefined}
        />
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={f.set('website')} />
        </div>
        <Consent f={f} />
        <div className="fm-actions">
          <span className="t-small">We never ask for card numbers, PINs or OTPs.</span>
          <button className="btn btn-blue btn-lg" type="submit">Send enquiry <span className="arr">→</span></button>
        </div>
      </div>
    </form>
  )
}
