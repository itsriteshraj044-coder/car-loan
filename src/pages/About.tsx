import { Link } from 'react-router-dom'
import { Check, Eye, Gem, MapPin, Target } from 'lucide-react'
import { site } from '../data/site'
import { CtaBand, Img, PageHero, SectionHead, Seo } from '../components/ui'

export default function About() {
  return (
    <>
      <Seo
        title="About Carzenx Pvt. Ltd. | Car Loan DSA Distributor Since 2017"
        description="Carzenx Pvt. Ltd. is a pan-India car loan DSA distributor, working since 2017 with buyers, dealers, distributors and banks. Meet our directors and learn how we work."
        path="/about"
      />
      <PageHero
        crumbs={[{ label: 'About' }]}
        title="Making car finance simple, since 2017."
        sub="Carzenx Pvt. Ltd. started with a simple idea: buying a car should not stall at the finance stage. Today we connect buyers, dealers and lending partners across India."
        image="drone-road"
        imageAlt="Aerial view of a road winding through Mumbai"
        chip={{ big: String(site.since), small: 'Working pan-India since' }}
      />

      <section className="sec">
        <div className="wrap two">
          <div className="photo rv" style={{ aspectRatio: '4/4.2' }}>
            <Img name="dealership-couple" alt="Two people reviewing paperwork at an office desk" sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="badge"><b>Pan-India</b><span>Head branch in Mumbai</span></div>
          </div>
          <div>
            <div className="kicker rv">Our story</div>
            <h2 className="t-h1 rv">A finance partner for the whole car journey.</h2>
            <div className="prose-p rv" style={{ marginTop: 20 }}>
              <p>
                Car buyers often find the car they want and then lose days chasing lenders, documents and RTO work. Dealers lose
                sales when finance falls through at the last step. Lenders receive incomplete files.
              </p>
              <p>
                Carzenx Pvt. Ltd. was built to fix that middle step. As a Direct Selling Agent we work alongside buyers, dealers and
                partner banks such as Axis Bank and ICICI Bank, preparing complete applications and following them through to
                disbursal and the RTO.
              </p>
            </div>
            <ul className="check rv">
              <li><Check size={20} aria-hidden="true" />New, used, refinance and BT top-up loans</li>
              <li><Check size={20} aria-hidden="true" />Loan + RTO coordination in one place</li>
              <li><Check size={20} aria-hidden="true" />Distributorship for dealers and partners</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-grey">
        <div className="wrap">
          <SectionHead kicker="What drives us" title="Mission, vision and values." variant="split" lead="The principles behind every file we prepare." />
          <div className="mvv">
            {[
              { i: Target, t: 'Mission', d: 'To make car finance clear, quick and well-organised for every buyer and dealer we work with.' },
              { i: Eye, t: 'Vision', d: 'To be a trusted name in automotive finance distribution across India.' },
              { i: Gem, t: 'Values', d: 'Transparency about our role and the lender’s, complete paperwork, and honest timelines.' },
            ].map((m, i) => {
              const Icon = m.i
              return (
                <article className="tile rv" key={m.t} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="ic"><Icon size={24} aria-hidden="true" /></div>
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <SectionHead kicker="Clear roles" title="What we do, and what the lender does." variant="split" lead="Knowing who decides what avoids surprises later." />
          <div className="roles">
            <div className="role us rv">
              <span className="tag b">Carzenx Pvt. Ltd.</span>
              <h3>What we do</h3>
              <ul>
                {['Understand your requirement and profile', 'Suggest suitable lending partners', 'Prepare and submit a complete application', 'Follow up until disbursal', 'Coordinate RTO formalities'].map((x) => (
                  <li key={x}><Check size={18} aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="role rv" style={{ transitionDelay: '.1s' }}>
              <span className="tag">LENDING PARTNER</span>
              <h3>What the lender does</h3>
              <ul>
                {['Assesses eligibility and credit history', 'Decides approval and loan amount', 'Sets the interest rate, fees and tenure', 'Signs the loan agreement with you', 'Disburses and collects repayments'].map((x) => (
                  <li key={x}><Check size={18} aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="Leadership" title="The people behind Carzenx Pvt. Ltd." lead={`Carzenx Pvt. Ltd. is led by its directors, who have built and guided the business pan-India since ${site.since}.`} variant="split" />
          <div className="people">
            {site.directors.map((d, i) => (
              <article className="person rv" key={d.name} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="mono" aria-hidden="true">{d.initials}</div>
                <h3>{d.name}</h3>
                <p>{d.role}</p>
              </article>
            ))}
            <article className="person hq rv" style={{ transitionDelay: '.16s' }}>
              <div className="mono" aria-hidden="true"><MapPin size={28} /></div>
              <h3>Mumbai, Maharashtra</h3>
              <p>Head branch, serving buyers and partners across India.</p>
              <Link to="/contact" className="btn btn-blue btn-sm" style={{ marginTop: 20 }}>Contact us</Link>
            </article>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
