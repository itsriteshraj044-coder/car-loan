import { useMemo } from 'react'

/* Car artwork and animations from the CARZENX design files, ported to React. */

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
export function GaugeArt() {
  return (
    <svg className="pn-bg" viewBox="0 0 600 520" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <g transform="translate(300 175)">
        <circle r="132" fill="#070b1c" fillOpacity=".6" stroke="#9DB4FF" strokeOpacity=".35" strokeWidth="2" />
        <path d="M-80 80A113 113 0 1 1 80 80" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="14" strokeDasharray="2 10.5" />
        <path d="M-80 80A113 113 0 1 1 80 80" fill="none" stroke="#1248FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="372 700" />
        <circle r="70" fill="none" stroke="#9DB4FF" strokeOpacity=".18" />
        <line className="needle" x1="0" y1="0" x2="77" y2="-56" stroke="#FF1825" strokeWidth="4" strokeLinecap="round" />
        <circle r="11" fill="#07090F" stroke="#fff" strokeWidth="2" />
      </g>
    </svg>
  )
}

/** Hub-and-spoke dealer network (businesses panel). */
export function NetworkArt() {
  return (
    <svg className="pn-bg" viewBox="0 0 600 520" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <g stroke="#6F8DFF" strokeOpacity=".4" fill="none">
        <path className="flow" d="M300 170L130 90M300 170L470 80M300 170L110 230M300 170L500 230M300 170L210 40M300 170L400 30M300 170L560 150M300 170L50 150" />
      </g>
      <circle cx="300" cy="170" r="90" fill="none" stroke="#1248FF" strokeOpacity=".14" />
      <circle cx="300" cy="170" r="56" fill="none" stroke="#1248FF" strokeOpacity=".25" />
      <circle cx="300" cy="170" r="30" fill="#1248FF" fillOpacity=".25" />
      <circle cx="300" cy="170" r="13" fill="#1248FF" />
      <g fill="#9DB4FF">
        <circle cx="130" cy="90" r="6" /><circle cx="470" cy="80" r="6" /><circle cx="110" cy="230" r="6" />
        <circle cx="210" cy="40" r="5" /><circle cx="400" cy="30" r="5" /><circle cx="560" cy="150" r="5" /><circle cx="50" cy="150" r="5" />
      </g>
      <circle cx="500" cy="230" r="5" fill="#FF1825" />
    </svg>
  )
}
