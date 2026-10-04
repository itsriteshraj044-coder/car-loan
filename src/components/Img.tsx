interface ImgProps {
  /** base name inside /public/images, e.g. "showroom-white" → showroom-white-800.webp / -1600.webp */
  name: string
  alt: string
  sizes?: string
  eager?: boolean
  className?: string
}

/** Responsive, lazy WebP image. Containers control aspect ratio; the image always covers. */
export default function Img({ name, alt, sizes = '100vw', eager = false, className }: ImgProps) {
  return (
    <img
      className={className}
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
