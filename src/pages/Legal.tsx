import { legal, type LegalKey } from '../data/legal'
import { PageHero, Seo } from '../components/ui'

const paths: Record<LegalKey, string> = {
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  disclaimer: '/disclaimer',
}

export default function Legal({ doc }: { doc: LegalKey }) {
  const d = legal[doc]
  return (
    <>
      <Seo title={`${d.title} | CARZENX`} description={`${d.title} for the CARZENX website and car loan DSA services.`} path={paths[doc]} />
      <PageHero crumbs={[{ label: d.title }]} title={d.title} />
      <section className="sec">
        <div className="wrap">
          <article className="prose">
            <p className="upd">Last updated: 20 November 2026</p>
            <div dangerouslySetInnerHTML={{ __html: d.html }} />
          </article>
        </div>
      </section>
    </>
  )
}
