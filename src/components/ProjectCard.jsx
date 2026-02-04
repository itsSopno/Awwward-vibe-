import { useRef } from 'react'
import { gsap } from 'gsap'

const TILT_MAX = 8

export default function ProjectCard({ num, title, tag, gradient }) {
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const imgRef = useRef(null)

  const handleMove = (e) => {
    const el = innerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: x * TILT_MAX,
      rotateX: -y * TILT_MAX,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' })
  }

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.7, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="project-card project-card-3d"
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={innerRef} className="project-card-inner">
        <div className="project-img-wrap">
          <div ref={imgRef} className="project-img" style={{ background: gradient }} />
        </div>
        <div className="project-info">
          <span className="project-num">{num}</span>
          <h3>{title}</h3>
          <p>{tag}</p>
        </div>
      </div>
    </div>
  )
}
