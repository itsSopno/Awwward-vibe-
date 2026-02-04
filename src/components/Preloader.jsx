import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const [hidden, setHidden] = useState(false)
  const wrapRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const logo = logoRef.current
    const line = lineRef.current
    if (!wrap || !logo || !line) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrap, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setHidden(true)
            onComplete?.()
          },
        })
      },
    })

    tl.fromTo(logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power4.inOut' }, '-=0.4')
    tl.to({}, { duration: 0.4 })

    return () => tl.kill()
  }, [onComplete])

  if (hidden) return null

  return (
    <div ref={wrapRef} className="preloader" aria-hidden>
      <span ref={logoRef} className="preloader-logo">Curosn</span>
      <div ref={lineRef} className="preloader-line" />
    </div>
  )
}
