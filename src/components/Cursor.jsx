import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const hoverEnter = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.4 })
    }
    const hoverLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1 })
    }

    window.addEventListener('mousemove', moveCursor)
    const links = document.querySelectorAll('a, button, [data-cursor-hover]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', hoverEnter)
      el.addEventListener('mouseleave', hoverLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', hoverEnter)
        el.removeEventListener('mouseleave', hoverLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-ring"
        aria-hidden
      />
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        aria-hidden
      />
    </>
  )
}
