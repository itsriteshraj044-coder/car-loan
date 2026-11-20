import { Link } from 'react-router-dom'
import { services } from '../data/services'
import EmiCalculator from '../components/EmiCalculator'
import { CtaBand, PageHero, SectionHead, Seo, ServiceCard } from '../components/ui'

export default function Services() {
  return (
    <>
      <Seo
        title="Car Loan Products | New, Used, Refinance, BT Top-up | CARZENX"
        description="Compare CARZENX car finance products: new car loans (5–7 years), used car loans (5–6 years), car refinance, BT top-up, Loan + RTO services and dealer distributorship."
        path="/services"
      />
      <PageHero
        crumbs={[{ label: 'Loans' }]}
        title="Car finance for every stage of ownership."
        sub="Buying new, buying pre-owned, raising funds against your car or moving a running loan: pick the product that fits and we will match it with suitable partner banks."
        image="aerial-road"
        imageAlt="Mumbai’s sea link lit up at night"
        chip={{ big: '6', small: 'Finance and partnership services' }}
      >
        <div className="hero-cta">
          <Link to="/apply" className="btn btn-blue btn-lg">Check eligibility <span className="arr">→</span></Link>
          <a href="#emi" className="btn btn-ghost btn-lg">EMI calculator</a>
        </div>
      </PageHero>

      <section className="sec sec-grey">
        <div className="wrap">
          <SectionHead kicker="Products" title="Choose your loan." lead="Every product includes documentation guidance and one point of contact." variant="split" />
          <div className="svc-grid">
            {services.map((s, i) => (
              <ServiceCard s={s} key={s.id} delay={(i % 3) * 0.08} />
            ))}
          </div>
          <p className="svc-note rv">Tenures are indicative and subject to lender eligibility, terms and approval.</p>
        </div>
      </section>

      <section className="sec" id="emi">
        <div className="wrap">
          <SectionHead kicker="EMI calculator" title="Plan your monthly budget." lead="An estimate to help you decide. The lender sets the final rate and tenure." variant="split" />
          <EmiCalculator />
        </div>
      </section>

      <CtaBand title="Not sure which loan fits?" text="Tell us what you are planning and our team will suggest the right product and lenders." />
    </>
  )
}
