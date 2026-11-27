import { useMemo, type Ref } from 'react'

/* Car artwork and animations from the Carzenx Pvt. Ltd. design files, ported to React. */

const CAR_BODY =
  'M28 152C26 138 32 124 52 118C90 110 140 104 182 90C220 74 262 56 318 52C372 49 416 60 448 82C466 94 520 104 566 112C598 118 618 132 616 152Z'
const CAR_LINE = 'M52 118C90 110 140 104 182 90C220 74 262 56 318 52C372 49 416 60 448 82C466 94 520 104 566 112'
const CAR_GLASS = 'M196 92C226 76 266 62 316 60C366 58 402 66 430 88Z'

/** Shared gradients, filters and the spinning wheel. Render once per page that uses car art. */
export function CarDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#262f4d" /><stop offset=".45" stopColor="#0e1220" /><stop offset="1" stopColor="#05070c" /></linearGradient>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a4cc4" stopOpacity=".6" /><stop offset="1" stopColor="#070a14" /></linearGradient>
        <linearGradient id="cr" x1="0" x2="1"><stop offset="0" stopColor="#1248FF" stopOpacity="0" /><stop offset=".3" stopColor="#6F8DFF" /><stop offset=".7" stopColor="#9DB4FF" /><stop offset="1" stopColor="#1248FF" stopOpacity="0" /></linearGradient>
        <linearGradient id="cbm" gradientUnits="userSpaceOnUse" x1="606" x2="930" y1="0" y2="0"><stop offset="0" stopColor="#9DB4FF" stopOpacity=".5" /><stop offset="1" stopColor="#9DB4FF" stopOpacity="0" /></linearGradient>
        <radialGradient id="ug"><stop offset="0" stopColor="#1248FF" stopOpacity=".8" /><stop offset="1" stopColor="#1248FF" stopOpacity="0" /></radialGradient>
        <filter id="bl" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
        <g id="wh">
          <circle r="32" fill="#04060a" />
          <circle r="26" fill="none" stroke="#1b2442" strokeWidth="2" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.9s" repeatCount="indefinite" />
            <circle r="22" fill="#0d1226" stroke="#2f44a0" strokeWidth="2.5" />
            <path d="M0-17V17M-14.7-8.5L14.7 8.5M-14.7 8.5L14.7-8.5" stroke="#3a56c8" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="0" cy="-19" r="2.6" fill="#9DB4FF" />
            <circle cx="14" cy="9" r="1.7" fill="#9DB4FF" />
            <circle r="5" fill="#1248FF" />
          </g>
        </g>
      </defs>
    </svg>
  )
}

/** Night city, street lights, road with moving lane markings and light streaks. */
export function HeroBg() {
  const { buildings, windows, bokeh, poles } = useMemo(() => {
    let s = 7
    const r = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    const buildings: { x: number; y: number; w: number; h: number; fill: string }[] = []
    const windows: { x: number; y: number; fill: string }[] = []
    let x = -20
    while (x < 1650) {
      const w = 34 + r() * 70
      const h = 50 + r() * 190
      buildings.push({ x, y: 640 - h, w, h, fill: r() > 0.5 ? '#0a1126' : '#070c1c' })
      for (let i = 0; i < Math.floor(w / 14); i++)
        for (let j = 0; j < Math.floor(h / 22); j++)
          if (r() > 0.82) windows.push({ x: x + 6 + i * 14, y: 640 - h + 8 + j * 22, fill: r() > 0.7 ? '#7C9BFF' : '#cfd8ff' })
      x += w + r() * 8
    }
    const bokeh = Array.from({ length: 20 }, () => {
      const q = r()
      return { cx: r() * 1600, cy: 540 + r() * 150, r: 8 + r() * 20, fill: q > 0.9 ? '#FF1825' : q > 0.45 ? '#7C9BFF' : '#fff', o: 0.1 + r() * 0.18 }
    })
    const poles = Array.from({ length: 7 }, (_, i) => -400 + i * 400)
    return { buildings, windows, bokeh, poles }
  }, [])

  return (
    <div className="hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#03050a" /><stop offset=".6" stopColor="#060c1f" /><stop offset="1" stopColor="#0b1d5c" /></linearGradient>
          <radialGradient id="glowH"><stop offset="0" stopColor="#1248FF" stopOpacity=".5" /><stop offset="1" stopColor="#1248FF" stopOpacity="0" /></radialGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1020" /><stop offset="1" stopColor="#030407" /></linearGradient>
          <radialGradient id="lamp"><stop offset="0" stopColor="#cfdcff" stopOpacity=".55" /><stop offset=".35" stopColor="#4d73ff" stopOpacity=".2" /><stop offset="1" stopColor="#1248FF" stopOpacity="0" /></radialGradient>
          <linearGradient id="guard" x1="0" x2="1"><stop offset="0" stopColor="#1248FF" stopOpacity="0" /><stop offset=".5" stopColor="#4d73ff" stopOpacity=".9" /><stop offset="1" stopColor="#1248FF" stopOpacity="0" /></linearGradient>
          <linearGradient id="sB" x1="0" x2="1"><stop offset="0" stopColor="#4d73ff" stopOpacity="0" /><stop offset="1" stopColor="#8fa9ff" /></linearGradient>
          <linearGradient id="sR" x1="0" x2="1"><stop offset="0" stopColor="#FF1825" stopOpacity="0" /><stop offset="1" stopColor="#FF1825" stopOpacity=".9" /></linearGradient>
          <linearGradient id="sW" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".8" /></linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sky)" />
        <ellipse cx="1050" cy="640" rx="900" ry="260" fill="url(#glowH)" />
        <g>
          {buildings.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.fill} />)}
          {windows.map((w, i) => <rect key={i} x={w.x} y={w.y} width="4" height="6" fill={w.fill} fillOpacity=".35" />)}
        </g>
        <g style={{ filter: 'blur(3px)' }}>
          {bokeh.map((b, i) => <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} fillOpacity={b.o} />)}
        </g>
        <g className="poles">
          {poles.map((px) => (
            <g key={px}>
              <rect x={px} y="330" width="5" height="310" fill="#0a1022" />
              <path d={`M${px + 2.5} 334Q${px + 40} 318 ${px + 78} 336`} stroke="#0a1022" strokeWidth="4" fill="none" />
              <circle cx={px + 78} cy="338" r="70" fill="url(#lamp)" />
              <circle cx={px + 78} cy="338" r="3.5" fill="#fff" />
              <ellipse cx={px + 78} cy="652" rx="130" ry="14" fill="url(#lamp)" opacity=".4" />
            </g>
          ))}
        </g>
        <rect y="640" width="1600" height="260" fill="url(#road)" />
        <rect y="637" width="1600" height="3" fill="url(#guard)" />
        <line x1="0" x2="1600" y1="690" y2="690" stroke="#fff" strokeOpacity=".07" strokeWidth="2" />
        <line className="dash" x1="-60" x2="1660" y1="805" y2="805" stroke="#fff" strokeOpacity=".32" strokeWidth="7" strokeDasharray="140 100" />
        <rect className="st" x="-600" y="672" width="420" height="3" fill="url(#sB)" style={{ animationDuration: '3.4s' }} />
        <rect className="st" x="-900" y="722" width="520" height="2" fill="url(#sW)" style={{ animationDuration: '4.6s', animationDelay: '-1.2s' }} />
        <rect className="st" x="-500" y="760" width="360" height="3" fill="url(#sR)" style={{ animationDuration: '5.4s', animationDelay: '-2.5s' }} />
        <rect className="st" x="-800" y="842" width="560" height="4" fill="url(#sB)" style={{ animationDuration: '2.8s', animationDelay: '-.8s' }} />
        <rect className="st" x="-700" y="868" width="440" height="2" fill="url(#sW)" style={{ animationDuration: '3.9s', animationDelay: '-2.2s' }} />
      </svg>
    </div>
  )
}

/** The driving car: spinning wheels, headlight beam, gentle bob. */
export function HeroCar() {
  return (
    <div className="hero-car" aria-hidden="true">
      <svg className="car-svg" viewBox="0 0 640 210">
        <ellipse cx="320" cy="190" rx="340" ry="16" fill="url(#ug)" />
        <ellipse cx="320" cy="185" rx="290" ry="6" fill="#000" opacity=".65" />
        <g transform="translate(640 0) scale(-1 1)">
          <path className="beam" d="M606 124 L930 70 L930 186 Z" fill="url(#cbm)" />
          <path d={CAR_BODY} fill="url(#cb)" />
          <circle cx="150" cy="152" r="40" fill="#04060a" />
          <circle cx="482" cy="152" r="40" fill="#04060a" />
          <path d={CAR_GLASS} fill="url(#cg)" />
          <path d="M322 62L326 92L330 148" stroke="#000" strokeOpacity=".55" strokeWidth="1.6" fill="none" />
          <path d={CAR_LINE} fill="none" stroke="#1248FF" strokeWidth="6" opacity=".45" filter="url(#bl)" />
          <path d={CAR_LINE} fill="none" stroke="url(#cr)" strokeWidth="2" />
          <path d="M62 124C190 113 390 109 592 124" fill="none" stroke="url(#cr)" strokeWidth="1.2" opacity=".6" />
          <path d="M60 147C200 150 420 150 592 147" fill="none" stroke="#1248FF" strokeWidth="2.4" opacity=".85" />
          <path d="M584 114C602 116 614 124 616 132L596 128C590 124 586 120 584 114Z" fill="#e8efff" />
          <circle cx="608" cy="124" r="22" fill="url(#ug)" />
          <circle cx="36" cy="124" r="14" fill="#FF1825" opacity=".35" filter="url(#bl)" />
          <path d="M30 128C30 122 34 119 50 117" stroke="#FF1825" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <use href="#wh" x="150" y="152" />
          <use href="#wh" x="482" y="152" />
        </g>
      </svg>
    </div>
  )
}

/** Showroom: spot-lit car with a car key in the foreground. */
export function ShowroomArt() {
  return (
    <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A car in a showroom with a car key in the foreground" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="ph-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0e1a46" /><stop offset=".55" stopColor="#070b1c" /><stop offset="1" stopColor="#04060a" /></linearGradient>
        <linearGradient id="ph-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfdcff" stopOpacity=".22" /><stop offset="1" stopColor="#cfdcff" stopOpacity="0" /></linearGradient>
        <linearGradient id="ph-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#141e44" /><stop offset="1" stopColor="#04060a" /></linearGradient>
        <linearGradient id="ph-key" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a3560" /><stop offset="1" stopColor="#0a0f20" /></linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#ph-bg)" />
      <path d="M195 0H285L478 440H2Z" fill="url(#ph-cone)" />
      <rect x="60" y="150" width="360" height="2" fill="#4d73ff" opacity=".8" />
      <rect x="60" y="146" width="360" height="10" fill="#1248FF" opacity=".25" filter="url(#bl)" />
      <rect y="430" width="480" height="170" fill="url(#ph-floor)" />
      <ellipse cx="240" cy="436" rx="250" ry="16" fill="url(#ug)" />
      <g transform="translate(8 296) scale(.72)">
        <path d={CAR_BODY} fill="url(#cb)" />
        <circle cx="150" cy="152" r="40" fill="#04060a" />
        <circle cx="482" cy="152" r="40" fill="#04060a" />
        <path d={CAR_GLASS} fill="url(#cg)" />
        <path d={CAR_LINE} fill="none" stroke="url(#cr)" strokeWidth="2.4" />
        <path d="M60 147C200 150 420 150 592 147" fill="none" stroke="#1248FF" strokeWidth="2.6" opacity=".85" />
        <path d="M584 114C602 116 614 124 616 132L596 128C590 124 586 120 584 114Z" fill="#e8efff" />
        <path d="M30 128C30 122 34 119 50 117" stroke="#FF1825" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <use href="#wh" x="150" y="152" />
        <use href="#wh" x="482" y="152" />
      </g>
      <ellipse cx="372" cy="574" rx="70" ry="10" fill="url(#ug)" />
      <g transform="translate(372 492) rotate(14)">
        <circle cy="-26" r="16" fill="none" stroke="#9DB4FF" strokeWidth="2.5" />
        <rect x="-28" y="-12" width="56" height="100" rx="20" fill="url(#ph-key)" stroke="#3a56c8" strokeWidth="1.5" />
        <path d="M7 14H-1a7 7 0 0 0 0 14H7" fill="none" stroke="#1248FF" strokeWidth="3.5" strokeLinecap="round" />
        <circle cy="60" r="7" fill="#1248FF" />
      </g>
    </svg>
  )
}

/** Wireframe car outline with a flowing road line (dealer section background). */
export function DealerArt() {
  return (
    <div className="dl-art" aria-hidden="true">
      <svg viewBox="0 0 900 300">
        <g transform="translate(20 14) scale(1.35)" fill="none" strokeLinecap="round">
          <path d={CAR_BODY} stroke="url(#cr)" strokeWidth="1.4" />
          <path d={CAR_GLASS} stroke="#4d73ff" strokeOpacity=".5" />
          <path d="M322 62L326 92L330 148M60 147C200 150 420 150 592 147" stroke="#1248FF" strokeOpacity=".6" />
          <circle cx="150" cy="152" r="34" stroke="#3a56c8" />
          <circle cx="150" cy="152" r="20" stroke="#3a56c8" strokeOpacity=".6" />
          <circle cx="482" cy="152" r="34" stroke="#3a56c8" />
          <circle cx="482" cy="152" r="20" stroke="#3a56c8" strokeOpacity=".6" />
        </g>
        <path d="M0 266H900" stroke="#1248FF" strokeOpacity=".45" />
        <path className="flow" d="M0 282H900" stroke="#fff" strokeOpacity=".25" strokeWidth="2" />
      </svg>
    </div>
  )
}

/** Speedometer with a sweeping needle (buyers panel). */
export function GaugeArt({
  needleRef,
  arcRef,
}: {
  needleRef?: Ref<SVGGElement>
  arcRef?: Ref<SVGPathElement>
}) {
  return (
    <svg className="pn-bg" viewBox="0 0 600 520" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <g transform="translate(300 175)">
        <circle r="132" fill="#070b1c" fillOpacity=".6" stroke="#9DB4FF" strokeOpacity=".35" strokeWidth="2" />
        <path d="M-80 80A113 113 0 1 1 80 80" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="14" strokeDasharray="2 10.5" />
        <path ref={arcRef} d="M-80 80A113 113 0 1 1 80 80" fill="none" stroke="#1248FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="532 800" strokeDashoffset="532" />
        <circle r="70" fill="none" stroke="#9DB4FF" strokeOpacity=".18" />
        <g ref={needleRef}>
          <line x1="0" y1="0" x2="-67.3" y2="67.3" stroke="#FF1825" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle r="11" fill="#07090F" stroke="#fff" strokeWidth="2" />
      </g>
    </svg>
  )
}

/* ---------- India network map (businesses panel) ---------- */

/** Simplified India outline as [longitude, latitude]; drawn as a dot matrix, so small errors don't show. */
const INDIA: [number, number][] = [
  [68.2, 23.7], [68.8, 24.3], [70.0, 24.6], [71.0, 24.5], [70.6, 25.7], [70.1, 26.6], [69.5, 27.1], [70.6, 28.0],
  [71.9, 27.9], [73.0, 29.2], [73.9, 30.2], [74.6, 31.0], [74.6, 32.0], [75.3, 32.3], [74.5, 32.8], [74.0, 33.4],
  [73.6, 34.3], [72.6, 35.4], [72.8, 36.5], [74.6, 37.0], [75.8, 36.7], [77.8, 35.6], [79.4, 35.6], [80.3, 35.3],
  [79.6, 34.2], [78.9, 33.3], [78.6, 32.4], [79.0, 31.3], [80.2, 30.6], [81.0, 30.1], [80.1, 28.8], [81.3, 28.1],
  [82.9, 27.4], [84.6, 27.3], [86.0, 26.6], [88.1, 26.4], [88.1, 27.4], [88.6, 28.1], [88.9, 27.3], [89.0, 26.9],
  [92.0, 26.9], [92.0, 27.8], [93.5, 28.6], [95.4, 29.3], [96.5, 29.0], [97.3, 28.2], [97.0, 27.2], [95.2, 26.6],
  [94.6, 25.2], [94.2, 23.9], [93.4, 23.0], [93.2, 22.2], [92.6, 21.9], [92.25, 22.9], [91.8, 22.9], [91.2, 23.6],
  [91.6, 24.2], [92.2, 24.5], [92.3, 25.1], [89.9, 25.2], [89.8, 26.0], [88.4, 26.3], [88.1, 25.8], [88.7, 24.3],
  [88.0, 23.9], [88.9, 23.2], [89.0, 22.0], [88.0, 21.6], [87.0, 21.5], [86.5, 20.4], [85.0, 19.3], [84.0, 18.2],
  [82.3, 16.6], [81.2, 16.1], [80.2, 15.2], [80.3, 13.4], [79.8, 11.6], [79.8, 10.3], [78.9, 9.2], [78.2, 8.9],
  [77.5, 8.1], [76.6, 8.9], [76.2, 10.0], [75.8, 11.5], [75.0, 12.8], [74.6, 14.0], [73.8, 15.6], [73.4, 16.8],
  [72.9, 18.9], [72.8, 20.5], [72.6, 21.4], [72.6, 22.2], [72.2, 21.6], [71.0, 20.8], [70.0, 21.0], [69.0, 22.3],
  [70.4, 22.8], [69.5, 23.0], [68.4, 23.3],
]

/**
 * Equirectangular projection into the 600×520 panel (≈ cos 22° horizontal squash).
 * Sized so the whole map, Kanyakumari included, ends above the panel text in the 600px-tall panel.
 */
const LAT_SCALE = 11
const LON_SCALE = 10.2
const X0 = 150
const Y0 = 8
const project = (lon: number, lat: number): [number, number] => [X0 + (lon - 68) * LON_SCALE, Y0 + (37.2 - lat) * LAT_SCALE]

function inIndia(lon: number, lat: number) {
  let inside = false
  for (let i = 0, j = INDIA.length - 1; i < INDIA.length; j = i++) {
    const [xi, yi] = INDIA[i]
    const [xj, yj] = INDIA[j]
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

/** Dot-matrix fill of the outline, computed once at module load. */
const MAP_DOTS: [number, number][] = (() => {
  const dots: [number, number][] = []
  const step = 8
  const [xMax, yMax] = project(97.5, 8)
  for (let y = Y0; y <= yMax; y += step) {
    for (let x = X0; x <= xMax; x += step) {
      const lon = 68 + (x - X0) / LON_SCALE
      const lat = 37.2 - (y - Y0) / LAT_SCALE
      if (inIndia(lon, lat)) dots.push([x, y])
    }
  }
  return dots
})()

const HQ = project(72.88, 19.08) // Mumbai head branch
/**
 * Branch cities linked to the HQ. `side` places each label so the close-set cities don't collide,
 * and nothing pokes past the panel's left edge (the map is anchored right, so Gujarat sits near it).
 */
const CITIES: { name: string; at: [number, number]; side: 'top' | 'right' }[] = [
  { name: 'AHMEDABAD', at: project(72.57, 23.02), side: 'top' },
  { name: 'INDORE', at: project(75.86, 22.72), side: 'right' },
  { name: 'SURAT', at: project(72.83, 21.17), side: 'right' },
  { name: 'DELHI', at: project(77.21, 28.61), side: 'top' },
  { name: 'RANCHI', at: project(85.33, 23.34), side: 'right' },
]
const LABEL_POS = {
  top: { x: 0, y: -8, textAnchor: 'middle' },
  right: { x: 8, y: 3.5, textAnchor: 'start' },
} as const

/** Curved route between HQ and a city, bowed upward like a flight path. */
function route([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const len = Math.hypot(x2 - x1, y2 - y1)
  let nx = -(y2 - y1) / len
  let ny = (x2 - x1) / len
  if (ny > 0) [nx, ny] = [-nx, -ny]
  const k = len * 0.22
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(mx + nx * k).toFixed(1)} ${(my + ny * k).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

/**
 * India network map (businesses panel): dotted India, signal waves from the Mumbai HQ,
 * routes to partner cities with leads/approvals travelling along them, and pinging city pins.
 */
export function IndiaMapArt({ align = 'right' }: { align?: 'right' | 'center' }) {
  // viewBox is cropped tight to the map so it can fill its box; anchored right (panel) or centred (About photo).
  const frame = {
    viewBox: '140 4 316 328',
    preserveAspectRatio: align === 'center' ? 'xMidYMid meet' : 'xMaxYMin meet',
    'aria-hidden': true,
  } as const
  return (
    <>
    <svg className="pn-bg im" {...frame}>
      <g className="im-dots" fill="#9DB4FF">
        {MAP_DOTS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />
        ))}
      </g>

      <g transform={`translate(${HQ[0]} ${HQ[1]})`} fill="none" stroke="#6F8DFF" strokeWidth="1.5">
        <circle className="im-wave" r="16" />
        <circle className="im-wave" r="16" style={{ animationDelay: '1.5s' }} />
        <circle className="im-wave" r="16" style={{ animationDelay: '3s' }} />
      </g>

      {CITIES.map(({ at }, i) => {
        // Alternate direction: approvals go out from HQ, leads come in to HQ.
        const d = i % 2 ? route(at, HQ) : route(HQ, at)
        const delay = { animationDelay: `${((i * 0.41) % 3.4).toFixed(2)}s` }
        return (
          <g key={i} fill="none">
            <path d={d} stroke="#6F8DFF" strokeOpacity=".3" strokeWidth="1" />
            <path className={i % 2 ? 'im-comet im-lead' : 'im-comet'} d={d} pathLength={1} strokeWidth="2.6" strokeLinecap="round" style={delay} />
          </g>
        )
      })}

    </svg>

    {/* Pins and their labels sit on a second, identically framed layer above the panel copy,
        so each label stays readable right at its pin even where the pin falls behind the heading. */}
    <svg className="pn-bg im im-top" {...frame}>
      {CITIES.map(({ name, at: [x, y], side }, i) => (
        <g key={name} transform={`translate(${x} ${y})`}>
          <circle className="im-ping" r="3.5" fill="none" stroke="#9DB4FF" strokeWidth="1.5" style={{ animationDelay: `${(i * 0.6).toFixed(2)}s` }} />
          <circle r="3.2" fill="#fff" />
          <text {...LABEL_POS[side]} className="im-label im-city">
            {name}
          </text>
        </g>
      ))}
      <g transform={`translate(${HQ[0]} ${HQ[1]})`}>
        <circle className="im-ping hq" r="6" fill="none" stroke="#FF1825" strokeWidth="2" />
        <circle r="6" fill="#FF1825" />
        <circle r="2.2" fill="#fff" />
        <text x="10" y="4" className="im-label">MUMBAI HQ</text>
      </g>
    </svg>
    </>
  )
}
