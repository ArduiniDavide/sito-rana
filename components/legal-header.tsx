import type { ReactNode } from "react"
import { BackButton } from "@/components/back-button"

type LegalHeaderProps = {
  kicker: string
  title: string
  updatedAt: string
  intro: string
  variant?: "light" | "dark"
}

export function LegalHeader({
  kicker,
  title,
  updatedAt,
  intro,
  variant = "dark",
}: LegalHeaderProps) {
  const isDark = variant === "dark"

  return (
    <section
      id="top"
      className={`relative overflow-hidden ${
        isDark ? "bg-anthracite text-cream" : "bg-cream text-anthracite"
      }`}
    >
      {isDark && (
        <>
          <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-pasta-yellow/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-tomato-red/10 blur-3xl" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-10 sm:pt-40 lg:pt-44 ${
          isDark ? "" : ""
        }`}
      >
        <div className={`mb-8 ${isDark ? "" : ""}`}>
          <BackButton variant={isDark ? "dark" : "light"} />
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span
              className={`inline-block h-px w-8 ${
                isDark ? "bg-basil-green" : "bg-basil-green"
              }`}
              aria-hidden
            />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-basil-green">
              {kicker}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-5 flex items-center gap-2 text-sm opacity-50">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Ultimo aggiornamento: {updatedAt}</span>
          </div>

          <p
            className={`mt-6 text-base leading-relaxed sm:text-lg ${
              isDark ? "text-cream/65" : "text-anthracite/60"
            }`}
          >
            {intro}
          </p>
        </div>
      </div>

      {/* Decorative bottom divider */}
      <div
        className={`relative z-10 mx-auto max-w-5xl px-5 sm:px-10`}
      >
        <div
          className={`h-px w-full ${
            isDark ? "bg-cream/10" : "bg-anthracite/10"
          }`}
        />
      </div>
    </section>
  )
}
