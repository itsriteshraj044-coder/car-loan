import { partners, type Partner } from '../data/partners'

/** Repeat the list so each marquee row is wide enough to loop seamlessly. */
function fill(list: Partner[], min: number) {
  if (!list.length) return []
  const out: Partner[] = []
  while (out.length < min) out.push(...list)
  return out
}

function Row({ items, unique, reverse }: { items: Partner[]; unique: number; reverse?: boolean }) {
  return (
    <div className={`lg-row ${reverse ? 'rev' : ''}`}>
      <div className="lg-track" style={{ animationDuration: `${items.length * 4.5}s` }}>
        {[0, 1].map((g) => (
          <ul className="lg-grp" key={g} aria-hidden={g === 1}>
            {items.map((p, i) => (
              <li className="lg" key={`${p.name}-${i}`}>
                <img src={p.logo} alt={g === 0 && i < unique ? `${p.name} logo` : ''} loading="lazy" decoding="async" width={200} height={62} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function PartnerMarquee() {
  if (!partners.length) return null
  // Split into two rows once there are enough logos; otherwise one row.
  const two = partners.length >= 12
  const half = Math.ceil(partners.length / 2)
  const a = two ? partners.slice(0, half) : partners
  const b = two ? partners.slice(half) : []
  return (
    <div className="lg-wrap rv" role="region" aria-label="Our lending partners">
      <Row items={fill(a, 10)} unique={a.length} />
      {two && <Row items={fill(b, 10)} unique={b.length} reverse />}
    </div>
  )
}
