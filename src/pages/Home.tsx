import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
CarFront, Check, ClipboardCheck, FileCheck2, Globe2, Handshake, Landmark, Layers,
  Route, ShieldCheck, Timer, TrendingUp, Users, Zap,
} from 'lucide-react'
import { services } from '../data/services'
import { homeFaqs } from '../data/faqs'
import { site } from '../data/site'
import EmiCalculator from '../components/EmiCalculator'
import PartnerMarquee from '../components/PartnerMarquee'
import { CarDefs, DealerArt, GaugeArt, HeroBg, HeroCar, IndiaMapArt, ShowroomArt } from '../components/CarArt'
import { CtaBand, Faq, SectionHead, Seo, ServiceCard, Steps } from '../components/ui'
import { useEngineRev } from '../hooks/useEngineRev'

const benefits = [
  { icon: Landmark, t: 'Access to credit', d: 'Reach partner banks such as Axis Bank and ICICI Bank through one application.', tags: ['Buyers', 'Dealers'] },
  { icon: Layers, t: 'Choice of lenders', d: 'Compare suitable options instead of settling for the first offer.', tags: ['Buyers'] },
  { icon: ClipboardCheck, t: 'Guided documentation', d: 'A clear checklist, collected once and submitted complete.', tags: ['Buyers'] },
  { icon: Timer, t: 'Faster turnaround', d: 'Complete files move quicker through the lender’s process.', tags: ['Buyers', 'Dealers'] },
  { icon: Handshake, t: 'Close more deals', d: 'A finance desk that keeps buyers from walking away at the counter.', tags: ['Dealers'] },
  { icon: TrendingUp, t: 'Grow sales', d: 'Offer finance on new and used cars without building an in-house team.', tags: ['Dealers'] },
  { icon: FileCheck2, t: 'Loan + RTO together', d: 'Registration, transfer and hypothecation handled with the loan.', tags: ['Buyers', 'Dealers'] },
]

const tabs = {
  buyers: {
    label: 'For buyers',
    title: 'One application. Several lenders. Zero guesswork.',
    text: 'Tell us the car and your budget once. We match your profile with partner banks, explain what each will ask for, and stay with you until the keys are in your hand.',
    items: [
      { t: 'Options, compared', d: 'Suitable lenders for your profile and car.' },
      { t: 'A clear checklist', d: 'Know exactly which documents you need.' },
      { t: 'One point of contact', d: 'One team from enquiry to disbursal.' },
      { t: 'RTO handled', d: 'Registration and transfer coordinated.' },
    ],
  },
  dealers: {
    label: 'For dealers',
    title: 'A finance desk on your showroom floor.',
    text: 'Stop losing sales at the finance stage. Refer buyers to Carzenx Pvt. Ltd. and we route them to suitable lenders, keep your sales team updated and handle the paperwork after the sale.',
    items: [
      { t: 'Ready buyers', d: 'Finance sorted while the customer is still keen.' },
      { t: 'New and used cars', d: 'Finance support across your inventory.' },
      { t: 'Status updates', d: 'Your team always knows where a file stands.' },
      { t: 'Pan-India reach', d: 'Partner from any city in India.' },
    ],
  },
  lenders: {
    label: 'For lenders',
    title: 'Complete, verified-ready files from the field.',
    text: 'We bring lending partners well-prepared applications from buyers and dealerships across India, with documents organised to your checklist so your credit team can decide faster.',
    items: [
      { t: 'Organised files', d: 'Applications built to your checklist.' },
      { t: 'Dealer network', d: 'Sourcing through dealers and distributors.' },
      { t: 'Vehicle paperwork', d: 'RC, insurance and valuation in order.' },
      { t: 'Post-sale support', d: 'Hypothecation and RTO follow-up.' },
    ],
  },
}
type TabKey = keyof typeof tabs

const howSteps = [
  { t: 'Share your requirement', d: 'Tell us the car, the loan type and a little about yourself. It takes about two minutes.' },
  { t: 'Get matched with lenders', d: 'We check your profile against partner bank criteria and explain the options.' },
  { t: 'Documents, done once', d: 'We give you a checklist, collect the paperwork and submit a complete file.' },
  { t: 'Sanction and drive', d: 'The lender decides and disburses. We coordinate the RTO work so you can drive.' },
]

export default function Home() {
  const [tab, setTab] = useState<TabKey>('buyers')
  const rev = useEngineRev()
  const t = tabs[tab]
  const years = new Date().getFullYear() - site.since

  return (
    <>
      <Seo
        title="Carzenx Pvt. Ltd. | Car Loan DSA Distributor in India Since 2017"
        description="New car loans, used car loans, car refinance, BT top-up and RTO support. Carzenx Pvt. Ltd. connects car buyers and dealers with partner banks such as Axis Bank and ICICI Bank across India, since 2017."
        path="/"
      />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <CarDefs />
        <HeroBg />
        <div className="wrap hero-body">
          <div>
            <div className="hero-label">CAR LOAN · DSA DISTRIBUTOR</div>
            <h1 className="hero-h" id="hero-title">
              <span className="ln"><span>Apply once.</span></span>
              <span className="ln"><span>Compare <span className="hl">lenders.</span></span></span>
              <span className="ln"><span>Drive sooner.</span></span>
            </h1>
            <p className="hero-desc">
              Carzenx Pvt. Ltd. connects car buyers, dealers and banks across India. One enquiry gets you matched with partner lenders for
              new and used car loans, refinance and BT top-up, with documents and RTO work handled by one team.
            </p>
            <div className="hero-cta">
              <Link to="/apply" className="btn btn-blue btn-lg">
                Check eligibility <span className="arr">→</span>
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg">
                Explore loans <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </div>
        <HeroCar />
        <div className="strip">
          <div className="wrap strip-in">
            <div className="si"><CarFront aria-hidden="true" /><span>New &amp; used car loans</span></div>
            <div className="si"><Globe2 aria-hidden="true" /><span>Pan-India since {site.since}</span></div>
            <div className="si"><FileCheck2 aria-hidden="true" /><span>Loan + RTO support</span></div>
            <div className="si"><Users aria-hidden="true" /><span>Dealer &amp; distributor network</span></div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="sec sec-grey" aria-labelledby="ben-title">
        <div className="wrap">
          <SectionHead
            kicker="Why Carzenx Pvt. Ltd."
            id="ben-title"
            title={<>Every side of the car deal, <span className="hl">connected.</span></>}
            lead="Buyers want the right loan, dealers want the sale closed and lenders want complete files. Carzenx Pvt. Ltd. sits in the middle and keeps all three moving."
            variant="split"
          />
          <div className="tiles">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <article className="tile rv" key={b.t} style={{ transitionDelay: `${(i % 4) * 0.08}s` }}>
                  <div className="ic"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></div>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                  <div className="tags">
                    {b.tags.map((tg) => (
                      <span key={tg} className={`tag ${tg === 'Dealers' ? 'r' : 'b'}`}>{tg}</span>
                    ))}
                  </div>
                </article>
              )
            })}
            <article className="tile feature rv" style={{ transitionDelay: '.24s' }}>
              <div>
                <div className="ic" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}><Zap size={24} aria-hidden="true" /></div>
                <h3>Start in two minutes</h3>
                <p>Share your requirement and our team calls you back with the next steps.</p>
              </div>
              <Link to="/apply" className="btn btn-white btn-sm">Apply now <span className="arr">→</span></Link>
            </article>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="mq" aria-label="Our services">
        <div className="mq-track">
          {[0, 1].map((g) => (
            <div className="mq-grp" key={g} aria-hidden={g === 1}>
              <span>New Car Loans</span><span>Used Car Loans</span><span>Car Refinance</span><span>BT Top-up</span>
              <span>Loan + RTO Services</span><span>Dealer Distributorship</span>
            </div>
          ))}
        </div>
      </section>

      {/* What is Carzenx Pvt. Ltd. */}
      <section className="sec" aria-labelledby="what-title">
        <div className="wrap what-grid">
          <div className="photo art rv">
            <ShowroomArt />
            <div className="badge"><b>{site.since}</b><span>Pan-India car loan distribution</span></div>
          </div>
          <div>
            <div className="kicker rv">What is Carzenx Pvt. Ltd.</div>
            <h2 className="t-h1 rv" id="what-title">The bridge between your car and the right lender.</h2>
            <p className="t-lead rv" style={{ marginTop: 20 }}>
              Carzenx Pvt. Ltd. is a car loan DSA distributor. We do not lend money and we do not borrow it. We understand what you
              need, find partner banks whose criteria fit, prepare a complete file and follow it through to disbursal and
              the RTO.
            </p>
            <p className="not-lender rv"><ShieldCheck size={18} aria-hidden="true" /> Not a lender. Lenders decide approval, rate and terms.</p>
            <div className="quad">
              {[
                { i: CarFront, t: 'Car & loan match', d: 'The right loan type for the car you want.' },
                { i: Landmark, t: 'Lender routing', d: 'Your file goes to partners whose criteria fit.' },
                { i: ClipboardCheck, t: 'Document desk', d: 'Checklist, collection and complete submission.' },
                { i: Route, t: 'Title & RTO transfer', d: 'Registration, transfer and hypothecation.' },
              ].map((q, i) => {
                const Icon = q.i
                return (
                  <div className="qi rv" key={q.t} style={{ transitionDelay: `${i * 0.08}s` }}>
                    <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                    <h3>{q.t}</h3>
                    <p>{q.d}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats + audience tabs */}
      <section className="sec sec-dark" aria-labelledby="tabs-title">
        <div className="wrap">
          <div className="stats rv" style={{ marginBottom: 'clamp(56px,8vw,96px)' }}>
            <div className="stat"><b>{years}<em>+</em></b><span>Years of pan-India car loans and distributorship, since {site.since}</span></div>
            <div className="stat"><b>1,000<em>+</em></b><span>Car dealers and DSAs already partnered with us</span></div>
            <div className="stat"><b>7,000<em>+</em></b><span>Happy clients who got their car loan through us</span></div>
            <div className="stat"><b><em>Pan-</em>India</b><span>Buyers, dealers and distributors served</span></div>
          </div>
          <div className="kicker rv">Benefits</div>
          <h2 className="t-h1 rv" id="tabs-title" style={{ marginBottom: 28, maxWidth: '18ch' }}>Built for everyone at the table.</h2>
          <div className="tabs rv" role="tablist" aria-label="Choose who you are">
            {(Object.keys(tabs) as TabKey[]).map((k) => (
              <button
                key={k}
                role="tab"
                id={`tab-${k}`}
                aria-selected={tab === k}
                aria-controls="tab-panel"
                tabIndex={tab === k ? 0 : -1}
                onClick={() => setTab(k)}
                onKeyDown={(e) => {
                  const keys = Object.keys(tabs) as TabKey[]
                  const i = keys.indexOf(tab)
                  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    const n = keys[(i + (e.key === 'ArrowRight' ? 1 : keys.length - 1)) % keys.length]
                    setTab(n)
                    document.getElementById(`tab-${n}`)?.focus()
                  }
                }}
              >
                {tabs[k].label}
              </button>
            ))}
          </div>
          <div className="tab-panel" key={tab} id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            <div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <Link to={tab === 'dealers' ? '/dealer-network' : tab === 'lenders' ? '/contact' : '/apply'} className="btn btn-blue btn-lg">
                {tab === 'dealers' ? 'Become a partner' : tab === 'lenders' ? 'Talk to our team' : 'Apply now'} <span className="arr">→</span>
              </Link>
            </div>
            <div className="feat">
              {t.items.map((it, i) => (
                <article className="fb" key={it.t}>
                  <div className="fb-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                  <h4>{it.t}</h4>
                  <p>{it.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="sec" id="products" aria-labelledby="prod-title">
        <div className="wrap">
          <SectionHead
            kicker="Our products"
            id="prod-title"
            title="Car finance for every stage of ownership."
            lead="From the day you buy to the day you move your loan, there is a Carzenx Pvt. Ltd. product for it."
            variant="split"
          />
          <div className="svc-grid">
            {services.map((s, i) => (
              <ServiceCard s={s} key={s.id} delay={(i % 3) * 0.08} />
            ))}
          </div>
          <p className="svc-note rv">Tenures are indicative and subject to lender eligibility, terms and approval.</p>
        </div>
      </section>

      {/* Partners */}
      <section className="sec sec-grey" aria-labelledby="partners-title">
        <div className="wrap">
          <SectionHead
            kicker="Lending partners"
            id="partners-title"
            title="Banks we work with."
            lead="We route each application to lending partners whose criteria fit your profile and your car."
            variant="split"
          />
        </div>
        <PartnerMarquee />
        <div className="wrap lg-foot rv">
          <span>Lenders shown are part of the Carzenx Pvt. Ltd. lending partner network. Each lender decides its own eligibility and terms.</span>
          <Link to="/contact" className="lg-link">Are you a lender? Partner with us →</Link>
        </div>
      </section>

      {/* How it works */}
      <section className="sec" aria-labelledby="how-title">
        <div className="wrap">
          <SectionHead kicker="How it works" id="how-title" title="Four steps from enquiry to keys." />
          <Steps steps={howSteps} />
        </div>
      </section>

      {/* EMI tool */}
      <section className="sec sec-grey" id="emi" aria-labelledby="emi-title">
        <div className="wrap">
          <SectionHead
            kicker="EMI calculator"
            id="emi-title"
            title="Know your EMI before you apply."
            lead="Move the sliders to see an estimated monthly instalment. When it looks right, check your eligibility in two minutes."
            variant="split"
          />
          <EmiCalculator />
        </div>
      </section>

      {/* Dealer band */}
      <section className="sec dl" aria-labelledby="dl-title">
        <DealerArt />
        <div className="wrap dl-grid on-dark">
          <div>
            <div className="kicker rv">Dealer partnership</div>
            <h2 className="t-h1 rv" id="dl-title">Grow your dealership with the right finance network.</h2>
            <p className="dl-p rv">
              Carzenx Pvt. Ltd. works with new and used car dealers, distributors and business partners across India. You sell the car,
              we take care of the finance.
            </p>
            <div className="dl-cta rv">
              <Link to="/dealer-network" className="btn btn-blue btn-lg">Become a partner <span className="arr">→</span></Link>
              <a href={site.phone.href} className="btn btn-ghost btn-lg">Talk to our team</a>
            </div>
          </div>
          <ul className="bn rv">
            {['Pan-India business network', 'Finance desk for your buyers', 'Connections with partner banks', 'Status updates for your sales team', 'Loan + RTO handled after the sale'].map((b) => (
              <li key={b}><Check size={22} aria-hidden="true" />{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we serve */}
      <section className="sec" aria-labelledby="serve-title">
        <div className="wrap">
          <SectionHead kicker="Who we serve" id="serve-title" title="Buying a car, or selling them?" />
          <div className="srv">
            <article className="pn gauge rv">
              <GaugeArt needleRef={rev.needleRef} arcRef={rev.arcRef} />
              <div className="pn-c">
                <div className="pn-tag">INDIVIDUALS</div>
                <h3>For car buyers</h3>
                <p>New car loans, used car finance, refinance and BT top-up, with the paperwork and RTO handled.</p>
                <Link to="/apply" className="btn btn-blue btn-lg" {...rev.bind}>Apply for a car loan <span className="arr">→</span></Link>
              </div>
            </article>
            <article className="pn net rv" style={{ transitionDelay: '.12s' }}>
              <IndiaMapArt />
              <div className="pn-c">
                <div className="pn-tag">BUSINESSES</div>
                <h3>For dealers &amp; distributors</h3>
                <p>A finance desk for your showroom and distributorship opportunities across India.</p>
                <Link to="/dealer-network" className="btn btn-ghost btn-lg">Become a partner <span className="arr">→</span></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec sec-grey" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <div className="kicker rv">FAQ</div>
            <h2 className="t-h1 rv" id="faq-title">Questions, answered.</h2>
            <div className="note rv">
              <b>Important:</b> Carzenx Pvt. Ltd. is a distributor and does not approve loans. The lender independently evaluates every
              application and sets the eligibility, interest rate, tenure and final terms.
            </div>
          </div>
          <div className="rv">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
