import Seo from '../components/Seo'
import CTAButton from '../components/CTAButton'

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ minHeight: '80vh', display: 'grid', alignContent: 'center', gap: '2rem', paddingTop: 'calc(var(--header-h) + 4rem)' }}
    >
      <Seo title="Page not found | CARZENX" description="The page you were looking for could not be found." path="/404" />
      <span className="eyebrow">Error 404</span>
      <h1 style={{ fontSize: 'var(--fs-display)', maxWidth: '14ch' }}>
        Wrong turn<span className="text-red">.</span> Let’s get you back on the road.
      </h1>
      <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
        <CTAButton to="/">Back to home</CTAButton>
        <CTAButton to="/contact" variant="ghost">Contact us</CTAButton>
      </div>
    </section>
  )
}
