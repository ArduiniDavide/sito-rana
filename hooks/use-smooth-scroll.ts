"use client"

import { useEffect } from "react"

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

      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element | number, opts?: object) => void } }).__lenis
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.6 })
      } else {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
