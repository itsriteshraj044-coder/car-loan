import { Link, useParams } from 'react-router-dom'
import { Check, FileText } from 'lucide-react'
import { findService, loanServices } from '../data/services'
import { site } from '../data/site'
import { partners } from '../data/partners'
import { CtaBand, Faq, PageHero, Seo, Steps } from '../components/ui'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { id } = useParams()
  const s = findService(id)
  if (!s || s.id === 'dealer-distributorship') return <NotFound />
  const related = loanServices.filter((x) => x.id !== s.id).slice(0, 3)

  return (
    <>
      <Seo
        title={`${s.title} | CARZENX`}
        description={`${s.short} CARZENX connects you with partner banks such as Axis Bank and ICICI Bank.`}
        path={`/services/${s.id}`}
      />
      <PageHero
        crumbs={[{ label: 'Loans', to: '/services' }, { label: s.title }]}
        title={s.headline}
        sub={s.short}
        image={s.image}
        imageAlt={s.imageAlt}
        chip={{ big: s.tenure.replace(' years', ' yrs'), small: 'Indicative tenure' }}
      >
        <div className="hero-cta">
          <Link to={`/apply?loan=${s.id}`} className="btn btn-blue btn-lg">Apply for {s.title} <span className="arr">→</span></Link>
          <a href={site.phone.href} className="btn btn-ghost btn-lg">Call us</a>
        </div>
      </PageHero>

      <section className="sec">
        <div className="wrap layout-side">
          <div>
            <div className="block">
              <div className="kicker rv">Overview</div>
              <h2 className="t-h2 rv">How CARZENX helps</h2>
              <div className="prose-p rv"><p>{s.intro}</p></div>
              <ul className="check rv" style={{ marginTop: 24 }}>
                {s.includes.map((x) => (
                  <li key={x}><Check size={20} aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>

            <div className="block">
              <div className="kicker rv">Who it is for</div>
              <h2 className="t-h2 rv">Eligible applicants</h2>
              <div className="tags rv">
                {s.who.map((w) => <span className="tag b" key={w} style={{ fontSize: 13, padding: '8px 14px', textTransform: 'none', letterSpacing: 0 }}>{w}</span>)}
              </div>
              <p className="t-small rv" style={{ marginTop: 14 }}>Eligibility criteria such as age, income and credit history are set by each lender.</p>
            </div>

            <div className="block">
              <div className="kicker rv">Documents</div>
              <h2 className="t-h2 rv">What you will typically need</h2>
              <div className="docs">
                {s.docs.map((d) => (
                  <div className="doc rv" key={d.title}>
                    <h4><FileText size={18} aria-hidden="true" />{d.title}</h4>
                    <ul>{d.items.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                ))}
              </div>
              <p className="t-small rv" style={{ marginTop: 14 }}>The exact list depends on the lender. We confirm it before you collect anything.</p>
            </div>

            <div className="block">
              <div className="kicker rv">Process</div>
              <h2 className="t-h2 rv" style={{ marginBottom: 40 }}>Four steps</h2>
              <Steps steps={s.steps} />
            </div>

            <div className="block">
              <div className="kicker rv">FAQ</div>
              <h2 className="t-h2 rv">Common questions</h2>
              <div className="rv"><Faq items={s.faqs} idPrefix={`${s.id}-q`} /></div>
            </div>
          </div>

          <aside className="sticky">
            <div className="card">
              <h3 className="t-h3">At a glance</h3>
              <ul className="glance">
                <li><span>Indicative tenure</span><b>{s.tenure}</b></li>
                <li><span>Best for</span><b>{s.bestFor}</b></li>
                <li><span>Partner banks</span><b>{partners.slice(0, 3).map((p) => p.name).join(', ')}{partners.length > 3 ? ` and ${partners.length - 3} more` : ''}</b></li>
                <li><span>RTO support</span><b>Available</b></li>
              </ul>
            </div>
            <div className="side-cta">
              <h3>Ready to start?</h3>
              <p>Share your requirement in two minutes. Our team will call you back.</p>
              <Link to={`/apply?loan=${s.id}`} className="btn btn-blue">Apply now</Link>
              <a href={site.phone.href} className="btn btn-ghost">{site.phone.display}</a>
            </div>
            <p className="warn"><b>Note:</b> CARZENX is a DSA, not a lender. Approval, rate and terms are decided by the lender.</p>
          </aside>
        </div>
      </section>

      <section className="sec sec-grey" style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="wrap">
          <h2 className="t-h2 rv" style={{ marginBottom: 24 }}>Other loans</h2>
          <div className="related">
            {related.map((r) => (
              <Link className="rel rv" to={`/services/${r.id}`} key={r.id}>
                {r.title} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
