import type { ReactNode } from "react"

export type LegalSection = {
  id: string
  number: string
  title: string
  icon: ReactNode
  children: ReactNode
}

type LegalLayoutProps = {
  sections: LegalSection[]
  backToTop?: boolean
}

export function LegalLayout({ sections, backToTop = true }: LegalLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        {/* Table of contents — sticky sidebar on desktop */}
        <aside className="hidden lg:block">
          <nav
            className="sticky top-28 flex flex-col gap-1"
            aria-label="Indice della pagina"
          >
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-anthracite/40">
              Indice
            </span>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-3 rounded-lg py-2 pl-3 pr-2 text-sm leading-snug text-anthracite/55 transition-all hover:bg-muted hover:text-anthracite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basil-green/40"
              >
                <span className="text-xs font-bold tabular-nums text-basil-green/60 transition-colors group-hover:text-basil-green">
                  {s.number}
                </span>
                <span className="transition-colors">{s.title}</span>
              </a>
            ))}
            {backToTop && (
              <a
                href="#top"
                className="mt-4 flex items-center gap-2 rounded-lg py-2 pl-3 pr-2 text-sm font-medium text-tomato-red transition-all hover:bg-tomato-red/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Torna su
              </a>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-5">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 rounded-2xl border border-anthracite/8 bg-card p-6 shadow-sm shadow-anthracite/5 transition-shadow hover:shadow-md hover:shadow-anthracite/8 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-basil-green/10 text-basil-green">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold tabular-nums text-basil-green/50">
                      {s.number}
                    </span>
                    <h2 className="font-display text-lg font-semibold leading-snug text-anthracite sm:text-xl">
                      {s.title}
                    </h2>
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-anthracite/70 sm:text-[0.95rem] sm:leading-[1.7]">
                    {s.children}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LegalBulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tomato-red" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-pasta-yellow/30 bg-pasta-yellow/10 p-4">
      <svg className="mt-0.5 flex-shrink-0 text-pasta-brown" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
      <div className="text-sm leading-relaxed text-anthracite/80">{children}</div>
    </div>
  )
}
