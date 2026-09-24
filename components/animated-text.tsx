"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"

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
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pieces = container.querySelectorAll<HTMLElement>("[data-piece]")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        if (reduceMotion) {
          pieces.forEach((piece) => {
            piece.style.opacity = "1"
            piece.style.transform = "translateY(0)"
          })
        } else {
          animate(pieces, {
            opacity: [0, 1],
            translateY: [splitBy === "lines" ? "100%" : 24, 0],
            delay: delay * 1000 + stagger(45),
            duration: 950,
            ease: "out(4)",
          })
        }

        observer.disconnect()
      },
      { rootMargin: start.replace("top ", "0px 0px -") },
    )

    pieces.forEach((piece) => {
      piece.style.opacity = "0"
      piece.style.transform = `translateY(${splitBy === "lines" ? "100%" : "24px"})`
    })
    observer.observe(container)

    return () => observer.disconnect()
  }, [delay, splitBy, start])

  const units = splitBy === "words" ? text.split(" ") : text.split("\n")

  return (
    <Tag ref={containerRef} className={className}>
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
