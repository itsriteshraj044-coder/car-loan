import { useRef } from 'react'
import { Check } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import ImageReveal from '../components/ImageReveal'
import ProcessSection, { type ProcessStep } from '../components/ProcessSection'
import CTASection from '../components/CTASection'
import CTAButton from '../components/CTAButton'
import Img from '../components/Img'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import styles from './About.module.css'

const dsaSteps: ProcessStep[] = [
  {
    title: 'You or your dealer',
    text: 'A car buyer — directly or through a partner dealership — shares their vehicle and finance requirement with CARZENX.',
  },
  {
    title: 'CARZENX (the DSA)',
    text: 'We understand the requirement, guide documentation and route a complete application to suitable lending partners.',
  },
  {
    title: 'Lending partner',
    text: 'The bank or NBFC independently assesses eligibility, verifies documents and decides on approval, rate and terms.',
  },
  {
    title: 'Disbursal & ownership',
    text: 'On approval, the lender disburses directly — typically to the dealer or seller — and the borrower repays the lender directly.',
  },
]

const weDo = [
  'Understand your vehicle and finance requirement',
  'Introduce suitable lending partners',
  'Guide and check your documentation',
  'Submit and track your application',
  'Keep you and your dealer informed',
]
const lenderDoes = [
  'Assesses eligibility and credit profile',
  'Verifies documents and KYC',
  'Decides approval, interest rate and terms',
  'Disburses the loan directly',
  'Collects repayments directly from the borrower',
]

export default function About() {
  const root = useRef<HTMLDivElement>(null)
  useScrollAnimation(root)

  return (
    <div ref={root}>
      <Seo
        title="About CARZENX | Car Loan DSA Distributor"
        description="Learn how CARZENX works as a car loan DSA distributor — connecting car buyers and dealerships with suitable lending partners, with transparency on every role in the process."
        path="/about"
      />

      <PageHero
        crumb="About"
        lines={['Built around the', 'journey to your', 'next car.']}
        accent={{ journey: 'text-red' }}
        lead="CARZENX is a car loan and DSA distribution company focused on one thing: making car finance clearer and easier to navigate for buyers and automotive dealers."
        image="mountain-highway"
        imageAlt="An SUV driving along a winding mountain highway at sunset"
        footLeft="About CARZENX"
        footRight="Car Loan · DSA Distributor"
      />

      {/* Who we are / what we do */}
      <section className="section" aria-labelledby="who-title">
        <div className={styles.who}>
          <div className={styles.whoCopy}>
            <SectionTitle eyebrow="Who we are" title={<span id="who-title">A focused partner in car finance.</span>} />
            <p className="lead" data-reveal>
              For most people, a car is one of the largest purchases they make — and the finance behind it matters as much as
              the car itself.
            </p>
            <p data-reveal>
              CARZENX works as a Direct Selling Agent (DSA) distributor for car loans. We help individuals and dealership
              customers understand their options, prepare complete applications and connect with lending partners whose
              criteria suit their profile. We don’t lend money ourselves — we make the path to the right lender clearer, faster
              and better organised.
            </p>
            <div data-reveal><CTAButton to="/services" variant="ghost">Explore our services</CTAButton></div>
          </div>
          <ImageReveal
            className={styles.whoImg}
            name="dealership-couple"
            alt="A couple discussing a new car purchase with a consultant inside a modern dealership"
            sizes="(max-width: 900px) 100vw, 55vw"
            from="right"
          />
        </div>
      </section>

      {/* How the DSA model works */}
      <ProcessSection
        dark
        eyebrow="The DSA model"
        title="How DSA distribution works."
        lead="A Direct Selling Agent is authorised by banks and NBFCs to source and support loan applications. Here’s how the pieces fit together — and who is responsible for what."
        steps={dsaSteps}
      >
        <div className={styles.roles} data-reveal="stagger">
          <div className={styles.role}>
            <div className={styles.roleHead}>
              <span className={`${styles.roleTag} ${styles.blue}`}>CARZENX</span>
              <h3>What we do</h3>
            </div>
            <ul className={styles.roleList}>
              {weDo.map((t) => <li key={t}><Check size={16} aria-hidden="true" />{t}</li>)}
            </ul>
          </div>
          <div className={styles.role}>
            <div className={styles.roleHead}>
              <span className={styles.roleTag}>Lender</span>
              <h3>What the lender does</h3>
            </div>
            <ul className={styles.roleList}>
              {lenderDoes.map((t) => <li key={t}><Check size={16} aria-hidden="true" />{t}</li>)}
            </ul>
          </div>
        </div>
      </ProcessSection>

      {/* Why automotive finance matters */}
      <section className="section" aria-labelledby="matters-title">
        <div className={styles.matters}>
          <ImageReveal
            className={styles.mattersImg}
            name="steering-hands"
            alt="A driver’s hands on the steering wheel of a modern car"
            sizes="(max-width: 900px) 100vw, 50vw"
            from="left"
          />
          <div className={styles.mattersCopy}>
            <SectionTitle eyebrow="Why it matters" title={<span id="matters-title">The right finance shapes the whole ownership experience.</span>} />
            <p data-reveal>
              A car loan spreads the cost of a vehicle over time, making ownership accessible without depleting savings. But the
              structure of that loan — its tenure, charges and conditions — stays with you for years.
            </p>
            <ul className={styles.points} data-reveal="stagger">
              <li><span>01</span><div><strong>Informed choices</strong>Understanding options before committing avoids surprises later.</div></li>
              <li><span>02</span><div><strong>Complete applications</strong>Correct paperwork reduces delays and repeated requests.</div></li>
              <li><span>03</span><div><strong>Clear accountability</strong>Knowing who decides what builds trust in the process.</div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section section--mist" aria-labelledby="mvv-title">
        <SectionTitle
          eyebrow="What drives us"
          title={<span id="mvv-title">Mission, vision &amp; values.</span>}
          lead="The principles behind every conversation we have with a customer or a partner."
          layout="split"
        />
        <div className={styles.mvv} data-reveal="stagger">
          <article className={styles.mvvCard}>
            <div className={styles.mvvLabel}><span>Mission</span><span>01</span></div>
            <div>
              <h3>Make car finance clear, guided and accessible.</h3>
              <p>To help every customer and dealer partner navigate car finance with honest guidance, organised documentation and access to suitable lending partners.</p>
            </div>
          </article>
          <article className={`${styles.mvvCard} ${styles.featured}`}>
            <div className={styles.mvvLabel}><span>Vision</span><span>02</span></div>
            <div>
              <h3>To be a trusted name in automotive finance distribution.</h3>
              <p>A modern DSA partner known for transparency, responsiveness and a genuinely customer-first approach.</p>
            </div>
          </article>
          <article className={styles.mvvCard}>
            <div className={styles.mvvLabel}><span>Values</span><span>03</span></div>
            <div>
              <h3>What we hold ourselves to.</h3>
              <ul>
                <li>Transparency about our role and the lender’s</li>
                <li>Integrity — no promises we can’t keep</li>
                <li>Responsiveness at every stage</li>
                <li>Respect for your data and consent</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Customer-focused / partner-focused */}
      <section className={styles.audiences} aria-label="Who we serve">
        <article className={styles.panel}>
          <div className={styles.panelMedia} aria-hidden="true"><Img name="sedan-twilight" alt="" sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <span className="eyebrow" style={{ color: '#fff' }} data-reveal>Customer-focused</span>
          <h2 data-reveal>Your car, your terms, your pace.</h2>
          <p data-reveal>
            We start with what you need — the car, the budget, the timeline — and guide you through options and paperwork
            without pressure. You get clear explanations and a single point of contact.
          </p>
          <ul data-reveal><li>Salaried</li><li>Self-employed</li><li>First-time buyers</li><li>Upgraders</li></ul>
        </article>
        <article className={styles.panel}>
          <div className={styles.panelMedia} aria-hidden="true"><Img name="dealer-showroom" alt="" sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <span className="eyebrow" style={{ color: '#fff' }} data-reveal>Partner-focused</span>
          <h2 data-reveal>Finance that supports the sale.</h2>
          <p data-reveal>
            For dealerships and lending partners, we aim to be a dependable distribution partner — submitting well-prepared
            applications and keeping everyone informed, so finance helps deals move forward.
          </p>
          <ul data-reveal><li>Dealerships</li><li>Banks</li><li>NBFCs</li><li>Showroom finance desks</li></ul>
        </article>
      </section>

      <CTASection title="Let’s plan your next car." eyebrow="Talk to CARZENX" />
    </div>
  )
}
