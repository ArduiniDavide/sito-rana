"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import { MobileMenu } from "@/components/mobile-menu"
import { Logo } from "@/components/logo"

const LINKS = [
  { href: "#storia", label: "Storia" },
  { href: "#numeri", label: "I Numeri" },
  { href: "#ricette", label: "Ricette" },
]

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (header && !reduceMotion) {
      animate(header, {
        opacity: [0, 1],
        translateY: [-24, 0],
        duration: 1100,
        ease: "out(4)",
      })
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const onCtaMove = (e: React.MouseEvent) => {
    const el = ctaRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className={`flex w-full items-center justify-between transition-all duration-500 ease-out ${
            scrolled
              ? "mt-3 mx-3 max-w-4xl rounded-2xl border border-anthracite/10 bg-cream/80 px-5 py-3 shadow-lg shadow-anthracite/10 backdrop-blur-xl sm:mx-4 sm:px-7"
              : "max-w-none px-5 py-5 sm:px-10 sm:py-7"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            aria-label="Giovanni Rana, torna alla home"
            className="group relative flex items-center overflow-hidden rounded-xl focus-visible:outline-none"
          >
            <Logo
              className={`h-8 w-24 transition-all duration-500 sm:h-10 sm:w-32 ${
                scrolled ? "drop-shadow-sm" : "drop-shadow-md"
              }`}
            />
          </a>

          {/* Desktop nav with animated underline links */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigazione principale">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium tracking-wide focus-visible:outline-none"
              >
                <span
                  className={`transition-colors ${
                    scrolled
                      ? "text-anthracite group-hover:text-tomato-red"
                      : "text-cream group-hover:text-pasta-yellow"
                  }`}
                >
                  {link.label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] w-0 rounded-full transition-all duration-300 ease-out group-hover:w-full ${
                    scrolled ? "bg-tomato-red" : "bg-pasta-yellow"
                  }`}
                />
              </a>
            ))}

            {/* CTA with spotlight effect */}
            <a
              ref={ctaRef}
              href="#ricette"
              onMouseMove={onCtaMove}
              className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none ${
                scrolled
                  ? "bg-tomato-red text-cream hover:shadow-lg hover:shadow-tomato-red/30"
                  : "bg-cream text-anthracite hover:shadow-lg hover:shadow-cream/20"
              }`}
              style={{
                backgroundImage: scrolled
                  ? "radial-gradient(120px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.25), transparent 70%)"
                  : "radial-gradient(120px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(201,43,43,0.15), transparent 70%)",
              }}
            >
              <span className="relative z-10">Scopri le ricette</span>
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-lg focus-visible:outline-none md:hidden"
          >
            <span
              className={`h-[2px] w-6 rounded-full transition-all duration-300 ease-out ${
                menuOpen ? "translate-y-[6px] rotate-45 bg-cream" : scrolled ? "bg-anthracite" : "bg-cream"
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded-full transition-all duration-300 ease-out ${
                menuOpen ? "opacity-0" : scrolled ? "bg-anthracite" : "bg-cream"
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded-full transition-all duration-300 ease-out ${
                menuOpen ? "-translate-y-[6px] -rotate-45 bg-cream" : scrolled ? "bg-anthracite" : "bg-cream"
              }`}
            />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} isDark={scrolled} />
    </>
  )
}
