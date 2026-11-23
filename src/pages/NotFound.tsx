import { Link } from 'react-router-dom'
import { Seo } from '../components/ui'

export default function NotFound() {
  return (
    <section className="nf">
      <Seo title="Page not found | Carzenx Pvt. Ltd." description="The page you are looking for does not exist." path="/404" />
      <div className="wrap">
        <p className="big" aria-hidden="true">404</p>
        <h1>Wrong turn.</h1>
        <p>This page does not exist or has moved. Let’s get you back on the road.</p>
        <div className="row">
          <Link to="/" className="btn btn-blue btn-lg">Back to home</Link>
          <Link to="/services" className="btn btn-line btn-lg">Explore loans</Link>
        </div>
      </div>
    </section>
  )
}
