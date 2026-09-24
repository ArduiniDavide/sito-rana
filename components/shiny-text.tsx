"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "animejs"

type BlurTextProps = {
  text: string
  className?: string
}

export function BlurText({ text, className = "" }: BlurTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const words = root.querySelectorAll("[data-blur-word]")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((word) => word.classList.add("blur-word-visible"))
      return
    }

    animate(words, {
      opacity: [0, 1],
      filter: ["blur(5px)", "blur(0px)"],
      translateY: [10, 0],
      delay: stagger(90),
      duration: 850,
      ease: "out(4)",
    })
  }, [text])

  return (
    <span ref={rootRef} className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-blur-word aria-hidden className="blur-word">
          {word}{index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  )
}
