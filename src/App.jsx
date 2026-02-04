import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import MagneticButton from './components/MagneticButton'
import HorizontalScroll from './components/HorizontalScroll'
import ProjectCard from './components/ProjectCard'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  useLenis()

  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const scrollRef = useRef(null)
  const heroBgRef = useRef(null)
  const headerRef = useRef(null)
  const section2Ref = useRef(null)
  const section2TitleRef = useRef(null)
  const section3Ref = useRef(null)
  const marqueeRef = useRef(null)
  const section4Ref = useRef(null)
  const section4CardsRef = useRef(null)
  const footerRef = useRef(null)
  const footerHeadlineRef = useRef(null)

  useEffect(() => {
    if (preloaderDone) {
      document.body.classList.remove('preloader-active')
    } else {
      document.body.classList.add('preloader-active')
    }
  }, [preloaderDone])

  useEffect(() => {
    if (!preloaderDone) return

    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('.line')
      gsap.fromTo(
        lines,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.12, delay: 0.2 }
      )
      gsap.fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5 })
      gsap.fromTo(scrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1 })

      // Parallax hero bg
      gsap.to(heroBgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Header hide on scroll down, show on scroll up
      let lastY = 0
      const scrollEl = document.scrollingElement || document.documentElement
      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: () => {
          const y = scrollEl.scrollTop
          if (y > 80) {
            if (y > lastY) headerRef.current?.classList.add('header-hidden')
            else headerRef.current?.classList.remove('header-hidden')
          } else headerRef.current?.classList.remove('header-hidden')
          lastY = y
        },
      })

      // Section 2 — word stagger reveal
      const words = section2TitleRef.current?.querySelectorAll('.word')
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(section2Ref.current?.querySelector('.section2-label'), { x: -20, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: { trigger: section2Ref.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      })

      // Section 3 title
      gsap.fromTo(section3Ref.current?.querySelector('.section3-title'), { yPercent: 60, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section3Ref.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })

      // Section 3 project cards stagger
      const cards = section3Ref.current?.querySelectorAll('.project-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none reverse' },
          }
        )
      })

      // Section 4 cards
      const awardCards = section4CardsRef.current?.querySelectorAll('.card')
      awardCards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
          }
        )
      })

      // Footer
      gsap.fromTo(footerHeadlineRef.current, { y: 50, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: footerRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
      gsap.fromTo(footerRef.current?.querySelector('.footer-cta'), { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        scrollTrigger: { trigger: footerRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
      gsap.fromTo(footerRef.current?.querySelector('.footer-bottom'), { y: 30, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.25,
        scrollTrigger: { trigger: footerRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
    })

    return () => ctx.revert()
  }, [preloaderDone])

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return
    const track = marquee.querySelector('.marquee-track')
    const width = track?.scrollWidth ?? 0
    gsap.to(track, { x: -width / 2, duration: 25, ease: 'none', repeat: -1 })
  }, [preloaderDone])

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <Cursor />
      {preloaderDone && <ScrollProgress />}

      <header ref={headerRef} className="header">
        <div className="header-inner">
          <MagneticButton as="a" href="/" className="logo">
            Curosn
          </MagneticButton>
          <nav>
            <MagneticButton as="a" href="#work">
              Work
            </MagneticButton>
            <MagneticButton as="a" href="#about">
              About
            </MagneticButton>
            <MagneticButton as="a" href="#contact">
              Contact
            </MagneticButton>
          </nav>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="hero">
          <div ref={heroBgRef} className="hero-bg" />
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

        <section ref={section2Ref} className="section section-2" id="about">
          <div className="section2-content">
            <p className="section2-label">What we do</p>
            <h2 ref={section2TitleRef} className="section2-title">
              <span className="word">We</span> <span className="word">blend</span>{' '}
              <em><span className="word">strategy</span></em><span className="word">,</span> <span className="word">design</span>{' '}
              <span className="word">and</span> <span className="word">technology</span> <span className="word">to</span>{' '}
              <span className="word">build</span> <span className="word">digital</span> <span className="word">products</span>{' '}
              <span className="word">that</span> <span className="word">people</span> <span className="word">love</span>{' '}
              <span className="word">and</span> <span className="word">brands</span> <span className="word">rely</span> <span className="word">on.</span>
            </h2>
          </div>
        </section>

        <section ref={section3Ref} className="section section-3" id="work">
          <h2 className="section3-title">Selected work</h2>
          <div className="section3-grid">
            <ProjectCard
              num="01"
              title="Nova Identity"
              tag="Brand & Web"
              gradient="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
            />
            <ProjectCard
              num="02"
              title="Arctic Platform"
              tag="Product & UX"
              gradient="linear-gradient(135deg, #0f1419 0%, #1e2a35 100%)"
            />
            <ProjectCard
              num="03"
              title="Lumina Studio"
              tag="E-commerce"
              gradient="linear-gradient(135deg, #1a1625 0%, #2a2340 100%)"
            />
          </div>
        </section>

        <HorizontalScroll />

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

        <footer ref={footerRef} className="footer" id="contact">
          <div className="footer-inner">
            <div className="footer-top">
              <h2 ref={footerHeadlineRef}>Let's create something remarkable.</h2>
              <MagneticButton as="a" href="mailto:hello@curosn.com" className="footer-cta" data-cursor-hover>
                Get in touch →
              </MagneticButton>
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
