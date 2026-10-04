import type { ElementType } from 'react'

/** Paragraph whose words brighten progressively on scroll (wired by useScrollAnimation's `data-words`). */
export default function WordsReveal({ text, as: Tag = 'p', className }: { text: string; as?: ElementType; className?: string }) {
  return (
    <Tag className={className} data-words>
      {text.split(' ').map((w, i) => (
        <span className="w" key={i}>
          {w}{' '}
        </span>
      ))}
    </Tag>
  )
}
