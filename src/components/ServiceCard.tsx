import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../data/services'
import styles from './ServiceCard.module.css'

const MotionLink = motion.create(Link)

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <MotionLink
      to={`/services#${service.id}`}
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
    >
      <div className={styles.top}>
        <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className={styles.index}>{service.index}</span>
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.text}>{service.short}</p>
      <span className={styles.more}>
        Learn more
        <span className={styles.arrow} aria-hidden="true"><ArrowRight size={16} /></span>
      </span>
    </MotionLink>
  )
}
