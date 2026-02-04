import { useRef } from 'react'
import { gsap } from 'gsap'

const STRENGTH = 0.35
const RADIUS = 120

export default function MagneticButton({ children, className, as: Tag = 'a', ...props }) {
  const elRef = useRef(null)

  const handleMove = (e) => {
    const el = elRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const dist = Math.min(Math.hypot(x, y), RADIUS)
    const angle = Math.atan2(y, x)
    const tx = Math.cos(angle) * dist * STRENGTH
    const ty = Math.sin(angle) * dist * STRENGTH
    gsap.to(el, { x: tx, y: ty, duration: 0.35, ease: 'power2.out' })
  }

  const handleLeave = () => {
    gsap.to(elRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <Tag
      ref={elRef}
      className={`magnetic-btn ${className ?? ''}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
