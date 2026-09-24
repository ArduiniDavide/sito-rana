"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const STORAGE_KEY = "rana-consent-v1"

export function ConsentPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const t = window.setTimeout(() => setVisible(true), 1200)
        return () => window.clearTimeout(t)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = (accepted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "rejected")
    } catch {
      // ignore storage errors
    }
    setClosing(true)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setVisible(false),
      })
    } else {
      setVisible(false)
    }
  }

  if (!visible) return null

  return (
    <div
      ref={cardRef}
      role="dialog"
      aria-label="Informativa sui cookie e sulla privacy"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[70] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-anthracite/10 bg-card p-5 shadow-2xl shadow-anthracite/20"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-basil-green/15 text-basil-green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-anthracite">
            La tua privacy conta per noi
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-anthracite/65">
            Utilizziamo cookie essenziali e, con il tuo consenso, cookie analitici per migliorare la tua esperienza.
            Puoi accettare o rifiutare in qualsiasi momento.
          </p>
          <p className="mt-2 text-xs text-anthracite/50">
            Leggi la{" "}
            <a href="/privacy" className="font-medium text-tomato-red underline underline-offset-2 hover:text-anthracite transition-colors">
              Privacy Policy
            </a>{" "}
            e i{" "}
            <a href="/termini" className="font-medium text-tomato-red underline underline-offset-2 hover:text-anthracite transition-colors">
              Termini e Condizioni
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="flex-1 cursor-pointer rounded-full bg-tomato-red px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-anthracite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
        >
          Accetta
        </button>
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="flex-1 cursor-pointer rounded-full border border-anthracite/20 px-4 py-2.5 text-xs font-semibold text-anthracite transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anthracite/20"
        >
          Rifiuta
        </button>
      </div>
    </div>
  )
}
