"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import {
  ArrowLeft, ArrowRight, Maximize, Minimize, Home,
  Lightbulb, Bot, GitBranch, Code2, Database, Table2,
  Link2, Plug, Bug, Play, Wrench, Pencil, BarChart3,
  CheckSquare, Brain, Users, Target, Cpu, Layers,
} from "lucide-react"
import { Logo } from "@/components/logo"

type SlideTheme = "dark" | "light"

type Slide = {
  id: number
  title: string
  icon: typeof Lightbulb
  theme: SlideTheme
  content: React.ReactNode
}

const slideThemeBg: Record<SlideTheme, string> = {
  dark: "bg-anthracite text-cream",
  light: "bg-cream text-anthracite",
}

export default function PresentazionePage() {
  const [current, setCurrent] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => Math.min(c + 1, SLIDES.length - 1))
  }, [])
  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => Math.max(c - 1, 0))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault()
        next()
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        prev()
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen()
      } else if (e.key === "Home") {
        setDirection(-1)
        setCurrent(0)
      } else if (e.key === "End") {
        setDirection(1)
        setCurrent(SLIDES.length - 1)
      } else if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen()
    }
  }

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  const slide = SLIDES[current]
  const slideKey = `slide-${current}`
  const animClass = direction > 0
    ? "slide-in-right"
    : "slide-in-left"

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-anthracite">
      {/* Slide content */}
      <div
        key={slideKey}
        className={`absolute inset-0 flex flex-col ${slideThemeBg[slide.theme]} ${animClass}`}
      >
        {/* Slide header */}
        <div className="flex items-center justify-between px-8 pt-6 sm:px-12 sm:pt-8">
          <div className="flex items-center gap-3">
            <slide.icon className="h-5 w-5 text-pasta-yellow" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
              {slide.id} / {SLIDES.length}
            </span>
          </div>
          <div className={slide.theme === "dark" ? "h-6" : ""}>
            {slide.theme === "light" && <Logo className="h-6 w-20" />}
          </div>
        </div>

        {/* Slide body */}
        <div className="flex flex-1 items-center overflow-y-auto px-8 py-4 sm:px-12 sm:py-6">
          <div className="w-full max-w-5xl mx-auto">
            <h1 className="font-display text-3xl font-bold leading-tight mb-6 sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            {slide.content}
          </div>
        </div>

        {/* Slide footer with progress dots */}
        <div className="flex items-center justify-center gap-1.5 px-8 pb-4 sm:pb-5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Vai alla slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-pasta-yellow" : "w-1.5 opacity-40 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
        <a
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-anthracite/80 text-cream backdrop-blur-sm transition-colors hover:bg-anthracite"
          aria-label="Torna alla home"
        >
          <Home className="h-4 w-4" />
        </a>
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-anthracite/80 text-cream backdrop-blur-sm transition-colors hover:bg-anthracite disabled:opacity-30 disabled:hover:bg-anthracite/80"
          aria-label="Slide precedente"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          disabled={current === SLIDES.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-tomato-red text-cream backdrop-blur-sm transition-colors hover:bg-tomato-red/80 disabled:opacity-30 disabled:hover:bg-tomato-red"
          aria-label="Slide successiva"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-anthracite/80 text-cream backdrop-blur-sm transition-colors hover:bg-anthracite"
          aria-label={isFullscreen ? "Esci da schermo intero" : "Schermo intero"}
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right { animation: slideInRight 0.45s ease-out; }
        .slide-in-left { animation: slideInLeft 0.45s ease-out; }
      `}</style>
    </div>
  )
}

// ── Reusable slide content helpers ──

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-base leading-relaxed sm:text-lg">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pasta-yellow" />
          <span className="opacity-90">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function CardGrid({ cards }: { cards: { title: string; body: string; icon: typeof Code2 }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl border border-current/10 bg-current/5 p-5"
        >
          <c.icon className="mb-3 h-6 w-6 text-pasta-yellow" strokeWidth={2} />
          <h3 className="font-display text-lg font-semibold mb-1">{c.title}</h3>
          <p className="text-sm leading-relaxed opacity-75">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

function PromptBlock({ prompt, result }: { prompt: string; result: string }) {
  return (
    <div className="rounded-2xl border border-pasta-yellow/30 bg-pasta-yellow/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-pasta-yellow mb-2">Prompt inviato</p>
      <p className="font-mono text-sm leading-relaxed mb-3 opacity-90">"{prompt}"</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-basil-green mb-1">Risultato ottenuto</p>
      <p className="text-sm leading-relaxed opacity-75">{result}</p>
    </div>
  )
}

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <div className="rounded-2xl bg-anthracite/90 p-5 sm:p-6">
      {caption && <p className="text-xs font-semibold uppercase tracking-wider text-pasta-yellow mb-3">{caption}</p>}
      <pre className="overflow-x-auto text-sm leading-relaxed text-cream/90">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function FlowStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-pasta-yellow font-display text-base font-bold text-anthracite">
        {num}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-base font-semibold sm:text-lg">{title}</h3>
        <p className="text-sm leading-relaxed opacity-75 sm:text-base">{desc}</p>
      </div>
    </div>
  )
}

function FlowDiagram({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s, i) => (
        <div key={i}>
          <FlowStep num={i + 1} title={s.title} desc={s.desc} />
          {i < steps.length - 1 && (
            <div className="ml-[18px] my-1 h-5 w-[2px] bg-current/20" />
          )}
        </div>
      ))}
    </div>
  )
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-basil-green text-basil-green text-xs">
        ✓
      </span>
      <span className="opacity-85">{label}</span>
    </li>
  )
}

function EvalRow({ area, weight, what }: { area: string; weight: string; what: string }) {
  return (
    <tr className="border-b border-current/10">
      <td className="py-3 pr-4 font-medium text-sm sm:text-base">{area}</td>
      <td className="py-3 px-4 text-pasta-yellow font-bold text-sm sm:text-base">{weight}</td>
      <td className="py-3 pl-4 text-sm opacity-70 sm:text-base">{what}</td>
    </tr>
  )
}

// ── All 12+ slides ──

const SLIDES: Slide[] = [
  // Slide 0 — Title
  {
    id: 0,
    title: "Giovanni Rana — Sito Tributo",
    icon: Target,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-lg leading-relaxed opacity-80 sm:text-xl max-w-2xl">
          Presentazione del progetto realizzato con l'ausilio dell'Intelligenza Artificiale.
        </p>
        <div className="flex flex-wrap gap-3">
          {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "anime.js"].map((t) => (
            <span key={t} className="rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-medium sm:text-sm">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm opacity-50 mt-4">
          Sito tributo non ufficiale, realizzato a scopo dimostrativo.
          <br />
          Giovanni Rana è un marchio registrato dei rispettivi proprietari.
        </p>
        <p className="text-sm opacity-60 mt-2">Creato da Davide Arduini</p>
        <p className="text-xs opacity-40 mt-6">
          Usa le frecce ← → per navigare · F per schermo intero · Home/End per prima/ultima slide
        </p>
      </div>
    ),
  },

  // Slide 1 — Idea e obiettivo
  {
    id: 1,
    title: "Idea e obiettivo del progetto",
    icon: Lightbulb,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
            <h3 className="font-display text-lg font-semibold mb-2">Il progetto</h3>
            <p className="text-sm leading-relaxed opacity-75">
              Un sito web tributo dedicato a Giovanni Rana che racconta la storia dell'azienda,
              mostra i numeri della tradizione e presenta le ricette più amate della pasta fresca italiana.
            </p>
          </div>
          <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
            <h3 className="font-display text-lg font-semibold mb-2">Problema affrontato</h3>
            <p className="text-sm leading-relaxed opacity-75">
              Creare un'esperienza web immersiva e animata che trasmetta il calore e la tradizione
              di un marchio storico, con un design premium e animazioni fluide.
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Funzionalità principali</h3>
          <BulletList items={[
            "Hero animato con parallasse e testo che appare gradualmente",
            "Sezione storia con scroll orizzontale su desktop e verticale su mobile",
            "Statistiche animate con contatori che partono da zero",
            "Carousel di ricette con drag-to-scroll e inertia",
            "Modale di dettaglio ricetta con ingredienti e preparazione",
            "Menu mobile animato e navbar che cambia stile allo scroll",
            "Banner cookie (consent popup) conforme alla privacy",
          ]} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-2">Destinatari</h3>
          <p className="text-sm leading-relaxed opacity-75">
            Appassionati di cucina italiana, famiglie, e chiunque voglia scoprire le ricette
            tradizionali della pasta fresca in un formato digitale elegante.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 2 — Intelligenza Artificiale
  {
    id: 2,
    title: "Intelligenza Artificiale utilizzata",
    icon: Bot,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Strumento utilizzato e motivo della scelta</h3>
          <BulletList items={[
            "Bolt.new (AI di Anthropic) — piattaforma che genera codice in tempo reale e permette iterazione visiva",
            "Scelto perché scrive direttamente file del progetto, mostra l'anteprima e corregge errori di build automaticamente",
          ]} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Attività affidate all'AI</h3>
          <BulletList items={[
            "Generazione della struttura del progetto Next.js con App Router",
            "Creazione dei componenti React con animazioni GSAP e anime.js",
            "Stesura dei testi delle ricette e delle sezioni narrative",
            "Implementazione dello scroll orizzontale con ScrollTrigger",
            "Risoluzione di bug (Turbopack non supportato, problemi di import)",
          ]} />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PromptBlock
            prompt="Crea un sito per Giovanni Rana con hero animato, sezione storia con scroll orizzontale, statistiche animate e carousel di ricette con drag."
            result="L'AI ha generato l'intera struttura: layout, hero con parallasse GSAP, story section con ScrollTrigger pin, statistics con contatori anime.js, recipes con pointer events."
          />
          <PromptBlock
            prompt="Il dev server non parte, dice Turbopack non supportato su questa piattaforma."
            result="L'AI ha diagnosticato il problema e cambiato lo script dev da 'next dev' a 'next dev --webpack', risolvendo l'errore."
          />
        </div>
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2 text-basil-green">Decisione presa da me, non proposta dall'AI</h3>
          <p className="text-sm leading-relaxed opacity-85">
            Ho scelto di aggiungere il disclaimer "Sito tributo non ufficiale" nel footer per
            questioni di correttezza verso il marchio registrato. L'AI non lo aveva proposto:
            è stata una mia scelta etica e di trasparenza.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 3 — Struttura e flusso
  {
    id: 3,
    title: "Struttura e flusso del progetto",
    icon: GitBranch,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Principali schermate / moduli</h3>
          <CardGrid cards={[
            { title: "Hero", body: "Immagine a tutto schermo con parallasse, badge, titolo animato e CTA", icon: Layers },
            { title: "Storia", body: "4 capitoli con scroll orizzontale (desktop) o verticale (mobile)", icon: Layers },
            { title: "Statistiche", body: "4 contatori animati con background immagine e gradient", icon: BarChart3 },
            { title: "Ricette", body: "Carousel con drag-to-scroll, 6 ricette con card cliccabili", icon: Layers },
            { title: "Dettaglio ricetta", body: "Modale a tutto schermo con ingredienti e step", icon: Layers },
            { title: "Footer + Privacy", body: "Footer con link e disclaimer, pagine legali statiche", icon: Layers },
          ]} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Sequenza delle operazioni</h3>
          <FlowDiagram steps={[
            { title: "Caricamento pagina", desc: "Next.js renderizza la home con tutte le sezioni" },
            { title: "Animazioni di ingresso", desc: "GSAP e anime.js animano hero, testo e elementi con IntersectionObserver" },
            { title: "Scroll utente", desc: "Lenis gestisce lo smooth scroll; ScrollTrigger attiva lo scroll orizzontale della storia" },
            { title: "Click su una ricetta", desc: "Si apre il modale con dettagli; lo scroll del body viene bloccato" },
            { title: "Chiusura modale", desc: "Tasto Escape o click su overlay; lo scroll viene ripristinato" },
          ]} />
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-base font-semibold mb-2">Dati e elaborazioni</h3>
          <p className="text-sm leading-relaxed opacity-75">
            I dati delle ricette sono definiti staticamente in un file TypeScript (lib/recipes.ts).
            Non c'è un database: l'utente naviga, visualizza e interagisce, ma non inserisce dati.
            Le elaborazioni sono tutte lato client: animazioni, scroll, drag del carousel, apertura/chiusura modali.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 4 — Tecnologie
  {
    id: 4,
    title: "Tecnologie utilizzate",
    icon: Cpu,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "TypeScript", body: "Linguaggio principale: tipizza componenti, props, ricette. Previene errori in fase di sviluppo.", icon: Code2 },
          { title: "React 19", body: "Libreria UI: componenti riutilizzabili con hooks (useState, useEffect, useRef, useCallback).", icon: Code2 },
          { title: "Next.js 16", body: "Framework full-stack: App Router, rendering statico, ottimizzazione immagini, routing basato su filesystem.", icon: Layers },
          { title: "Tailwind CSS v4", body: "Framework CSS utility-first: design system con colori personalizzati (cream, tomato-red, pasta-yellow, basil-green, anthracite).", icon: Code2 },
          { title: "GSAP + ScrollTrigger", body: "Animazioni avanzate: parallasse hero, scroll orizzontale pinnato, transizioni del modale ricetta.", icon: Cpu },
          { title: "anime.js", body: "Libreria di animazione: ingresso sfalsato di card e statistiche, contatori numerici animati.", icon: Cpu },
          { title: "Lenis", body: "Smooth scroll: rende lo scorrimento fluido e sincronizzato con le animazioni ScrollTrigger.", icon: Cpu },
          { title: "lucide-react", body: "Set di icone SVG leggere usate nell'interfaccia (frecce, menu, icone di sezione).", icon: Code2 },
          { title: "Netlify", body: "Piattaforma di pubblicazione: deploy automatico del sito Next.js con plugin ufficiale.", icon: Layers },
        ].map((t) => (
          <div key={t.title} className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
            <t.icon className="mb-3 h-6 w-6 text-pasta-yellow" strokeWidth={2} />
            <h3 className="font-display text-base font-semibold mb-1">{t.title}</h3>
            <p className="text-sm leading-relaxed opacity-70">{t.body}</p>
          </div>
        ))}
      </div>
    ),
  },

  // Slide 5 — Database
  {
    id: 5,
    title: "Focus tecnico: Database e dati",
    icon: Database,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-tomato-red/20 bg-tomato-red/5 p-6">
          <h3 className="font-display text-lg font-semibold mb-2 text-tomato-red">Il progetto non utilizza un database</h3>
          <p className="text-sm leading-relaxed opacity-80">
            Questo è un sito vetrina statico: tutti i dati (ricette, testi, immagini) sono definiti
            come costanti TypeScript nel file <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">lib/recipes.ts</code>.
            Non c'è necessità di persistenza, login o interazione con dati utente.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Come sono organizzati i dati</h3>
          <p className="text-sm leading-relaxed opacity-75 mb-4">
            I dati sono strutturati come un array di oggetti tipati <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">Recipe</code>:
          </p>
          <CodeBlock
            caption="Tipo Recipe (lib/recipes.ts)"
            code={`type Recipe = {
  slug: string          // identificatore univoco (es. "gnocchi-burro-e-salvia")
  name: string          // nome della ricetta
  category: string      // categoria (es. "Piatti classici")
  description: string   // descrizione breve
  time: string          // tempo di preparazione
  servings: string      // numero di porzioni
  image: string         // percorso immagine
  ingredients: string[] // lista ingredienti
  steps: string[]       // step di preparazione
}`}
          />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Funzione di recupero dati</h3>
          <CodeBlock
            caption="getRecipeBySlug — recupera una ricetta dal suo slug"
            code={`export function getRecipeBySlug(slug: string) {
  return recipes.find((r) => r.slug === slug)
}`}
          />
          <p className="text-sm leading-relaxed opacity-75 mt-3">
            Lo <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">slug</code> funge da chiave primaria:
            è univoco per ogni ricetta e viene usato per recuperare i dati quando l'utente clicca su una card.
          </p>
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-base font-semibold mb-2">Se il progetto avesse un database...</h3>
          <p className="text-sm leading-relaxed opacity-75">
            Avremmo usato Supabase (PostgreSQL) con una tabella <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">recipes</code>
            dove <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">slug</code> sarebbe la Primary Key,
            con Row Level Security per la lettura pubblica e un'interfaccia admin protetta per l'inserimento.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 6 — Relazioni
  {
    id: 6,
    title: "Relazioni tra i dati",
    icon: Link2,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed opacity-80 sm:text-lg max-w-3xl">
          Anche senza un database relazionale, il progetto struttura i dati con relazioni logiche
          tra le entità.
        </p>
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">Schema delle entità</h3>
          <CodeBlock
            code={`┌─────────────────────────────┐
│         recipes[]            │
│  (array di oggetti Recipe)   │
├─────────────────────────────┤
│  slug (PK) ←─── getRecipeBySlug()
│  name                        │
│  category ──→ raggruppa per  │
│  description      categoria  │
│  time                         │
│  servings                     │
│  image ───→ RECIPE_IMAGES    │
│  ingredients[]                │
│  steps[]                      │
└─────────────────────────────┘
         │
         │ 1:N (una ricetta → molti ingredienti)
         │ 1:N (una ricetta → molti step)
         ▼
┌──────────────┐  ┌──────────────┐
│ ingredients[]│  │   steps[]    │
│  (string[])  │  │  (string[])  │
└──────────────┘  └──────────────┘

┌─────────────────────────────┐
│       RECIPE_IMAGES          │
│  (mappa slug → percorso)     │
│  "gnocchi-burro-e-salvia"    │
│    → "/images/recipe-..."    │
└─────────────────────────────┘`}
          />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Tipi di relazione</h3>
          <BulletList items={[
            "1:N — Una ricetta ha molti ingredienti (array di stringhe)",
            "1:N — Una ricetta ha molti step di preparazione (array di stringhe)",
            "1:1 — Ogni ricetta ha un'immagine associata tramite la mappa RECIPE_IMAGES",
            "N:1 — Più ricette possono appartenere alla stessa categoria (es. \"Tradizione emiliana\")",
          ]} />
        </div>
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2 text-basil-green">Campo di collegamento</h3>
          <p className="text-sm leading-relaxed opacity-85">
            Lo <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">slug</code> è il campo
            che realizza materialmente il collegamento: quando l'utente clicca una card,
            lo slug passa alla funzione <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">getRecipeBySlug()</code>
            che recupera i dati completi della ricetta.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 7 — Collegamento programma e dati
  {
    id: 7,
    title: "Collegamento tra programma e dati",
    icon: Plug,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-base leading-relaxed opacity-80 max-w-3xl">
          Seguiamo il percorso completo di un dato: dal file statico alla visualizzazione nel modale.
        </p>
        <FlowDiagram steps={[
          { title: "Definizione dei dati", desc: "Le ricette sono definite come array statico in lib/recipes.ts con tipo Recipe" },
          { title: "Import nel componente", desc: "RecipesSection importa l'array recipes e lo mappa in card visive" },
          { title: "Click dell'utente", desc: "L'utente clicca una card; onOpenRecipe(slug) passa lo slug al state della pagina" },
          { title: "Recupero del dato", desc: "getRecipeBySlug(slug) cerca nell'array la ricetta con quello slug" },
          { title: "Visualizzazione", desc: "RecipeDetail riceve l'oggetto Recipe e mostra immagine, ingredienti e step nel modale" },
        ]} />
        <CodeBlock
          caption="Flusso del dato in app/page.tsx"
          code={`// 1. State gestisce quale ricetta è aperta
const [openSlug, setOpenSlug] = useState<string | null>(null)

// 2. Click sulla card passa lo slug
const handleOpen = useCallback((slug: string) => setOpenSlug(slug), [])

// 3. Recupero del dato tramite lo slug (chiave)
const activeRecipe = openSlug
  ? getRecipeBySlug(openSlug) ?? null
  : null

// 4. Passaggio al componente di visualizzazione
<RecipeDetail recipe={activeRecipe} onClose={handleClose} />`}
        />
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-base font-semibold mb-2">Domande chiave</h3>
          <BulletList items={[
            "Perché hai definito i dati staticamente? Perché il sito è una vetrina senza interazione utente",
            "Qual è la \"Primary Key\"? Lo slug, univoco per ogni ricetta",
            "Cosa accade quando l'utente preme una card? Lo slug viene passato allo state, la ricetta viene recuperata e mostrata nel modale",
          ]} />
        </div>
      </div>
    ),
  },

  // Slide 8 — Parti significative del codice
  {
    id: 8,
    title: "Parti significative del codice",
    icon: Code2,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">1. Scroll orizzontale con GSAP ScrollTrigger</h3>
          <CodeBlock
            code={`// Quando l'utente scorre, il track si sposta orizzontalmente
ScrollTrigger.create({
  trigger: container,
  start: "top top",
  end: () => "+=" + distance,
  pin: true,
  scrub: 1.2,
  onUpdate: (self) => {
    gsap.set(track, { x: -distance * self.progress })
    setActivePanel(
      Math.round(self.progress * (PANELS.length - 1))
    )
  },
})`}
          />
          <p className="text-sm leading-relaxed opacity-70 mt-2">
            Si attiva quando la sezione storia raggiunge il top della viewport. Pinna la sezione
            e trasforma lo scroll verticale in movimento orizzontale del track.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">2. Drag-to-scroll con inertia nel carousel ricette</h3>
          <CodeBlock
            code={`const onPointerDown = (e) => {
  setIsDown(true)
  dragState.current = {
    startX: e.clientX,
    scrollLeft: el.scrollLeft,
    moved: false,
    velocity: 0,
  }
}

const endDrag = () => {
  if (Math.abs(dragState.current.velocity) > 1) {
    applyMomentum(dragState.current.velocity)
  }
}`}
          />
          <p className="text-sm leading-relaxed opacity-70 mt-2">
            Gestisce il trascinamento con pointer events. Al rilascio, se c'è velocità residua,
            applica un'inerzia con decaying per un effetto naturale.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">3. Blocco scroll del body quando si apre il modale</h3>
          <CodeBlock
            code={`const scrollY = window.scrollY
document.body.style.position = "fixed"
document.body.style.top = "-" + scrollY + "px"
document.body.style.width = "100%"
document.documentElement.style.overflow = "hidden"
window.__lenis?.stop()

// Al cleanup: ripristina tutto
window.scrollTo(0, scrollY)
window.__lenis?.start()`}
          />
          <p className="text-sm leading-relaxed opacity-70 mt-2">
            Quando il modale ricetta è aperto, lo scroll del body viene bloccato per evitare
            che lo sfondo scorra. Lenis viene fermato e ripristinato alla chiusura.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 9 — Test ed errori
  {
    id: 9,
    title: "Test ed errori",
    icon: Bug,
    theme: "light",
    content: (
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-tomato-red/20 bg-tomato-red/5 p-5">
          <h3 className="font-display text-lg font-semibold mb-2 text-tomato-red">Problema 1: Turbopack non supportato</h3>
          <BulletList items={[
            "Sintomo: il dev server non partiva, errore \"Turbopack is not supported on this platform\"",
            "Diagnosi: Next.js 16 usa Turbopack di default, ma la piattaforma non ha i binding nativi",
            "Risoluzione: cambiato lo script dev in \"next dev --webpack\" nel package.json",
            "Verifica: il dev server è partito correttamente dopo la modifica",
          ]} />
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-lg font-semibold mb-2">Problema 2: Logo non leggibile sulla navbar</h3>
          <BulletList items={[
            "Sintomo: il logo blu era invisibile sull'hero scuro (top) e quello crema illeggibile sulla pillola chiara (scrolled)",
            "Diagnosi: il componente Logo non cambiava colore in base allo stato della navbar",
            "Risoluzione: aggiunto invert={!scrolled} per usare il logo crema sopra l'hero e blu quando scrolled",
            "Verifica: il logo è leggibile in entrambi gli stati",
          ]} />
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-lg font-semibold mb-2">Test effettuati</h3>
          <BulletList items={[
            "Test su desktop: scroll orizzontale, parallasse, contatori animati — tutto corretto",
            "Test su mobile: layout verticale della storia, menu hamburger, carousel touch — corretto",
            "Test accessibilità: navigazione da tastiera (Escape chiude il modale), focus visibile",
            "Test build: npm run build completa senza errori, 5 pagine generate staticamente",
            "Test edge case: modale chiuso con click sull'overlay (non solo sul bottone)",
          ]} />
        </div>
        <div className="rounded-2xl border border-pasta-yellow/30 bg-pasta-yellow/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2">Correzione di una risposta dell'AI</h3>
          <p className="text-sm leading-relaxed opacity-85">
            L'AI aveva inizialmente generato il logo con un Image fill senza distinguere lo stato scrolled/non-scrolled.
            Ho dovuto precisare: "Il logo deve essere crema quando la navbar è trasparente e blu quando ha sfondo chiaro".
            L'AI ha allora aggiunto la prop <code className="rounded bg-anthracite/10 px-1.5 py-0.5 text-xs">invert</code> e
            la logica condizionale corretta.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 10 — Dimostrazione pratica
  {
    id: 10,
    title: "Dimostrazione pratica",
    icon: Play,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-base leading-relaxed opacity-80 max-w-2xl">
          Durante l'esposizione, utilizzerò realmente il sito aperto nel browser.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            "Aprire il sito e mostrare l'hero animato con il testo che appare",
            "Scorrere fino alla sezione storia e mostrare lo scroll orizzontale",
            "Arrivare alle statistiche e mostrare i contatori animati",
            "Andare al carousel ricette e trascinare le card",
            "Cliccare una ricetta e mostrare il modale con ingredienti e step",
            "Chiudere il modale con Escape e verificare il ripristino dello scroll",
            "Aprire il menu mobile e mostrare l'animazione dell'hamburger",
            "Mostrare le pagine /privacy e /termini",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-pasta-yellow font-display text-sm font-bold text-anthracite">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed opacity-85">{step}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-tomato-red/30 bg-tomato-red/10 p-5 mt-2">
          <h3 className="font-display text-base font-semibold mb-2 text-tomato-red">Caso di errore da mostrare</h3>
          <p className="text-sm leading-relaxed opacity-85">
            Mostrare cosa succede se si tenta di aprire una ricetta inesistente:
            <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs mx-1">getRecipeBySlug("inesistente")</code>
            restituisce <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">undefined</code>,
            che viene gestito con <code className="rounded bg-cream/10 px-1.5 py-0.5 text-xs">?? null</code> —
            il modale non si apre e non ci sono crash.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 11 — Modifica durante la valutazione
  {
    id: 11,
    title: "Piccola modifica durante la valutazione",
    icon: Wrench,
    theme: "light",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-base leading-relaxed opacity-80 max-w-3xl">
          Il docente può chiedere una modifica in tempo reale. Ecco esempi di cosa potrei fare
          utilizzando l'AI e spiegando il processo.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { req: "Aggiungere una nuova ricetta", how: "Aggiungo un nuovo oggetto Recipe nell'array recipes con tutti i campi richiesti" },
            { req: "Cambiare il colore di sfondo dell'hero", how: "Modifico la classe bg-anthracite nel componente Hero o il colore in globals.css" },
            { req: "Aggiungere un pulsante \"condividi\" nelle card", how: "Aggiungo un bottone in RecipeCard con un'icona lucide-react e un handler" },
            { req: "Modificare il numero di statistiche", how: "Aggiungo o rimuovo oggetti nell'array STATS in StatisticsSection" },
            { req: "Aggiungere una nuova sezione", how: "Creo un nuovo componente e lo importo in app/page.tsx dopo le sezioni esistenti" },
            { req: "Cambiare l'ordine delle sezioni", how: "Riordino i componenti nel JSX di app/page.tsx" },
          ].map((ex, i) => (
            <div key={i} className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
              <h3 className="font-display text-base font-semibold mb-2 text-tomato-red">{ex.req}</h3>
              <p className="text-sm leading-relaxed opacity-75">{ex.how}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2 text-basil-green">Come formulerei la richiesta all'AI</h3>
          <p className="text-sm leading-relaxed opacity-85 font-mono">
            "Aggiungi una ricetta 'Spaghetti carbonara' con categoria 'Piatti classici',
            6 ingredienti e 5 step. Usa l'immagine placeholder. Assicurati che appaia nel carousel."
          </p>
          <p className="text-sm leading-relaxed opacity-75 mt-2">
            Poi verificherei: la card appare nel carousel, il modale si apre correttamente,
            ingredienti e step sono visibili, il build non dà errori.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 12 — Limiti e sviluppi futuri
  {
    id: 12,
    title: "Limiti, miglioramenti e sviluppi futuri",
    icon: Pencil,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Cosa non è completo</h3>
          <BulletList items={[
            "Niente database: le ricette sono hardcoded, non modificabili dall'utente",
            "Niente sistema di autenticazione o area admin",
            "Niente ricerca o filtro delle ricette per categoria",
            "Le immagini sono file statici pesanti (PNG), non ottimizzate per il web moderno",
          ]} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Limiti</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { area: "Sicurezza", detail: "Niente input utente, quindi superficie di attacco minima, ma niente CSRF/protection headers configurati" },
              { area: "Prestazioni", detail: "GSAP + anime.js + Lenis pesano ~80KB; alcune animazioni potrebbero causare jank su dispositivi low-end" },
              { area: "Grafica", detail: "Le immagini sono PNG non ottimizzate; manca responsive art direction" },
              { area: "Dati", detail: "I dati sono statici; cambiare una ricetta richiede di modificare il codice" },
            ].map((l, i) => (
              <div key={i} className="rounded-xl border border-cream/10 bg-cream/5 p-4">
                <h4 className="font-display text-sm font-semibold text-pasta-yellow mb-1">{l.area}</h4>
                <p className="text-sm leading-relaxed opacity-70">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-3">Funzionalità che aggiungerei</h3>
          <BulletList items={[
            "Database Supabase per gestire le ricette dinamicamente con area admin",
            "Sistema di login per un amministratore che può aggiungere/modificare ricette",
            "Ricerca e filtro per categoria, tempo di preparazione, ingredienti",
            "Form di contatto con salvataggio in database",
            "Versione dark/light toggle persistente",
            "Ottimizzazione immagini con next/image e formati WebP/AVIF",
          ]} />
        </div>
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2 text-basil-green">Cosa farei diversamente</h3>
          <p className="text-sm leading-relaxed opacity-85">
            Rifacendo il progetto, strutturerei i dati in Supabase fin dall'inizio per evitare
            di dover migrare poi, e userei un CMS headless per i contenuti testuali.
            Inoltre, progetterei prima il design system e poi i componenti, invece di iterare
            componente per componente.
          </p>
        </div>
      </div>
    ),
  },

  // Slide 13 — Valutazione
  {
    id: 13,
    title: "Come sarà valutato il progetto",
    icon: BarChart3,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-relaxed opacity-75 max-w-2xl">
          La complessità tecnica da sola non determina il voto. Un progetto più semplice ma
          pienamente compreso, testato e spiegato può essere valutato meglio di uno complesso
          non compreso.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-anthracite/20">
                <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-wider">Area</th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider">Peso</th>
                <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider">Cosa conta</th>
              </tr>
            </thead>
            <tbody>
              <EvalRow area="Idea, obiettivo e progettazione" weight="10%" what="Chiarezza e coerenza" />
              <EvalRow area="Uso dell'AI e qualità dei prompt" weight="15%" what="Guidare e migliorare l'AI" />
              <EvalRow area="Comprensione della struttura" weight="15%" what="Sapere cosa succede e perché" />
              <EvalRow area="Database, tabelle, chiavi e relazioni" weight="15%" what="Comprensione dei dati" />
              <EvalRow area="Comprensione del codice e tecnologie" weight="20%" what="Spiegare parti significative" />
              <EvalRow area="Problem solving, test e correzione" weight="10%" what="Verificare e correggere" />
              <EvalRow area="PowerPoint ed esposizione" weight="10%" what="Chiarezza, ordine, autonomia" />
              <EvalRow area="Contributo personale e capacità critica" weight="5%" what="Scelte e riflessione" />
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <span className="font-display text-2xl font-bold text-tomato-red">TOTALE 100%</span>
        </div>
      </div>
    ),
  },

  // Slide 14 — Checklist
  {
    id: 14,
    title: "Checklist prima della presentazione",
    icon: CheckSquare,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 max-w-4xl">
        {[
          "Ho spiegato chiaramente l'obiettivo del progetto",
          "Ho inserito almeno 1-2 prompt significativi e so spiegarli",
          "So indicare le tecnologie utilizzate e a cosa servono",
          "Ho mostrato come sono organizzati i dati (tipo Recipe, slug come PK)",
          "Ho inserito uno schema dei dati e delle relazioni",
          "Ho scelto 2-3 parti di codice che so spiegare",
          "Ho preparato un esempio di errore/problema e la sua soluzione",
          "Ho verificato il progetto con alcuni test",
          "Sono pronto a fare una dimostrazione pratica",
          "So spiegare cosa ho deciso io e cosa ha prodotto l'AI",
          "Sono pronto a descrivere limiti e miglioramenti",
          "Le slide contengono testi brevi, schemi e diagrammi",
        ].map((item, i) => (
          <ChecklistItem key={i} label={item} />
        ))}
      </div>
    ),
  },

  // Slide 15 — Closing
  {
    id: 15,
    title: "Ricorda",
    icon: Brain,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6 items-center justify-center text-center py-8">
        <div className="max-w-3xl">
          <p className="font-display text-xl leading-relaxed sm:text-2xl opacity-90">
            L'Intelligenza Artificiale è uno strumento di lavoro.
          </p>
          <p className="font-display text-lg leading-relaxed mt-4 opacity-75 sm:text-xl">
            Il valore del progetto sta anche nella tua capacità di fare domande efficaci,
            controllare le risposte, comprendere ciò che è stato costruito e spiegare in modo
            consapevole le scelte effettuate.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-anthracite/10 bg-anthracite/5 px-8 py-6">
          <p className="text-sm opacity-60">Progetto realizzato da</p>
          <p className="font-display text-2xl font-bold mt-1">Davide Arduini</p>
          <p className="text-xs opacity-50 mt-3">
            Sito tributo non ufficiale, realizzato a scopo dimostrativo.<br />
            Giovanni Rana è un marchio registrato dei rispettivi proprietari.
          </p>
        </div>
        <a
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-tomato-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-anthracite"
        >
          <Home className="h-4 w-4" />
          Torna al sito
        </a>
      </div>
    ),
  },
]
