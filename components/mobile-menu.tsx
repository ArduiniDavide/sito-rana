"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const LINKS = [
  { href: "#storia", label: "Storia" },
  { href: "#numeri", label: "I Numeri" },
  { href: "#ricette", label: "Ricette" },
  { href: "#footer", label: "Contatti" },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  isDark: boolean
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLAnchorElement[]>([])
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const items = itemsRef.current.filter(Boolean)

    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"

      gsap.set(overlay, { display: "flex" })
      gsap.fromTo(
        overlay,
        { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" },
        { clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)", duration: 0.7, ease: "power3.inOut" },
      )
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.25 },
      )

      requestAnimationFrame(() => closeBtnRef.current?.focus())
    } else {
      const top = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""
      if (top) {
        const scrollY = parseInt(top.replace("-", "").replace("px", "")) || 0
        window.scrollTo(0, scrollY)
      }

      gsap.to(overlay, {
        clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={overlayRef}
      id="mobile-menu"
      className="fixed inset-0 z-[55] hidden flex-col items-center justify-center gap-2 bg-anthracite text-cream"
      style={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu di navigazione"
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Chiudi il menu"
        className="absolute right-4 top-4 z-60 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60"
        style={{ top: "max(env(safe-area-inset-top), 1rem)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <nav className="flex flex-col items-center gap-4" aria-label="Navigazione mobile">
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            href={link.href}
            onClick={onClose}
            className="group relative overflow-hidden rounded-2xl px-8 py-3 font-display text-3xl font-semibold tracking-tight text-cream transition-colors hover:text-anthracite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/50 sm:text-5xl"
          >
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-2xl bg-pasta-yellow transition-transform duration-300 ease-out group-hover:scale-y-100" />
            {link.label}
          </a>
        ))}
      </nav>
      <p className="mt-10 text-xs uppercase tracking-[0.2em] text-cream/50 sm:mt-12 sm:text-sm">
        Pasta fresca dal 1962
      </p>
    </div>
  )
}
