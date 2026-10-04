import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, IdCard, Wallet, CarFront, Info } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import ImageReveal from '../components/ImageReveal'
import CTAButton from '../components/CTAButton'
import CTASection from '../components/CTASection'
import { services } from '../data/services'
import { disclosure } from '../data/site'
import { getLenis } from '../hooks/useLenis'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIntroDone } from '../context/IntroContext'
import styles from './Services.module.css'

const documents = [
  {
    icon: IdCard,
    title: 'Identity & address (KYC)',
    items: ['PAN card', 'Aadhaar or other officially valid document', 'Current address proof', 'Recent photographs'],
  },
  {
    icon: Wallet,
    title: 'Income & banking',
    items: [
      'Salaried: recent salary slips and Form 16',
      'Self-employed: ITRs and business proof',
      'Recent bank account statements',
      'Existing loan details, if any',
    ],
  },
  {
    icon: CarFront,
    title: 'Vehicle documents',
    items: [
      'New car: proforma invoice / on-road quotation',
      'Used car: copy of RC and insurance',
      'Used car: vehicle valuation, where required',
      'Seller or dealer details',
    ],
  },
]

const faqs = [
  {
    q: 'Does CARZENX approve or provide the loan?',
    a: 'No. CARZENX is a Direct Selling Agent (DSA) distributor. We help you prepare and submit your application to suitable lending partners. The bank or NBFC independently assesses your application and decides on approval, interest rate and terms.',
  },
  {
    q: 'Can you guarantee approval or a particular interest rate?',
    a: 'No one other than the lender can decide that, and we never promise approvals or rates. What we can do is help you understand the options lenders present and make sure your application is complete and accurate.',
  },
  {
    q: 'Do you assist with used car loans as well?',
    a: 'Yes. Pre-owned vehicles usually need additional paperwork such as the RC, insurance and sometimes a valuation. We explain what lenders typically ask for and help you assemble it.',
  },
  {
    q: 'I’m a dealer. How can we work with CARZENX?',
    a: 'We can act as a finance distribution partner for your customers — helping them access suitable lending partners and supporting their documentation. Get in touch through the contact page and our team will follow up.',
  },
  {
    q: 'Will I pay the loan amount or EMIs to CARZENX?',
    a: 'No. Loan disbursal and repayments happen directly between you and the lending partner. CARZENX does not collect or hold loan funds or EMIs.',
  },
  {
    q: 'How is my personal information handled?',
    a: 'Your documents and details are shared with lending partners only with your consent and only for processing your application.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className={styles.faq} data-reveal>
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
            <h3 style={{ margin: 0 }}>
              <button
                className={styles.faqQ}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={styles.faqA}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function Services() {
  const root = useRef<HTMLDivElement>(null)
  const { hash } = useLocation()
  const introDone = useIntroDone()
  useScrollAnimation(root)

  // deep links such as /services#used-car-loan — wait for the page transition to settle
  useEffect(() => {
    if (!hash || !introDone) return
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(hash)
      if (!el) return
      const lenis = getLenis()
      if (lenis) {
        lenis.resize() // page height has grown since Lenis last measured
        lenis.scrollTo(el, { duration: 1.4 }) // honours the row's CSS scroll-margin-top
      } else el.scrollIntoView({ behavior: 'smooth' })
    }, 900)
    return () => window.clearTimeout(t)
  }, [hash, introDone])

  return (
    <div ref={root}>
      <Seo
        title="Car Loan Services | New & Used Car Finance Assistance — CARZENX"
        description="New and used car loan assistance, finance guidance, application support, documentation help and dealer finance distribution from CARZENX, a car loan DSA distributor."
        path="/services"
      />

      <PageHero
        crumb="Services"
        lines={['Car finance,', 'assisted end', 'to end.']}
        accent={{ assisted: 'text-red' }}
        lead="From the first conversation to the lender’s decision, CARZENX supports car buyers and dealerships with guidance, applications and documentation — connecting you with suitable lending partners."
        image="sedan-front"
        imageAlt="Front view of a black luxury sedan parked on a city street"
        footLeft="Six services"
        footRight="Buyers · Dealers · Lending partners"
      />

      <nav className={styles.index} aria-label="Services on this page">
        {services.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => {
            const el = document.getElementById(s.id)
            const lenis = getLenis()
            if (el && lenis) { e.preventDefault(); lenis.scrollTo(el, { duration: 1.3 }) }
          }}>
            <small>{s.index}</small>{s.title}
          </a>
        ))}
      </nav>

      <div className={styles.list}>
        {services.map((s) => (
          <section key={s.id} id={s.id} className={styles.row} aria-labelledby={`${s.id}-title`}>
            <div className={styles.media}>
              <ImageReveal name={s.image} alt={s.imageAlt} sizes="(max-width: 900px) 100vw, 52vw" />
              <span className={styles.mediaNum} aria-hidden="true">{s.index}</span>
            </div>
            <div className={styles.copy}>
              <div className={styles.iconRow} data-reveal>
                <span className={styles.icon}><s.icon size={24} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className={styles.tag}>Service {s.index}</span>
              </div>
              <h2 id={`${s.id}-title`} className={styles.title} data-reveal>{s.title}</h2>
              <p className="lead" data-reveal>{s.description}</p>
              <ul className={styles.includes} data-reveal="stagger">
                {s.includes.map((inc) => <li key={inc}><Check size={16} aria-hidden="true" />{inc}</li>)}
              </ul>
              <div data-reveal>
                <CTAButton to={`/contact?service=${s.id}`}>Enquire about this</CTAButton>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Documents */}
      <section className="section section--dark" aria-labelledby="docs-title">
        <SectionTitle
          eyebrow="Be prepared"
          title={<span id="docs-title">Documents lenders typically request.</span>}
          lead="Having these ready usually makes the process smoother. We’ll give you a personalised checklist based on your profile and vehicle."
          layout="split"
        />
        <div className={styles.docs} data-reveal="stagger">
          {documents.map((d) => (
            <div key={d.title} className={styles.doc}>
              <d.icon className={styles.docIcon} size={26} strokeWidth={1.6} aria-hidden="true" />
              <h3>{d.title}</h3>
              <ul>{d.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className={styles.note} data-reveal>
          <Info size={18} aria-hidden="true" />
          This is a general guide. Exact document requirements are set by each lending partner and may vary with your profile,
          the vehicle and the loan amount.
        </p>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className={styles.faqWrap}>
          <div className={styles.faqAside}>
            <SectionTitle eyebrow="FAQ" title={<span id="faq-title">Straight answers.</span>} lead="Understanding how a DSA works helps you make better decisions. Here are the questions we hear most." />
            <div data-reveal><CTAButton to="/contact" variant="ghost">Ask us something else</CTAButton></div>
          </div>
          <Faq />
        </div>
      </section>

      <div className={styles.disclosure} role="note">
        <strong>Disclosure</strong>
        <p>{disclosure}</p>
      </div>

      <CTASection />
    </div>
  )
}
