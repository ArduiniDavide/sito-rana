"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest<HTMLAnchorElement>("a[href^='#']")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      if (!href || href === "#") return

      const el = document.querySelector(href)
      if (!el) return

      e.preventDefault()

      if (reduceMotion) {
        el.scrollIntoView()
        return
      }

      gsap.to(window, {
        scrollTo: { y: el, offsetY: 0, autoKill: true },
        duration: 1.6,
        ease: "power2.inOut",
      })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
