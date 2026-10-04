import Img from './Img'
import CTAButton from './CTAButton'
import styles from './CTASection.module.css'

interface CTASectionProps {
  eyebrow?: string
  title?: string
  text?: string
}

export default function CTASection({
  eyebrow = 'Start the conversation',
  title = 'Ready to move forward?',
  text = 'Tell us about the car you have in mind. Our team will help you understand your finance options with our lending partners and guide you through the paperwork.',
}: CTASectionProps) {
  // scroll reveals are wired by the host page's useScrollAnimation
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.bg} data-parallax="0.14" aria-hidden="true">
        <Img name="aerial-road" alt="" sizes="100vw" />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <span className={styles.slash} aria-hidden="true" />

      <div className={styles.inner}>
        <div>
          <span className="eyebrow" style={{ color: '#fff' }} data-reveal>{eyebrow}</span>
          <h2 id="cta-title" className={styles.title} data-reveal>{title}</h2>
        </div>
        <div className={styles.side}>
          <p className={styles.text} data-reveal>{text}</p>
          <div className={styles.buttons} data-reveal>
            <CTAButton to="/contact">Get Started</CTAButton>
            <CTAButton to="/services" variant="ghostDark">View Services</CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
