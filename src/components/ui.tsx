import { useLayoutEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import type { Service } from '../data/services'

/* ---------- Responsive image from /public/images ---------- */
export function Img({ name, alt, sizes = '100vw', eager = false }: { name: string; alt: string; sizes?: string; eager?: boolean }) {
  return (
    <img
      src={`/images/${name}-1600.webp`}
      srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      width={1600}
      height={1000}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

/* ---------- Logo ---------- */
export function Logo({ height = 44 }: { height?: number }) {
  return (
    <img
      src="/images/carzenx-logo-720.png"
      srcSet="/images/carzenx-logo-720.png 720w, /images/carzenx-logo.png 1453w"
      sizes={`${Math.round(height * 4.5)}px`}
      alt="Carzenx Pvt. Ltd. — Car Loan DSA Distributor"
      width={720}
      height={160}
      style={{ height, width: 'auto' }}
      decoding="async"
    />
  )
}

/* ---------- SEO ---------- */
function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}
export function Seo({ title, description, path }: { title: string; description: string; path: string }) {
  useLayoutEffect(() => {
    const url = `${site.url}${path}`
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', `${site.url}/images/og-carzenx.jpg`)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, path])
  return null
}

/* ---------- Section heading ---------- */
export function SectionHead({
  kicker,
  title,
  lead,
  variant,
  id,
}: {
  kicker: string
  title: ReactNode
  lead?: ReactNode
  variant?: 'split' | 'center'
  id?: string
}) {
  return (
    <div className={`sec-head ${variant ?? ''}`}>
      <div>
        <div className="kicker rv">{kicker}</div>
        <h2 className="t-h1 rv" id={id}>
          {title}
        </h2>
      </div>
      {lead && <p className="t-lead rv">{lead}</p>}
    </div>
  )
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  crumbs,
  title,
  sub,
  children,
  image,
  imageAlt,
  banner,
  chip,
  art,
}: {
  crumbs: { label: string; to?: string }[]
  title: ReactNode
  sub?: ReactNode
  children?: ReactNode
  image?: string
  imageAlt?: string
  /** Square artwork with its own text: shown whole, without the photo crop and bottom shade. */
  banner?: boolean
  chip?: { big: string; small: string }
  /** Artwork (e.g. an animated SVG) shown in place of a photo on the right. */
  art?: ReactNode
}) {
  return (
    <section className="ph">
      <div className={`wrap ph-grid ${image || art ? '' : 'solo'}`}>
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: 'contents' }}>
                <span aria-hidden="true">/</span>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
          <h1>{title}</h1>
          {sub && <p className="ph-sub">{sub}</p>}
          {children}
        </div>
        {art && !image && <div className="ph-art">{art}</div>}
        {image && (
          <div className={banner ? 'ph-media banner' : 'ph-media'}>
            <Img name={image} alt={imageAlt ?? ''} sizes="(max-width: 900px) 100vw, 45vw" eager />
            {chip && (
              <div className="ph-chip">
                <b>{chip.big}</b>
                <span>{chip.small}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------- Service card ---------- */
export function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  const Icon = s.icon
  return (
    <article className="sv rv" style={{ transitionDelay: `${delay}s` }}>
      <div className="sv-top">
        <div className="sv-ic">
          <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <div className="sv-n" aria-hidden="true">
          {s.index}
        </div>
      </div>
      <h3 className="t-h3">{s.title}</h3>
      <p>{s.short}</p>
      <div className="meta">
        {s.tags.map((t) => (
          <span className="tag b" key={t}>
            {t}
          </span>
        ))}
      </div>
      <Link className="sv-l" to={s.id === 'dealer-distributorship' ? '/dealer-network' : `/services/${s.id}`}>
        Learn more <span className="sr-only">about {s.title}</span>
        <span className="arr" aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  )
}

/* ---------- Four-step timeline ---------- */
export function Steps({ steps }: { steps: { t: string; d: string }[] }) {
  return (
    <div className="tl">
      {steps.map((s, i) => (
        <div className="stp rv" key={s.t} style={{ transitionDelay: `${i * 0.15}s` }}>
          <div className="stp-n" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3>{s.t}</h3>
          <p>{s.d}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items, idPrefix = 'q' }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="acc">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <div className={`ai ${isOpen ? 'open' : ''}`} key={f.q}>
            <h3>
              <button
                className="aq"
                id={`${idPrefix}${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{f.q}</span>
                <i className="pm" aria-hidden="true" />
              </button>
            </h3>
            <div className="aa" id={`${idPrefix}a${i}`} role="region" aria-labelledby={`${idPrefix}${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Closing call to action ---------- */
export function CtaBand({
  title = 'Your next car starts with the right finance conversation.',
  text = 'Whether you are buying a car or building an automotive business, talk to Carzenx Pvt. Ltd. and find the right way forward.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="cta">
      <div className="wrap">
        <h2 className="rv">{title}</h2>
        <p className="rv">{text}</p>
        <div className="cta-b rv">
          <Link to="/apply" className="btn btn-white btn-lg">
            Apply now <span className="arr">→</span>
          </Link>
          <a href={site.phone.href} className="btn btn-ghost btn-lg">
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}

