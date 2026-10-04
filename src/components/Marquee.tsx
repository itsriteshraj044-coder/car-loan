import styles from './Marquee.module.css'

/** Infinite capability ticker. Pure CSS animation; pauses on hover and for reduced motion. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className={styles.item}>
          {t}
          <span className={styles.x} aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
