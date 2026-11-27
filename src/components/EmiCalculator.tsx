import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const types = [
  { id: 'new-car-loan', label: 'New car', amount: 800000 },
  { id: 'used-car-loan', label: 'Used car', amount: 500000 },
  { id: 'car-refinance', label: 'Refinance', amount: 400000 },
  { id: 'bt-top-up', label: 'BT Top-up', amount: 600000 },
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
  typeMax = max,
  log = false,
  extra,
  note,
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
  /** Highest value that can be typed in the box; defaults to the slider's max. */
  typeMax?: number
  /**
   * Logarithmic slider for wide ranges (₹1 lakh to ₹50 crore): equal slider distance = equal ratio,
   * so everyday amounts get most of the track. Values land on round numbers (2 significant figures).
   */
  log?: boolean
  /** Control shown beside the label, e.g. a unit toggle. */
  extra?: ReactNode
  /** Hint under the slider, e.g. how to enter a value beyond its range. */
  note?: string
}) {
  const clamped = Math.min(Math.max(value, min), max)
  const LOG_STEPS = 1000
  const toPos = (v: number) => Math.round((Math.log(v / min) / Math.log(max / min)) * LOG_STEPS)
  const fromPos = (pos: number) => {
    const raw = min * (max / min) ** (pos / LOG_STEPS)
    const unit = Math.max(step, 10 ** (Math.floor(Math.log10(raw)) - 1) / 2)
    return Math.min(max, Math.max(min, Math.round(raw / unit) * unit))
  }
  const p = log ? (toPos(clamped) / LOG_STEPS) * 100 : ((clamped - min) / (max - min)) * 100
  const [draft, setDraft] = useState<string | null>(null)

  const parse = (s: string) => {
    const n = parseFloat(s.replace(/[^\d.]/g, ''))
    return Number.isFinite(n) ? n : NaN
  }

  const commit = () => {
    if (draft === null) return
    const n = parse(draft)
    const f = 10 ** decimals
    const v = Number.isNaN(n) ? value : Math.min(typeMax, Math.max(min, Math.round(n * f) / f))
    onChange(v)
    setDraft(null)
  }

  const typed = (s: string) => {
    const clean = decimals > 0 ? s.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1') : s.replace(/\D/g, '')
    setDraft(clean)
    const n = parse(clean)
    if (!Number.isNaN(n) && n >= min && n <= typeMax) onChange(n)
  }

  return (
    <div className="rng">
      <div className="rng-top">
        <div className="rng-lbl">
          <label htmlFor={`${id}-num`}>{label}</label>
          {extra}
        </div>
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
        min={log ? 0 : min}
        max={log ? LOG_STEPS : max}
        step={log ? 1 : step}
        value={log ? toPos(clamped) : value}
        onChange={(e) => onChange(log ? fromPos(Number(e.target.value)) : Number(e.target.value))}
        style={{ '--p': `${p}%` } as CSSProperties}
        aria-valuetext={display}
      />
      <div className="rng-ends" id={`${id}-ends`}>
        <span>{ends[0]}</span>
        <span>{ends[1]}</span>
      </div>
      {note && <p className="rng-note">{note}</p>}
    </div>
  )
}

const MIN_MONTHS = 1
const SLIDER_YEARS = 20
/** Longest tenure that can be typed in, in months (99 years). */
const MAX_MONTHS = 99 * 12

/** Tenure entered in years or months (visitor's choice); the EMI always works in months. */
function Tenure({ months, onChange }: { months: number; onChange: (m: number) => void }) {
  const [unit, setUnit] = useState<'years' | 'months'>('years')
  const set = (m: number) => onChange(Math.min(MAX_MONTHS, Math.max(MIN_MONTHS, Math.round(m))))
  const years = months / 12
  const y = Math.floor(months / 12)
  const m = months % 12
  const text = `${y} ${y === 1 ? 'year' : 'years'}${m ? ` ${m} ${m === 1 ? 'month' : 'months'}` : ''}`

  const toggle = (
    <div className="unit" role="group" aria-label="Enter tenure in">
      {(['years', 'months'] as const).map((u) => (
        <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}>
          {u === 'years' ? 'Years' : 'Months'}
        </button>
      ))}
    </div>
  )

  return unit === 'years' ? (
    <Range
      key="years"
      id="emi-ten"
      label="Tenure"
      extra={toggle}
      value={Math.round(years * 10) / 10}
      min={1}
      max={SLIDER_YEARS}
      step={1}
      typeMax={MAX_MONTHS / 12}
      decimals={1}
      format={(v) => String(Math.round(v * 10) / 10)}
      display={text}
      ends={['1 year', `${SLIDER_YEARS} years+`]}
      note={`More than ${SLIDER_YEARS} years? Type it in the box above.`}
      onChange={(v) => set(v * 12)}
      suffix={years === 1 ? 'year' : 'years'}
    />
  ) : (
    <Range
      key="months"
      id="emi-ten"
      label="Tenure"
      extra={toggle}
      value={months}
      min={MIN_MONTHS}
      max={SLIDER_YEARS * 12}
      step={1}
      typeMax={MAX_MONTHS}
      display={text}
      ends={['1 month', `${SLIDER_YEARS * 12} months+`]}
      note={`More than ${SLIDER_YEARS * 12} months? Type it in the box above.`}
      onChange={set}
      suffix={months === 1 ? 'month' : 'months'}
    />
  )
}

export default function EmiCalculator() {
  const [type, setType] = useState(types[0])
  const [amount, setAmount] = useState(types[0].amount)
  const [months, setMonths] = useState(60)
  const [rate, setRate] = useState(9.5)

  const pick = (t: (typeof types)[number]) => {
    setType(t)
    setAmount(t.amount)
  }

  const r = useMemo(() => {
    const n = months
    const m = rate / 1200
    const emi = m === 0 ? amount / n : (amount * m * (1 + m) ** n) / ((1 + m) ** n - 1)
    const total = emi * n
    return { emi, total, interest: total - amount }
  }, [amount, months, rate])

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
          max={50_00_00_000}
          typeMax={99_99_99_99_999}
          step={5000}
          log
          display={inr(amount)}
          ends={['₹1 lakh', '₹50 crore+']}
          note="More than ₹50 crore? Type the amount in the box above."
          onChange={setAmount}
          prefix="₹"
          format={(v) => Math.round(v).toLocaleString('en-IN')}
        />
        <Tenure months={months} onChange={setMonths} />
        <Range
          id="emi-rate"
          label="Interest rate (p.a.)"
          value={rate}
          min={7}
          max={30}
          typeMax={50}
          step={0.25}
          display={`${rate.toFixed(2)}%`}
          ends={['7%', '30%+']}
          note="Rate above 30%? Type it in the box above."
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
