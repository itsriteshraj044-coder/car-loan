import { useRef } from 'react'
import { Network, Workflow, Gauge, Handshake } from 'lucide-react'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SectionTitle from '../components/SectionTitle'
import WordsReveal from '../components/WordsReveal'
import ImageReveal from '../components/ImageReveal'
import ProcessSection, { type ProcessStep } from '../components/ProcessSection'
import ServiceCard from '../components/ServiceCard'
import CTAButton from '../components/CTAButton'
import CTASection from '../components/CTASection'
import Img from '../components/Img'
import { services } from '../data/services'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import styles from './Home.module.css'

const benefits = [
  {
    icon: Network,
    title: 'Multiple financing connections',
    text: 'One conversation opens access to several lending partners, instead of approaching each bank or NBFC on your own.',
  },
  {
    icon: Workflow,
    title: 'A streamlined process',
    text: 'A clear sequence — requirement, options, documents, decision — with a single point of contact keeping it moving.',
  },
  {
    icon: Gauge,
    title: 'Automotive-focused expertise',
    text: 'We work only in car finance, so we understand dealer quotations, on-road pricing and new versus pre-owned paperwork.',
  },
  {
    icon: Handshake,
    title: 'DSA distribution network',
    text: 'A structured distribution model that links buyers and dealerships to lenders, with transparency on who decides what.',
  },
]

const steps: ProcessStep[] = [
  {
    title: 'Share your requirement',
    text: 'Tell us about the car you have in mind — new or pre-owned, budget and preferred tenure — with a few basic profile details.',
  },
  {
    title: 'Explore suitable finance options',
    text: 'We identify lending partners whose criteria fit your profile and help you understand the options they present.',
  },
  {
    title: 'Complete documentation',
    text: 'You get a clear checklist. We help you assemble a complete application and submit it to the lender you choose.',
  },
  {
    title: 'Move toward your vehicle',
    text: 'The lender completes its assessment and decision. On approval, disbursal happens directly from the lender — and you move closer to the keys.',
  },
]

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  useScrollAnimation(root)

  return (
    <div ref={root}>
      <Seo
        title="CARZENX | Car Loan Assistance & DSA Distributor"
        description="CARZENX is a car loan DSA distributor connecting car buyers and automotive dealers with suitable lending partners — with application support and documentation guidance for new and used car finance."
        path="/"
      />

      <Hero />

      {/* 1 — Trust / brand introduction */}
      <section className="section" aria-labelledby="intro-title">
        <div className={styles.intro}>
          <div className={styles.introCopy}>
            <SectionTitle
              eyebrow="Who we are"
              title={<span id="intro-title">Your bridge to smarter car financing.</span>}
            />
            <WordsReveal
              className={styles.statement}
              text="Finding the right car is exciting. Financing it shouldn’t be confusing. As a dedicated car loan DSA distributor, CARZENX sits between you and a network of lending partners — so you can compare options, prepare the right documents and move ahead with confidence."
            />
            <div className={styles.introMeta} data-reveal="stagger">
              <div>
                <h3>For car buyers</h3>
                <p>Guidance on new and used car finance, from first conversation to the lender’s decision.</p>
              </div>
              <div>
                <h3>For automotive dealers</h3>
                <p>A finance distribution partner that helps your customers access suitable lenders.</p>
              </div>
            </div>
            <div data-reveal>
              <CTAButton to="/about" variant="ghost">More about CARZENX</CTAButton>
            </div>
          </div>

          <div className={styles.introVisual}>
            <ImageReveal
              className={styles.introImg}
              name="keys-handover"
              alt="A customer and dealership representative shaking hands while exchanging car keys"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className={styles.introBadge} data-reveal>
              <strong>We assist. Lenders decide.</strong>
              <span>Clear roles, transparent process.</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={['New Car Loans', 'Used Car Loans', 'Application Support', 'Documentation Guidance', 'Dealer Finance', 'Lending Partner Network']} />

      {/* 2 — Why CARZENX */}
      <section className="section section--dark" aria-labelledby="why-title">
        <div className={styles.whyHead}>
          <SectionTitle
            eyebrow="Why CARZENX"
            title={<span id="why-title">Car finance, handled with focus.</span>}
            lead="We concentrate on one thing — helping people and dealerships navigate car finance — and we do it with clarity about our role and yours."
            layout="split"
          />
        </div>
        <div className={styles.whyGrid} data-reveal="stagger">
          {benefits.map((b, i) => (
            <article key={b.title} className={styles.why}>
              <span className={styles.whyIcon}><b.icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className={styles.whyNum}>0{i + 1}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3 — How it works */}
      <ProcessSection
        eyebrow="How it works"
        title="Four steps from requirement to keys."
        lead="A simple, guided path. We handle the coordination; the lending partner makes the credit decision."
        steps={steps}
      />

      {/* 4 — Services preview */}
      <section className="section section--mist" aria-labelledby="services-title">
        <div className={styles.servicesHead}>
          <SectionTitle eyebrow="Services" title={<span id="services-title">What we help you with.</span>} />
          <div data-reveal><CTAButton to="/services" variant="ghost">All services</CTAButton></div>
        </div>
        <div className={styles.servicesGrid} data-reveal="stagger">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      {/* 5 — Editorial automotive visual */}
      <section className={styles.editorial} aria-labelledby="editorial-title">
        <div className={styles.editorialMedia} data-parallax="0.16" aria-hidden="true">
          <Img name="editorial-tunnel" alt="" />
        </div>
        <div className={styles.editorialShade} aria-hidden="true" />
        <h2 id="editorial-title" className={styles.editorialTitle} data-reveal>
          Built for the <em>road</em> ahead.
        </h2>
        <div className={styles.editorialFoot} data-reveal="stagger">
          <div><strong>New or pre-owned</strong><span>Assistance for both, with the right paperwork for each.</span></div>
          <div><strong>Buyer or dealer</strong><span>Support for individuals and for dealerships’ customers.</span></div>
          <div><strong>One point of contact</strong><span>Someone who knows your application, from start to decision.</span></div>
        </div>
      </section>

      {/* 6 — CTA */}
      <CTASection />
    </div>
  )
}
