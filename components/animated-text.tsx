"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimatedTextProps = {
  text: string
  as?: "h1" | "h2" | "h3" | "p"
  className?: string
  splitBy?: "words" | "lines"
  delay?: number
  start?: string
}

export function AnimatedText({
  text,
  as: Tag = "p",
  className,
  splitBy = "words",
  delay = 0,
  start = "top 85%",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pieces = container.querySelectorAll<HTMLSpanElement>("[data-piece]")

    if (reduceMotion) {
      gsap.set(pieces, { opacity: 1, y: 0 })
      return
    }

    gsap.set(pieces, { opacity: 0, y: splitBy === "lines" ? "100%" : 24 })

    const tween = gsap.to(pieces, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.045,
      delay,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    })

    ScrollTrigger.refresh()

    const failSafe = window.setTimeout(() => {
      gsap.set(pieces, { opacity: 1, y: 0 })
    }, 2000)

    return () => {
      window.clearTimeout(failSafe)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay, splitBy, start])

  const units = splitBy === "words" ? text.split(" ") : text.split("\n")

  return (
    <Tag ref={containerRef as never} className={className}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span data-piece className="inline-block will-change-transform">
            {unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
          {splitBy === "lines" && <br />}
        </span>
      ))}
    </Tag>
  )
}
