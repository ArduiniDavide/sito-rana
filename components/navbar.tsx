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

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "pt-2 sm:pt-4" : "pt-0"
        }`}
        style={{ paddingTop: scrolled ? "max(env(safe-area-inset-top), 0.5rem)" : "env(safe-area-inset-top)" }}
      >
        <div
          className={`flex w-full items-center justify-between transition-all duration-500 ease-out ${
            scrolled
              ? "mx-3 max-w-4xl rounded-full border border-anthracite/10 bg-cream/85 px-4 py-2.5 shadow-lg shadow-anthracite/10 backdrop-blur-xl sm:mx-4 sm:px-7"
              : "max-w-none rounded-none border-transparent bg-transparent px-4 py-4 sm:px-10 sm:py-7"
          }`}
        >
          <a
            href="#top"
            aria-label="Giovanni Rana, torna alla home"
            className="flex items-center focus-visible:outline-none"
          >
            <Logo
              className={`h-8 w-24 transition-all duration-500 sm:h-10 sm:w-32 ${
                scrolled ? "shadow-md shadow-anthracite/10" : "drop-shadow-md"
              }`}
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigazione principale">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 rounded ${
                  scrolled ? "text-anthracite hover:text-tomato-red" : "text-cream hover:text-pasta-yellow"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#ricette"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 ${
                scrolled
                  ? "bg-tomato-red text-cream hover:bg-anthracite"
                  : "bg-cream text-anthracite hover:bg-pasta-yellow"
              }`}
            >
              Scopri le ricette
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60 md:hidden"
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
