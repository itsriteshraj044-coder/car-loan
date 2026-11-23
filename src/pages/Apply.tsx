import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Clock, Lock, Network, ShieldCheck, UserPlus } from 'lucide-react'
import { loanServices, findService } from '../data/services'
import { site } from '../data/site'
import { Consent, Field, SearchSelect, Select, Thanks, isEmail, isPhone, sendLead, states, useForm, type Values } from '../components/forms'
import { PageHero, Seo } from '../components/ui'
import { RegFields, regError, regNumber, years } from '../components/ContactForm'
import { carModels } from '../data/carModels'

const employment = ['Salaried', 'Self-employed professional', 'Self-employed business owner', 'Other']
const stepNames = ['Requirement', 'Car & loan', 'Your details']

const fieldsByStep: Record<number, string[]> = {
  0: ['loan'],
  1: ['car', 'year', 'regState', 'r1', 'amount', 'lender', 'employment', 'message'],
  2: ['name', 'phone', 'email', 'city', 'state', 'consent'],
}

export default function Apply() {
  const [params] = useSearchParams()
  const pre = findService(params.get('loan') ?? '')
  const initial: Values = {
    loan: pre && pre.id !== 'dealer-distributorship' ? pre.id : '',
    car: '', year: '', regState: '', r1: '', r2: '', r3: '', r4: '', amount: '', lender: '', employment: '', income: '', message: '',
    name: '', phone: '', email: '', city: '', state: '', consent: '', website: '',
  }
  const f = useForm(initial, (v) => {
    const ref = v.loan === 'reference'
    const isNew = v.loan === 'new-car-loan' || v.year.includes('New')
    return {
      loan: !v.loan ? 'Choose what you need.' : '',
      car: !ref && v.loan !== 'loan-rto-services' && v.car.trim().length < 2 ? 'Search and choose your car make / model.' : '',
      year: !ref && !v.year ? 'Choose the year.' : '',
      regState: !ref && !v.regState ? 'Choose the registration state.' : '',
      r1: ref ? '' : regError(v, !isNew),
      message: ref && !v.message.trim() ? 'Tell us who you are referring.' : '',
      amount: v.amount && !/^\d[\d,]*$/.test(v.amount.trim()) ? 'Enter an amount in rupees, numbers only.' : '',
      lender: v.loan === 'bt-top-up' && !v.lender.trim() ? 'Enter your current lender.' : '',
      employment: !ref && v.loan !== 'loan-rto-services' && !v.employment ? 'Choose your employment type.' : '',
      name: v.name.trim().length < 2 ? 'Please enter your full name.' : '',
      phone: !isPhone(v.phone) ? 'Enter a valid 10-digit Indian mobile number.' : '',
      email: v.email && !isEmail(v.email) ? 'Enter a valid email address.' : '',
      city: !v.city.trim() ? 'Please enter your city.' : '',
      state: !v.state ? 'Choose your state.' : '',
      consent: !v.consent ? 'Please accept to continue.' : '',
    }
  })
  const [step, setStep] = useState(initial.loan ? 1 : 0)
  const [sent, setSent] = useState(false)
  const v = f.values
  const svc = findService(v.loan)
  const isRef = v.loan === 'reference'
  const title = isRef ? 'Reference' : svc?.title ?? v.loan

  const next = () => {
    if (!f.check(fieldsByStep[step])) return
    setStep((s) => s + 1)
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (step < 2) return next()
    if (v.website) return
    if (!f.check(fieldsByStep[2])) return
    sendLead(`${isRef ? 'Reference' : 'Loan enquiry'}: ${title} - ${v.name}`, [
      ['Requirement', title],
      ['Referring', v.message],
      ['Make / model', v.car],
      ['Year', v.year],
      ['Registration state', v.regState],
      ['Registration number', regNumber(v)],
      ['Car price / loan amount (₹)', v.amount],
      ['Current lender', v.lender],
      ['Employment', v.employment],
      ['Monthly income (₹)', v.income],
      ['Name', v.name],
      ['Mobile', v.phone],
      ['Email', v.email],
      ['City', v.city],
      ['State', v.state],
    ])
    setSent(true)
  }

  return (
    <>
      <Seo
        title="Apply for a Car Loan | CARZENX"
        description="Apply for a new car loan, used car loan, refinance, BT top-up or Loan + RTO services with CARZENX. Takes about two minutes."
        path="/apply"
      />
      <PageHero
        crumbs={[{ label: 'Apply' }]}
        title="Check your car loan options."
        sub="Three short steps, about two minutes. Our team will call you to explain suitable lenders and the documents you need."
      >
        <div className="tags" style={{ marginTop: 26 }}>
          <span className="tag" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}><Clock size={12} style={{ display: 'inline', marginRight: 6 }} />2 minutes</span>
          <span className="tag" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}><Lock size={12} style={{ display: 'inline', marginRight: 6 }} />No documents now</span>
          <span className="tag" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}><ShieldCheck size={12} style={{ display: 'inline', marginRight: 6 }} />No credit check to enquire</span>
        </div>
      </PageHero>

      <section className="sec sec-grey" id="apply-form">
        <div className="wrap">
          {sent ? (
            <div className="fm">
              <Thanks title={`Thank you, ${v.name.split(' ')[0]}.`} onReset={() => { f.setValues({ ...initial, loan: '' }); setStep(0); setSent(false) }}>
                <p>Our team will review your {title.toLowerCase()} {isRef ? 'details' : 'requirement'} and call you on {v.phone}.</p>
              </Thanks>
            </div>
          ) : (
            <form className="fm" onSubmit={submit} noValidate>
              <div className="progress" aria-label={`Step ${step + 1} of 3: ${stepNames[step]}`}>
                {stepNames.map((n, i) => (
                  <div key={n} className={i <= step ? 'on' : ''}>
                    <i />
                    <span>{i + 1}. {n}</span>
                  </div>
                ))}
              </div>

              {step === 0 && (
                <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="t-h2" style={{ marginBottom: 20 }}>What do you need?</legend>
                  <div className="choice four">
                    {loanServices.map((s) => {
                      const Icon = s.icon
                      return (
                        <label key={s.id}>
                          <input type="radio" name="loan" id={s.id === loanServices[0].id ? 'f-loan' : undefined} value={s.id} checked={v.loan === s.id} onChange={f.set('loan')} />
                          <Icon size={24} aria-hidden="true" />
                          <b>{s.title}</b>
                          <small>{s.nav}</small>
                        </label>
                      )
                    })}
                    <label>
                      <input type="radio" name="loan" value="reference" checked={isRef} onChange={f.set('loan')} />
                      <UserPlus size={24} aria-hidden="true" />
                      <b>Reference</b>
                      <small>Refer a customer to us</small>
                    </label>
                    <Link to="/dealer-network#partner-form">
                      <Network size={24} aria-hidden="true" />
                      <b>Are you a dealer?</b>
                      <small>Become a CARZENX partner →</small>
                    </Link>
                  </div>
                  {f.errors.loan && <p className="err" style={{ marginTop: 12 }}>{f.errors.loan}</p>}
                </fieldset>
              )}

              {step === 1 && (
                <>
                  <h2 className="t-h2" style={{ marginBottom: 20 }}>{isRef ? 'Who are you referring?' : `${title}: car & loan`}</h2>
                  <div className="fm-grid">
                    {isRef ? (
                      <Field f={f} k="message" label="Customer details" type="textarea" full placeholder="Name, phone number, city and what they need" />
                    ) : (
                      <>
                        <SearchSelect f={f} k="car" label="Make / model" options={carModels} placeholder="Select or type to search" optional={v.loan === 'loan-rto-services'} />
                        <Select f={f} k="year" label="Year" options={years} />
                        <RegFields f={f} optional={v.loan === 'new-car-loan' || v.year.includes('New')} />
                        <Field
                          f={f}
                          k="amount"
                          label={v.loan === 'new-car-loan' ? 'On-road price (₹)' : v.loan === 'used-car-loan' ? 'Car price (₹)' : 'Loan amount needed (₹)'}
                          inputMode="numeric"
                          optional
                        />
                        {v.loan === 'bt-top-up' && <Field f={f} k="lender" label="Current lender" placeholder="Bank or NBFC name" />}
                        <Select f={f} k="employment" label="Employment type" options={employment} optional={v.loan === 'loan-rto-services'} />
                        <Field f={f} k="income" label="Monthly income (₹)" inputMode="numeric" optional />
                      </>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="t-h2" style={{ marginBottom: 20 }}>Your details</h2>
                  <div className="fm-grid">
                    <Field f={f} k="name" label="Full name" autoComplete="name" />
                    <Field f={f} k="phone" label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile" />
                    <Field f={f} k="email" label="Email" type="email" autoComplete="email" optional />
                    <Field f={f} k="city" label="City" autoComplete="address-level2" />
                    <Select f={f} k="state" label="State / UT" options={states} />
                    <div className="hp" aria-hidden="true">
                      <label htmlFor="f-website">Website</label>
                      <input id="f-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={f.set('website')} />
                    </div>
                    <Consent f={f} />
                  </div>
                </>
              )}

              <div className="fm-actions" style={{ marginTop: 28 }}>
                {step > 0 ? (
                  <button type="button" className="btn btn-line" onClick={() => setStep((s) => s - 1)}>← Back</button>
                ) : (
                  <span className="t-small">Questions? Call <a href={site.phone.href} style={{ color: 'var(--blue)', fontWeight: 700 }}>{site.phone.display}</a></span>
                )}
                <button type="submit" className="btn btn-blue btn-lg">
                  {step < 2 ? 'Continue' : 'Submit enquiry'} <span className="arr">→</span>
                </button>
              </div>
              <p className="t-small" style={{ marginTop: 20 }}>
                CARZENX is a DSA, not a lender. Submitting this form does not guarantee a loan; the lender decides approval and terms.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
