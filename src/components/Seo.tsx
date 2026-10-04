import { useLayoutEffect } from 'react'
import { site } from '../data/site'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
}

/** Create or update a single <meta>/<link> in <head> so tags never duplicate the index.html defaults. */
function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}
const meta = (key: 'name' | 'property', name: string, content: string) =>
  upsert(`meta[${key}="${name}"]`, () => {
    const m = document.createElement('meta')
    m.setAttribute(key, name)
    return m
  }, 'content', content)

/** Per-page title, description, canonical and Open Graph / Twitter tags. */
export default function Seo({ title, description, path, image = '/images/og-carzenx.jpg' }: SeoProps) {
  useLayoutEffect(() => {
    const url = `${site.url}${path}`
    document.title = title
    meta('name', 'description', description)
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', `${site.url}${image}`)
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', description)
    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link')
      l.rel = 'canonical'
      return l
    }, 'href', url)
  }, [title, description, path, image])

  return null
}
