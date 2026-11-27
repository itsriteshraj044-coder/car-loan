import { useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

const types = [
  { id: 'new-car-loan', label: 'New car', maxYears: 7, amount: 800000 },
  { id: 'used-car-loan', label: 'Used car', maxYears: 6, amount: 500000 },
  { id: 'car-refinance', label: 'Refinance', maxYears: 5, amount: 400000 },
  { id: 'bt-top-up', label: 'BT Top-up', maxYears: 5, amount: 600000 },
]

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

function Range({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  ends,
  onChange,
  prefix,
  suffix,
  decimals = 0,
  format = (v: number) => String(v),
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  ends: [string, string]
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  decimals?: number
  format?: (v: number) => string
}) {
  const p = ((Math.min(Math.max(value, min), max) - min) / (max - min)) * 100
  const [draft, setDraft] = useState<string | null>(null)

  const parse = (s: string) => {
    const n = parseFloat(s.replace(/[^\d.]/g, ''))
    return Number.isFinite(n) ? n : NaN
  }

  const commit = () => {
    if (draft === null) return
    const n = parse(draft)
    const f = 10 ** decimals
    const v = Number.isNaN(n) ? value : Math.min(max, Math.max(min, Math.round(n * f) / f))
    onChange(v)
    setDraft(null)
  }

  const typed = (s: string) => {
    const clean = decimals > 0 ? s.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1') : s.replace(/\D/g, '')
    setDraft(clean)
    const n = parse(clean)
    if (!Number.isNaN(n) && n >= min && n <= max) onChange(n)
  }

  return (
    <div className="rng">
      <div className="rng-top">
        <label htmlFor={`${id}-num`}>{label}</label>
        <div className="rng-box">
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            id={`${id}-num`}
            type="text"
            inputMode={decimals > 0 ? 'decimal' : 'numeric'}
            value={draft ?? format(value)}
            onFocus={(e) => {
              setDraft(String(value))
              requestAnimationFrame(() => e.target.select())
            }}
            onChange={(e) => typed(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
            aria-describedby={`${id}-ends`}
            style={{ width: `${Math.max(2, (draft ?? format(value)).length) + 1}ch` }}
          />
          {suffix && <span aria-hidden="true">{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--p': `${p}%` } as CSSProperties}
        aria-valuetext={display}
      />
      <div className="rng-ends" id={`${id}-ends`}>
        <span>{ends[0]}</span>
        <span>{ends[1]}</span>
      </div>
    </div>
  )
}

export default function EmiCalculator() {
  const [type, setType] = useState(types[0])
  const [amount, setAmount] = useState(types[0].amount)
  const [years, setYears] = useState(5)
  const [rate, setRate] = useState(9.5)

  const pick = (t: (typeof types)[number]) => {
    setType(t)
    setAmount(t.amount)
    setYears((y) => Math.min(y, t.maxYears))
  }

  const r = useMemo(() => {
    const n = years * 12
    const m = rate / 1200
    const emi = m === 0 ? amount / n : (amount * m * (1 + m) ** n) / ((1 + m) ** n - 1)
    const total = emi * n
    return { emi, total, interest: total - amount }
  }, [amount, years, rate])

  const principalShare = (amount / r.total) * 100

  return (
    <div className="calc rv">
      <div className="calc-in">
        <div className="calc-types" role="group" aria-label="Loan type">
          {types.map((t) => (
            <button key={t.id} type="button" aria-pressed={t.id === type.id} onClick={() => pick(t)}>
              {t.label}
            </button>
          ))}
        </div>
        <Range
          id="emi-amt"
          label="Loan amount"
          value={amount}
          min={100000}
          max={5000000}
          step={50000}
          display={inr(amount)}
          ends={['₹1 lakh', '₹50 lakh']}
          onChange={setAmount}
          prefix="₹"
          format={(v) => Math.round(v).toLocaleString('en-IN')}
        />
        <Range
          id="emi-yrs"
          label="Tenure"
          value={years}
          min={1}
          max={type.maxYears}
          step={1}
          display={`${years} ${years === 1 ? 'year' : 'years'}`}
          ends={['1 year', `${type.maxYears} years`]}
          onChange={setYears}
          suffix={years === 1 ? 'year' : 'years'}
        />
        <Range
          id="emi-rate"
          label="Interest rate (p.a.)"
          value={rate}
          min={7}
          max={18}
          step={0.25}
          display={`${rate.toFixed(2)}%`}
          ends={['7%', '18%']}
          onChange={setRate}
          suffix="%"
          decimals={2}
          format={(v) => v.toFixed(2)}
        />
      </div>
      <div className="calc-out" aria-live="polite">
        <span className="lbl">Estimated monthly EMI</span>
        <div className="emi">
          {inr(r.emi)} <small>/ month</small>
        </div>
        <div className="bar" aria-hidden="true">
          <i style={{ width: `${principalShare}%` }} />
          <i style={{ width: `${100 - principalShare}%` }} />
        </div>
        <ul className="calc-rows">
          <li><span><i className="dot" />Principal</span><b>{inr(amount)}</b></li>
          <li><span><i className="dot r" />Total interest</span><b>{inr(r.interest)}</b></li>
          <li><span>Total payable</span><b>{inr(r.total)}</b></li>
        </ul>
        <Link to={`/apply?loan=${type.id}`} className="btn btn-blue btn-lg">
          Check my eligibility <span className="arr">→</span>
        </Link>
        <p className="calc-note">
          Illustration only. Your actual rate, amount and tenure are set by the lender after assessing your profile and vehicle.
        </p>
      </div>
    </div>
  )
}
