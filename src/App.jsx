import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useLenis()
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const scrollRef = useRef(null)
  const section2Ref = useRef(null)
  const section2TextRef = useRef(null)
  const section3Ref = useRef(null)
  const marqueeRef = useRef(null)
  const section4Ref = useRef(null)
  const section4CardsRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('.line')
      gsap.fromTo(lines,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.12, delay: 0.3 }
      )
      gsap.fromTo(subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(scrollRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.4 }
      )

      gsap.fromTo(section2TextRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 0.8,
          },
        }
      )

      gsap.fromTo(section3Ref.current?.querySelector('.section3-title'),
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const cards = section4CardsRef.current?.querySelectorAll('.card')
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      gsap.fromTo(footerRef.current?.querySelector('.footer-inner'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    const track = marquee.querySelector('.marquee-track')
    const width = track?.scrollWidth ?? 0
    gsap.to(track, {
      x: -width / 2,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <>
      <Cursor />
      <main>
        <section ref={heroRef} className="hero">
          <div className="hero-bg" />
          <header className="header">
            <a href="/" className="logo">Curosn</a>
            <nav>
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>
          <div className="hero-content">
            <div className="headline-wrap">
              <h1 ref={headlineRef} className="hero-headline">
                <span className="line">We craft</span>
                <span className="line accent">digital</span>
                <span className="line">experiences.</span>
              </h1>
            </div>
            <p ref={subRef} className="hero-sub">
              Award-winning studio. Design, development & strategy for brands that dare.
            </p>
            <div ref={scrollRef} className="scroll-hint">
              <span>Scroll</span>
              <div className="scroll-line" />
            </div>
          </div>
        </section>

        <section ref={section2Ref} className="section section-2">
          <div ref={section2TextRef} className="section2-content">
            <p className="section2-label">What we do</p>
            <h2 className="section2-title">
              We blend <em>strategy</em>, design and technology to build digital products that people love and brands rely on.
            </h2>
          </div>
        </section>

        <section ref={section3Ref} className="section section-3">
          <h2 className="section3-title">Selected work</h2>
          <div className="section3-grid">
            <div className="project-card" data-cursor-hover>
              <div className="project-img" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }} />
              <div className="project-info">
                <span className="project-num">01</span>
                <h3>Nova Identity</h3>
                <p>Brand & Web</p>
              </div>
            </div>
            <div className="project-card" data-cursor-hover>
              <div className="project-img" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1e2a35 100%)' }} />
              <div className="project-info">
                <span className="project-num">02</span>
                <h3>Arctic Platform</h3>
                <p>Product & UX</p>
              </div>
            </div>
            <div className="project-card" data-cursor-hover>
              <div className="project-img" style={{ background: 'linear-gradient(135deg, #1a1625 0%, #2a2340 100%)' }} />
              <div className="project-info">
                <span className="project-num">03</span>
                <h3>Lumina Studio</h3>
                <p>E-commerce</p>
              </div>
            </div>
          </div>
        </section>

        <div ref={marqueeRef} className="marquee">
          <div className="marquee-track">
            <span>Design</span>
            <span className="dot">•</span>
            <span>Development</span>
            <span className="dot">•</span>
            <span>Strategy</span>
            <span className="dot">•</span>
            <span>Branding</span>
            <span className="dot">•</span>
            <span>Motion</span>
            <span className="dot">•</span>
            <span>Design</span>
            <span className="dot">•</span>
            <span>Development</span>
            <span className="dot">•</span>
            <span>Strategy</span>
            <span className="dot">•</span>
            <span>Branding</span>
            <span className="dot">•</span>
            <span>Motion</span>
          </div>
        </div>

        <section ref={section4Ref} className="section section-4">
          <p className="section4-label">Awards & recognition</p>
          <div ref={section4CardsRef} className="section4-cards">
            <div className="card" data-cursor-hover>
              <span className="card-year">2024</span>
              <h3>Awwwards Site of the Day</h3>
              <p>Nova Identity — Best Visual Design</p>
            </div>
            <div className="card" data-cursor-hover>
              <span className="card-year">2024</span>
              <h3>FWA of the Day</h3>
              <p>Arctic Platform — Innovation</p>
            </div>
            <div className="card" data-cursor-hover>
              <span className="card-year">2023</span>
              <h3>CSS Design Awards</h3>
              <p>Lumina Studio — UI & UX</p>
            </div>
          </div>
        </section>

        <footer ref={footerRef} className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <h2>Let's create something remarkable.</h2>
              <a href="mailto:hello@curosn.com" className="footer-cta" data-cursor-hover>
                Get in touch →
              </a>
            </div>
            <div className="footer-bottom">
              <p>© 2024 Curosn. All rights reserved.</p>
              <div className="footer-links">
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default App
