import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalScroll.css'

const ITEMS = [
  { num: '04', title: 'Echo Labs', tag: 'Platform' },
  { num: '05', title: 'Vertex', tag: 'Brand & Digital' },
  { num: '06', title: 'Nebula', tag: 'Web3 Experience' },
]

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const getScrollAmount = () => {
      const sectionWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      return -(sectionWidth - viewportWidth)
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth}`,
      pin: true,
      scrub: 1,
    })

    gsap.to(track, {
      x: () => getScrollAmount(),
      ease: 'none',
      scrollTrigger: st,
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="horizontal-scroll">
      <div ref={trackRef} className="horizontal-scroll-track">
        <div className="horizontal-scroll-item horizontal-scroll-label">
          <span className="section3-title">Featured</span>
        </div>
        {ITEMS.map((item) => (
          <div key={item.num} className="horizontal-scroll-item" data-cursor-hover>
            <div className="horizontal-card-img" />
            <div className="horizontal-card-info">
              <span className="project-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
