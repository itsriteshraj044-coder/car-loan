import { Link } from 'react-router-dom'

/** The official CARZENX logo — always rendered at its native aspect ratio, never recoloured. */
export default function Logo({ className, height = 44, link = true }: { className?: string; height?: number; link?: boolean }) {
  const img = (
    <img
      src="/images/carzenx-logo-720.png"
      srcSet="/images/carzenx-logo-720.png 720w, /images/carzenx-logo.png 1479w"
      sizes={`${Math.round(height * 4.226)}px`}
      alt="CARZENX — Car Loan • DSA Distributor"
      width={1479}
      height={350}
      style={{ height, width: 'auto', aspectRatio: '1479 / 350' }}
      decoding="async"
    />
  )
  if (!link) return <span className={className}>{img}</span>
  return (
    <Link to="/" className={className} aria-label="CARZENX home">
      {img}
    </Link>
  )
}
