import { useRef } from 'react'
import { gsap } from 'gsap'

export default function ProjectCard({ num, title, tag, gradient }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.7, ease: 'power2.out' })
  }
  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="project-card"
      data-cursor-hover
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="project-img-wrap">
        <div ref={imgRef} className="project-img" style={{ background: gradient }} />
      </div>
      <div className="project-info">
        <span className="project-num">{num}</span>
        <h3>{title}</h3>
        <p>{tag}</p>
      </div>
    </div>
  )
}
