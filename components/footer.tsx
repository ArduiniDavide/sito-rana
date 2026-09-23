import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer id="footer" className="relative bg-anthracite pt-20 text-cream" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-12 border-b border-cream/10 pb-14 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Logo invert className="h-12 w-40 sm:h-14 sm:w-48" />
            <p className="mt-5 text-sm leading-relaxed text-cream/60">
              Pasta fresca artigianale dal 1962. Ingredienti veri, ricette di famiglia e la cura di chi crede nel
              buon cibo condiviso a tavola.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/50">Esplora</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
                <li><a href="#storia" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Storia</a></li>
                <li><a href="#numeri" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">I Numeri</a></li>
                <li><a href="#ricette" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Ricette</a></li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/50">Azienda</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
                <li><a href="#top" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Chi siamo</a></li>
                <li><a href="#footer" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Contatti</a></li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.15em] text-cream/50">Legale</span>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-cream/70">
                <li><a href="/privacy" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Privacy Policy</a></li>
                <li><a href="/termini" className="transition-colors hover:text-pasta-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pasta-yellow/40 rounded">Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Giovanni Rana. Tutti i diritti riservati.</p>
          <p>
            Creato da{" "}
            <a
              href="https://itsdavlooo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/80 underline underline-offset-2 transition-colors hover:text-pasta-yellow"
            >
              Davide Arduini
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
