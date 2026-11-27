import { useCallback, useEffect, useRef } from 'react'

/** Degrees the needle travels from zero to the red line (the dial spans 270°). */
const SWEEP_DEG = 262
/** Dash offset of the blue arc at zero, i.e. the full arc length (fully revved = 0). */
const ARC_REST_OFFSET = 532

type Engine = {
  ctx: AudioContext
  gain: GainNode
  filter: BiquadFilterNode
  oscs: OscillatorNode[]
  /** Low-frequency "firing" pulse that makes the tone throb like cylinders. */
  pulse: OscillatorNode
}

/**
 * Drives the speedometer "rev": while engaged the needle and arc climb toward the
 * red line with a synthesized engine note; when released they fall back to rest.
 * Updates SVG attributes directly in a rAF loop, so React never re-renders per frame.
 */
export function useEngineRev() {
  const needleRef = useRef<SVGGElement>(null)
  const arcRef = useRef<SVGPathElement>(null)
  const rpm = useRef(0)
  const revving = useRef(false)
  /** True during an automatic (non-hover) rev: the needle moves but the engine stays silent. */
  const muted = useRef(false)
  const frame = useRef(0)
  const last = useRef(0)
  const engine = useRef<Engine | null>(null)

  const getEngine = useCallback((): Engine | null => {
    if (engine.current) return engine.current
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    try {
      const ctx = new AC()
      const gain = ctx.createGain()
      gain.gain.value = 0
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.Q.value = 4
      // Tremolo stage: a pulse oscillator wobbles the level so the note throbs like an engine firing.
      const throb = ctx.createGain()
      throb.gain.value = 0.7
      const pulse = ctx.createOscillator()
      pulse.type = 'square'
      const depth = ctx.createGain()
      depth.gain.value = 0.3
      pulse.connect(depth).connect(throb.gain)
      pulse.start()
      // Compressor keeps the louder note from clipping on any speaker.
      const comp = ctx.createDynamicsCompressor()
      filter.connect(throb).connect(gain).connect(comp).connect(ctx.destination)
      // Two detuned saws plus a sub square give a rough, throaty engine tone.
      const oscs = (['sawtooth', 'sawtooth', 'square'] as OscillatorType[]).map((type, i) => {
        const o = ctx.createOscillator()
        o.type = type
        o.detune.value = [0, 14, 0][i]
        o.connect(filter)
        o.start()
        return o
      })
      engine.current = { ctx, gain, filter, oscs, pulse }
      return engine.current
    } catch {
      return null
    }
  }, [])

  const tick = useCallback((now: number) => {
    const dt = Math.min((now - last.current) / 1000, 0.05)
    last.current = now
    const r = rpm.current
    // Accelerate quickly toward the red line; coast back down more gently.
    rpm.current = revving.current ? r + (1 - r) * 2.4 * dt : r - r * 1.8 * dt
    const v = rpm.current
    // Rev-limiter bounce once the needle is pinned near the top.
    const jitter = revving.current && v > 0.95 ? Math.sin(now / 28) * 1.6 : 0

    needleRef.current?.setAttribute('transform', `rotate(${(v * SWEEP_DEG + jitter).toFixed(2)})`)
    arcRef.current?.setAttribute('stroke-dashoffset', (ARC_REST_OFFSET * (1 - v)).toFixed(1))

    const e = engine.current
    if (e) {
      const t = e.ctx.currentTime
      // Pitch range sits where laptop and phone speakers can actually reproduce it.
      const f = 75 + v * 255 + jitter * 4
      e.oscs[0].frequency.setTargetAtTime(f, t, 0.03)
      e.oscs[1].frequency.setTargetAtTime(f, t, 0.03)
      e.oscs[2].frequency.setTargetAtTime(f / 2, t, 0.03)
      e.pulse.frequency.setTargetAtTime(f / 4, t, 0.03)
      e.filter.frequency.setTargetAtTime(700 + v * 3200, t, 0.04)
      e.gain.gain.setTargetAtTime(!muted.current && (revving.current || v > 0.02) ? 0.22 + v * 0.2 : 0, t, 0.06)
    }

    if (revving.current || v > 0.002) {
      frame.current = requestAnimationFrame(tick)
    } else {
      rpm.current = 0
      frame.current = 0
      muted.current = false
      needleRef.current?.removeAttribute('transform')
      arcRef.current?.setAttribute('stroke-dashoffset', String(ARC_REST_OFFSET))
      // The context is left running (silent at gain 0): resuming it later from a hover,
      // which is not a user gesture, is refused by some browsers.
    }
  }, [])

  // Browsers block audio until the visitor clicks, taps or presses a key, and a hover never
  // counts. So the engine is created and unlocked inside the first such gesture anywhere on
  // the page; every hover after that plays sound.
  useEffect(() => {
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    const unlock = () => {
      const e = getEngine()
      if (!e) return
      e.ctx.resume().then(
        () => events.forEach((ev) => window.removeEventListener(ev, unlock, true)),
        () => {},
      )
    }
    events.forEach((ev) => window.addEventListener(ev, unlock, true))
    return () => events.forEach((ev) => window.removeEventListener(ev, unlock, true))
  }, [getEngine])

  const start = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    muted.current = false
    revving.current = true
    // Silent until the page has had a click/tap/key (see unlock above); the needle animates regardless.
    const e = getEngine()
    if (e && e.ctx.state !== 'running') e.ctx.resume().catch(() => {})
    if (!frame.current) {
      last.current = performance.now()
      frame.current = requestAnimationFrame(tick)
    }
  }, [getEngine, tick])

  const stop = useCallback(() => {
    revving.current = false
  }, [])

  /** One silent rev up to the red line and back, e.g. when a page opens (no gesture, so no sound). */
  const blip = useCallback((holdMs = 900) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
    muted.current = true
    revving.current = true
    if (!frame.current) {
      last.current = performance.now()
      frame.current = requestAnimationFrame(tick)
    }
    const t = window.setTimeout(() => { if (muted.current) revving.current = false }, holdMs)
    return () => window.clearTimeout(t)
  }, [tick])

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
      engine.current?.ctx.close().catch(() => {})
    },
    [],
  )

  return {
    needleRef,
    arcRef,
    blip,
    bind: { onPointerEnter: start, onPointerLeave: stop, onFocus: start, onBlur: stop },
  }
}
