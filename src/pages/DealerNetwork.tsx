import { BadgeCheck, Bell, Building2, Check, Globe2, Handshake, Landmark, Store, UserCheck, Users } from 'lucide-react'
import { findService } from '../data/services'
import { site } from '../data/site'
import { EnquiryForm } from '../components/forms'
import { Faq, PageHero, SectionHead, Seo, Steps } from '../components/ui'

const perks = [
  { i: Landmark, t: 'Partner bank access', d: 'Route your buyers to lenders such as Axis Bank and ICICI Bank.' },
  { i: Handshake, t: 'Close more sales', d: 'Keep buyers from walking away when finance gets complicated.' },
  { i: Bell, t: 'Status updates', d: 'Your sales team always knows where each file stands.' },
  { i: BadgeCheck, t: 'Paperwork handled', d: 'Documents, valuation, RTO transfer and hypothecation.' },
  { i: Globe2, t: 'Pan-India', d: 'Partner with us from any city in India.' },
  { i: Users, t: 'Dedicated contact', d: 'One person to call for every referral.' },
]

const who = [
  { i: Store, t: 'New car dealers' },
  { i: Building2, t: 'Used car dealers' },
  { i: UserCheck, t: 'Finance consultants & DSAs' },
  { i: Users, t: 'Automobile businesses' },
]

export default function DealerNetwork() {
  const s = findService('dealer-distributorship')!
  return (
    <>
      <Seo
        title="Dealer & Distributorship Partnership | CARZENX"
        description="Partner with CARZENX: a finance desk for new and used car dealers and pan-India distributorship opportunities, connecting your buyers with partner banks."
        path="/dealer-network"
      />
      <PageHero
        crumbs={[{ label: 'Dealer Network' }]}
        title={s.headline}
        sub={s.intro}
        image={s.image}
        imageAlt={s.imageAlt}
        chip={{ big: 'Since ' + site.since, small: 'Working with dealers pan-India' }}
      >
        <div className="hero-cta">
          <a href="#partner-form" className="btn btn-blue btn-lg">Become a partner <span className="arr">→</span></a>
          <a href={site.phone.href} className="btn btn-ghost btn-lg">Call {site.phone.display}</a>
        </div>
      </PageHero>

      <section className="sec sec-grey">
        <div className="wrap">
          <SectionHead kicker="Partner benefits" title="What you get as a CARZENX partner." variant="split" lead="You focus on selling cars. We take the finance work off your plate." />
          <div className="tiles three">
            {perks.map((p, i) => {
              const Icon = p.i
              return (
                <article className="tile rv" key={p.t} style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                  <div className="ic"><Icon size={24} aria-hidden="true" /></div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <SectionHead kicker="Who can partner" title="Built for automobile businesses." />
          <div className="feat four">
            {who.map((w, i) => {
              const Icon = w.i
              return (
                <article className="fb rv" key={w.t} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <Icon size={30} color="var(--blue-l)" aria-hidden="true" style={{ marginBottom: 22 }} />
                  <h4>{w.t}</h4>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="How it works" title="From first call to first referral." />
          <Steps steps={s.steps} />
        </div>
      </section>

      <section className="sec sec-grey" id="partner-form">
        <div className="wrap contact-grid">
          <div>
            <div className="kicker rv">Partner enquiry</div>
            <h2 className="t-h1 rv">Let’s grow together.</h2>
            <p className="t-lead rv" style={{ marginTop: 16 }}>Share a few details about your business and our partnerships team will get in touch.</p>
            <ul className="check rv" style={{ margin: '28px 0' }}>
              {s.includes.map((x) => <li key={x}><Check size={20} aria-hidden="true" />{x}</li>)}
            </ul>
            <div className="rv"><Faq items={s.faqs} idPrefix="dq" /></div>
            <p className="warn rv" style={{ marginTop: 24 }}>Partnerships are subject to onboarding and agreement. CARZENX does not guarantee earnings, volumes or outcomes.</p>
          </div>
          <div className="rv"><EnquiryForm variant="partner" /></div>
        </div>
      </section>
    </>
  )
}
