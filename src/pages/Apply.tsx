import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock, Lock, ShieldCheck } from 'lucide-react'
import { findService } from '../data/services'
import { PageHero, Seo } from '../components/ui'
import ContactForm, { needFor } from '../components/ContactForm'
import { GaugeArt } from '../components/CarArt'
import { useEngineRev } from '../hooks/useEngineRev'

/** Speedometer for the hero: revs to the red line once when the page opens, and again on hover. */
function HeroGauge() {
  const rev = useEngineRev()
  const { blip } = rev
  useEffect(() => {
    let stop = () => {}
    const t = window.setTimeout(() => (stop = blip(1100)), 450)
    return () => {
      window.clearTimeout(t)
      stop()
    }
  }, [blip])
  return (
    <div className="ph-gauge" {...rev.bind}>
      <GaugeArt className="" viewBox="150 25 300 300" needleRef={rev.needleRef} arcRef={rev.arcRef} />
    </div>
  )
}

export default function Apply() {
  const [params] = useSearchParams()
  const loan = params.get('loan')
  const svc = needFor(loan) ? findService(loan ?? '') : undefined
  const tag = { background: 'rgba(255,255,255,.1)', color: '#fff' }

  return (
    <>
      <Seo
        title={svc ? `Apply for ${svc.title} | Carzenx Pvt. Ltd.` : 'Apply for a Car Loan | Carzenx Pvt. Ltd.'}
        description="Apply for a new car loan, used car loan, refinance, BT top-up or Loan + RTO services with Carzenx Pvt. Ltd. Takes about two minutes."
        path="/apply"
      />
      <PageHero
        crumbs={svc ? [{ label: svc.title, to: `/services/${svc.id}` }, { label: 'Apply' }] : [{ label: 'Apply' }]}
        title={svc ? `Apply for ${svc.title}.` : 'Check your car loan options.'}
        sub="One short form, about two minutes. Our team will call you to explain suitable lenders and the documents you need."
        art={svc ? <HeroGauge /> : undefined}
      >
        <div className="tags" style={{ marginTop: 26 }}>
          <span className="tag" style={tag}><Clock size={12} style={{ display: 'inline', marginRight: 6 }} />2 minutes</span>
          <span className="tag" style={tag}><Lock size={12} style={{ display: 'inline', marginRight: 6 }} />No documents now</span>
          <span className="tag" style={tag}><ShieldCheck size={12} style={{ display: 'inline', marginRight: 6 }} />No credit check to enquire</span>
        </div>
      </PageHero>

      <section className="sec sec-grey" id="apply-form">
        <div className="wrap">
          {/* Same form as the Contact page; a loan page's requirement arrives pre-selected */}
          <ContactForm key={loan ?? ''} preset={loan} />
          <p className="t-small" style={{ marginTop: 20 }}>
            Carzenx Pvt. Ltd. is a DSA, not a lender. Submitting this form does not guarantee a loan; the lender decides approval and terms.
          </p>
        </div>
      </section>
    </>
  )
}
