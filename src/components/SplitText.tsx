import { Fragment, type ElementType } from 'react'

interface SplitTextProps {
  /** each entry renders as its own line */
  lines: string[]
  as?: ElementType
  className?: string
  /** words (exact match, punctuation stripped) to render in the brand accent class */
  accent?: Record<string, string>
}

/**
 * Splits text into masked words (`.split-word > .split-inner`) so GSAP can slide
 * each word up from behind its mask. Screen readers get the plain sentence.
 */
export default function SplitText({ lines, as: Tag = 'h1', className, accent = {} }: SplitTextProps) {
  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, arr) => {
            const cls = accent[word.replace(/[.,!?]/g, '')]
            return (
              <Fragment key={wi}>
                <span className="split-word">
                  <span className={`split-inner ${cls ?? ''}`}>{word}</span>
                </span>
                {wi < arr.length - 1 && ' '}
              </Fragment>
            )
          })}
          {li < lines.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
