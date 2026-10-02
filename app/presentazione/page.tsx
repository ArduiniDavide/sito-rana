"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import {
  ArrowLeft, ArrowRight, Maximize, Minimize, Home,
  Lightbulb, Bot, GitBranch, Code2, Database,
  Link2, Plug, Bug, Play, Wrench, Pencil, BarChart3,
  CheckSquare, Brain, Target, Cpu, Layers,
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
  const [controlsVisible, setControlsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showControls = useCallback(() => {
    setControlsVisible(true)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000)
  }, [])

  useEffect(() => {
    if (!isFullscreen) {
      setControlsVisible(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      return
    }
    showControls()
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isFullscreen, showControls, current])

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
  const slideKey = "slide-" + current
  const animClass = direction > 0 ? "slide-in-right" : "slide-in-left"

  return (
    <div ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-anthracite">
      <div
        key={slideKey}
        className={"absolute inset-0 flex flex-col " + slideThemeBg[slide.theme] + " " + animClass}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 sm:px-10 sm:pt-7">
          <div className="flex items-center gap-3">
            <slide.icon className="h-5 w-5 text-pasta-yellow" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">
              {slide.id} / {SLIDES.length}
            </span>
          </div>
          <div>
            {slide.theme === "light" && <Logo className="h-6 w-20" />}
          </div>
        </div>

        {/* Body — NO scroll, must fit screen */}
        <div className="flex flex-1 items-center overflow-hidden px-6 py-3 sm:px-10 sm:py-4">
          <div className="w-full max-w-5xl mx-auto">
            <h1 className="font-display text-2xl font-bold leading-tight mb-4 sm:text-3xl lg:text-4xl">
              {slide.title}
            </h1>
            {slide.content}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex flex-wrap items-center justify-center gap-1 px-6 pb-3 sm:pb-4">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={"Vai alla slide " + (i + 1)}
              className={"h-1.5 rounded-full transition-all duration-300 " + (
                i === current ? "w-6 bg-pasta-yellow" : "w-1.5 opacity-40 hover:opacity-70"
              )}
            />
          ))}
        </div>
      </div>

      {/* Nav controls — bottom-left, auto-hide in fullscreen */}
      <div
        onMouseEnter={showControls}
        onMouseMove={showControls}
        className={"absolute bottom-4 left-4 z-20 flex items-center gap-2 transition-opacity duration-300 sm:bottom-6 sm:left-6 " + (controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none")}
      >
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
        .slide-in-right { animation: slideInRight 0.4s ease-out; }
        .slide-in-left { animation: slideInLeft 0.4s ease-out; }
      `}</style>
    </div>
  )
}

// ── Helper components ──

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pasta-yellow" />
          <span className="opacity-90">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-current/10 bg-current/5 p-4 sm:p-5">
      <h3 className="font-display text-base font-semibold mb-1.5 sm:text-lg">{title}</h3>
      <p className="text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  )
}

function PromptBlock({ prompt, result }: { prompt: string; result: string }) {
  return (
    <div className="rounded-2xl border border-pasta-yellow/30 bg-pasta-yellow/10 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-pasta-yellow mb-2">Prompt che ho dato</p>
      <p className="font-mono text-sm leading-relaxed mb-3 opacity-90">&quot;{prompt}&quot;</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-basil-green mb-1">Cosa ha fatto</p>
      <p className="text-sm leading-relaxed opacity-75">{result}</p>
    </div>
  )
}

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <div className="rounded-2xl bg-anthracite/90 p-4 sm:p-5">
      {caption && <p className="text-xs font-semibold uppercase tracking-wider text-pasta-yellow mb-2">{caption}</p>}
      <pre className="overflow-x-auto text-xs leading-relaxed text-cream/90 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function FlowStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pasta-yellow font-display text-sm font-bold text-anthracite">
        {num}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-sm font-semibold sm:text-base">{title}</h3>
        <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{desc}</p>
      </div>
    </div>
  )
}

function FlowDiagram({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-1">
      {steps.map((s, i) => (
        <div key={i}>
          <FlowStep num={i + 1} title={s.title} desc={s.desc} />
          {i < steps.length - 1 && (
            <div className="ml-[16px] my-0.5 h-4 w-[2px] bg-current/20" />
          )}
        </div>
      ))}
    </div>
  )
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3 text-xs leading-relaxed sm:text-sm">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-basil-green text-basil-green text-xs">
        &#10003;
      </span>
      <span className="opacity-85">{label}</span>
    </li>
  )
}

function EvalRow({ area, weight, what }: { area: string; weight: string; what: string }) {
  return (
    <tr className="border-b border-current/10">
      <td className="py-2 pr-4 font-medium text-xs sm:text-sm">{area}</td>
      <td className="py-2 px-4 text-pasta-yellow font-bold text-xs sm:text-sm">{weight}</td>
      <td className="py-2 pl-4 text-xs opacity-70 sm:text-sm">{what}</td>
    </tr>
  )
}

// ── All slides ──

const SLIDES: Slide[] = [
  // 1 — Title
  {
    id: 1,
    title: "Giovanni Rana — Sito web",
    icon: Target,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-base leading-relaxed opacity-80 sm:text-lg max-w-2xl">
          Sito web su Giovanni Rana, fatto con l'aiuto dell'AI.
          Presentazione del progetto di informatica.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "anime.js"].map((t) => (
            <span key={t} className="rounded-full border border-cream/20 bg-cream/10 px-3 py-1.5 text-xs font-medium sm:text-sm">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm opacity-50 mt-2">
          Sito tributo non ufficiale, fatto per la scuola.
          Giovanni Rana è un marchio dei rispettivi proprietari.
        </p>
        <p className="text-sm opacity-60">Fatto da Davide Arduini</p>
        <p className="text-xs opacity-40 mt-4">
          Frecce ← → per cambiare slide · F per schermo intero
        </p>
      </div>
    ),
  },

  // 2 — Idea e obiettivo
  {
    id: 2,
    title: "Idea e obiettivo",
    icon: Lightbulb,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard title="Cos'ho fatto" body="Un sito web su Giovanni Rana che racconta la storia dell'azienda, mostra i numeri e presenta le ricette più famose di pasta fresca." />
          <InfoCard title="Perché l'ho fatto" body="Volevo creare un sito bello da vedere, con animazioni fluide, che facesse sentire il calore della tradizione italiana." />
        </div>
        <InfoCard title="A chi è rivolto" body="A chi ama la cucina italiana, alle famiglie, e a chi vuole vedere le ricette tradizionali in un formato digitale curato." />
      </div>
    ),
  },

  // 3 — Funzionalità principali
  {
    id: 3,
    title: "Cosa fa il sito",
    icon: Layers,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Hero", d: "Immagine grande con titolo che appare piano piano" },
          { t: "Storia", d: "4 capitoli che si scorrono di lato sul desktop" },
          { t: "Numeri", d: "Contatori che partono da 0 e arrivano al valore" },
          { t: "Ricette", d: "6 ricette in un carousel che puoi trascinare" },
          { t: "Dettaglio", d: "Cliccando una ricetta si apre una finestra con ingredienti e passaggi" },
          { t: "Menu", d: "Menu mobile animato e barra in alto che cambia colore" },
        ].map((f, i) => (
          <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
            <h3 className="font-display text-sm font-semibold text-pasta-yellow mb-1 sm:text-base">{f.t}</h3>
            <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{f.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 4 — AI usata
  {
    id: 4,
    title: "L'AI che ho usato",
    icon: Bot,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <InfoCard title="Strumento usato" body="Bolt.new, un'AI che scrive codice direttamente nei file del progetto e ti fa vedere il risultato in tempo reale." />
        <div>
          <h3 className="font-display text-base font-semibold mb-3 sm:text-lg">Cosa ho chiesto all'AI di fare</h3>
          <BulletList items={[
            "Creare tutta la struttura del sito con Next.js",
            "Fare i componenti con le animazioni (GSAP e anime.js)",
            "Scrivere i testi delle ricette e delle sezioni",
            "Fare lo scroll orizzontale della sezione storia",
            "Risolvere bug e errori che venivano fuori",
          ]} />
        </div>
      </div>
    ),
  },

  // 5 — Prompt esempi
  {
    id: 5,
    title: "Esempi di prompt che ho dato",
    icon: Bot,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PromptBlock
          prompt="Crea un sito per Giovanni Rana con hero animato, sezione storia con scroll orizzontale, statistiche animate e carousel di ricette con drag."
          result="L'AI ha creato tutto: layout, hero con parallasse, storia con scroll laterale, numeri animati, carousel con trascinamento."
        />
        <PromptBlock
          prompt="Il dev server non parte, dice Turbopack non supportato su questa piattaforma."
          result="L'AI ha capito il problema e ha cambiato il comando da 'next dev' a 'next dev --webpack'."
        />
      </div>
    ),
  },

  // 6 — Mia decisione
  {
    id: 6,
    title: "Una decisione mia, non dell'AI",
    icon: Brain,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-5">
          <h3 className="font-display text-base font-semibold mb-2 text-basil-green sm:text-lg">Il disclaimer nel footer</h3>
          <p className="text-sm leading-relaxed opacity-85 sm:text-base">
            Ho deciso io di aggiungere &quot;Sito tributo non ufficiale&quot; in fondo alla pagina.
            L'AI non lo aveva suggerito, ma io volevo essere onesto sul fatto che non è il sito vero di Giovanni Rana.
            È stata una mia scelta per correttezza.
          </p>
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-5">
          <h3 className="font-display text-base font-semibold mb-2 sm:text-lg">Come ho cambiato i prompt</h3>
          <p className="text-sm leading-relaxed opacity-75 sm:text-base">
            Quando il logo non si vedeva bene, ho dovuto spiegare meglio all'AI cosa volevo:
            &quot;Il logo deve essere chiaro quando la barra è trasparente e scuro quando ha sfondo chiaro&quot;.
            Prima era troppo generico e l'AI non capiva.
          </p>
        </div>
      </div>
    ),
  },

  // 7 — Struttura: schermate
  {
    id: 7,
    title: "Le schermate del sito",
    icon: GitBranch,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Hero", d: "La prima cosa che vedi: foto grande + titolo" },
          { t: "Storia", d: "4 capitoli della storia dell'azienda" },
          { t: "Numeri", d: "4 statistiche con contatori animati" },
          { t: "Ricette", d: "Carousel con 6 ricette trascinabili" },
          { t: "Dettaglio ricetta", d: "Finestra con ingredienti e passaggi" },
          { t: "Footer", d: "Link in basso + pagine privacy e termini" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
            <h3 className="font-display text-sm font-semibold text-pasta-yellow mb-1 sm:text-base">{s.t}</h3>
            <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{s.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 8 — Flusso
  {
    id: 8,
    title: "Cosa succede quando usi il sito",
    icon: GitBranch,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <FlowDiagram steps={[
          { title: "Apri il sito", desc: "La pagina si carica con tutte le sezioni" },
          { title: "Le animazioni partono", desc: "Il titolo appare, le immagini si muovono" },
          { title: "Scorri", desc: "Lo scroll è fluido, la storia va di lato" },
          { title: "Clicchi una ricetta", desc: "Si apre la finestra con i dettagli" },
          { title: "Chiudi", desc: "Torni dove eri, tutto riprende normalmente" },
        ]} />
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-4">
          <p className="text-sm leading-relaxed opacity-75">
            I dati delle ricette sono scritti dentro il codice. Non c'è un database:
            l'utente guarda e clicca, ma non inserisce dati.
          </p>
        </div>
      </div>
    ),
  },

  // 9 — Tecnologie parte 1
  {
    id: 9,
    title: "Tecnologie usate (1/2)",
    icon: Cpu,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { t: "TypeScript", d: "Il linguaggio con cui ho scritto tutto. Aiuta a non fare errori." },
          { t: "React 19", d: "La libreria per fare i componenti riutilizzabili del sito." },
          { t: "Next.js 16", d: "Il framework che gestisce le pagine, le immagini e mette online il sito." },
          { t: "Tailwind CSS v4", d: "Serve a dare lo stile ai componenti con classi prefatte." },
          { t: "GSAP", d: "Libreria per animazioni: parallasse, scroll orizzontale, transizioni." },
          { t: "anime.js", d: "Un'altra libreria per animare: contatori e comparsa delle card." },
        ].map((t, i) => (
          <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
            <h3 className="font-display text-sm font-semibold text-pasta-yellow mb-1 sm:text-base">{t.t}</h3>
            <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{t.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 10 — Tecnologie parte 2
  {
    id: 10,
    title: "Tecnologie usate (2/2)",
    icon: Cpu,
    theme: "light",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { t: "Lenis", d: "Rende lo scroll della pagina fluido invece di quello di default." },
          { t: "lucide-react", d: "Set di icone leggere usate nell'interfaccia." },
          { t: "Netlify", d: "Piattaforma online dove il sito viene pubblicato." },
          { t: "Playfair Display", d: "Font per i titoli, dà un look elegante." },
          { t: "Manrope", d: "Font per il testo normale, facile da leggere." },
          { t: "Dancing Script", d: "Font per il logo, stile manoscritto." },
        ].map((t, i) => (
          <div key={i} className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-4">
            <h3 className="font-display text-sm font-semibold text-tomato-red mb-1 sm:text-base">{t.t}</h3>
            <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{t.d}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 11 — Database: non c'è
  {
    id: 11,
    title: "Database: come sono organizzati i dati",
    icon: Database,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-tomato-red/20 bg-tomato-red/5 p-4">
          <h3 className="font-display text-base font-semibold mb-2 text-tomato-red sm:text-lg">Il sito non ha un database</h3>
          <p className="text-sm leading-relaxed opacity-80">
            Tutte le ricette sono scritte direttamente nel codice, in un file TypeScript.
            Non serve salvare dati perché l'utente non inserisce niente.
          </p>
        </div>
        <CodeBlock
          caption="Tipo Recipe (il modello di una ricetta)"
          code={"type Recipe = {\n  slug: string          // nome corto univoco\n  name: string          // nome della ricetta\n  category: string      // categoria\n  description: string   // descrizione\n  time: string          // tempo di cottura\n  servings: string      // quante persone\n  image: string         // foto\n  ingredients: string[] // lista ingredienti\n  steps: string[]       // passaggi\n}"}
        />
      </div>
    ),
  },

  // 12 — Database: chiave primaria
  {
    id: 12,
    title: "Chiave primaria e recupero dati",
    icon: Database,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <InfoCard title="La chiave primaria è lo slug" body="Ogni ricetta ha uno slug, cioè un nome corto unico (es. 'gnocchi-burro-e-salvia'). Non ci sono due ricette con lo stesso slug. Serve a trovare la ricetta giusta quando clicchi." />
        <CodeBlock
          caption="Funzione che trova una ricetta dallo slug"
          code={"export function getRecipeBySlug(slug: string) {\n  return recipes.find((r) => r.slug === slug)\n}"}
        />
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-4">
          <h3 className="font-display text-sm font-semibold mb-1 sm:text-base">Se avessi un database...</h3>
          <p className="text-xs leading-relaxed opacity-75 sm:text-sm">
            Avrei usato Supabase (PostgreSQL) con una tabella recipes dove lo slug sarebbe la chiave primaria.
          </p>
        </div>
      </div>
    ),
  },

  // 13 — Relazioni
  {
    id: 13,
    title: "Relazioni tra i dati",
    icon: Link2,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-4">
        <CodeBlock
          code={"ricette (array)\n  |\n  | 1:N  una ricetta -> tanti ingredienti\n  | 1:N  una ricetta -> tanti passaggi\n  | 1:1  una ricetta -> una foto\n  | N:1  piu' ricette -> stessa categoria\n  |\n  +-- ingredients[]  (lista di stringhe)\n  +-- steps[]         (lista di stringhe)\n  +-- image           (una stringa)\n  +-- category        (una stringa condivisa)"}
        />
        <BulletList items={[
          "Una ricetta ha tanti ingredienti (relazione 1 a molti)",
          "Una ricetta ha tanti passaggi (relazione 1 a molti)",
          "Ogni ricetta ha una sola foto (relazione 1 a 1)",
          "Più ricette possono avere la stessa categoria (relazione molti a 1)",
        ]} />
      </div>
    ),
  },

  // 14 — Collegamento programma-dati
  {
    id: 14,
    title: "Come il programma usa i dati",
    icon: Plug,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <FlowDiagram steps={[
          { title: "I dati sono nel file", desc: "Le ricette sono scritte in lib/recipes.ts" },
          { title: "Il componente le importa", desc: "RecipesSection prende l'array e crea le card" },
          { title: "Clicchi una card", desc: "Lo slug passa alla funzione di ricerca" },
          { title: "La funzione trova la ricetta", desc: "getRecipeBySlug(slug) cerca nello array" },
          { title: "Si apre il modale", desc: "RecipeDetail mostra tutto: foto, ingredienti, passaggi" },
        ]} />
        <CodeBlock
          code={"const [openSlug, setOpenSlug] = useState(null)\n\nconst activeRecipe = openSlug\n  ? getRecipeBySlug(openSlug)\n  : null\n\n<RecipeDetail recipe={activeRecipe} />"}
        />
      </div>
    ),
  },

  // 15 — Codice 1: scroll orizzontale
  {
    id: 15,
    title: "Codice: scroll orizzontale",
    icon: Code2,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-3">
        <CodeBlock
          caption="GSAP ScrollTrigger — fa andare la storia di lato"
          code={"ScrollTrigger.create({\n  trigger: container,\n  start: \"top top\",\n  end: \"+=\" + distance,\n  pin: true,\n  scrub: 1.2,\n  onUpdate: (self) => {\n    gsap.set(track, {\n      x: -distance * self.progress\n    })\n  },\n})"}
        />
        <p className="text-sm leading-relaxed opacity-70">
          Quando arrivi alla sezione storia, la pagina si ferma e il contenuto
          si sposta di lato mentre scorri. Più scorri, più va a destra.
        </p>
      </div>
    ),
  },

  // 16 — Codice 2: drag carousel
  {
    id: 16,
    title: "Codice: trascinamento carousel",
    icon: Code2,
    theme: "light",
    content: (
      <div className="flex flex-col gap-3">
        <CodeBlock
          caption="Pointer events — trascini le card delle ricette"
          code={"const onPointerDown = (e) => {\n  setIsDown(true)\n  dragState.current = {\n    startX: e.clientX,\n    scrollLeft: el.scrollLeft,\n    velocity: 0,\n  }\n}\n\nconst endDrag = () => {\n  if (velocity > 1) {\n    applyMomentum(velocity)\n  }\n}"}
        />
        <p className="text-sm leading-relaxed opacity-70">
          Quando tieni premuto e trascini, le card si muovono. Quando lasci,
          se c'era velocità, continuano a scivolare un po' per sembrare naturale.
        </p>
      </div>
    ),
  },

  // 17 — Codice 3: blocco body
  {
    id: 17,
    title: "Codice: bloccare lo scroll dietro il modale",
    icon: Code2,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-3">
        <CodeBlock
          caption="Quando apri una ricetta, la pagina dietro non deve scrollare"
          code={"document.body.style.position = \"fixed\"\ndocument.body.style.top = \"-\" + scrollY + \"px\"\ndocument.body.style.width = \"100%\"\ndocument.documentElement.style.overflow = \"hidden\"\nwindow.__lenis?.stop()\n\n// Quando chiudi: rimetti tutto a posto\nwindow.scrollTo(0, scrollY)\nwindow.__lenis?.start()"}
        />
        <p className="text-sm leading-relaxed opacity-70">
          Quando il modale è aperto, blocco lo scroll della pagina dietro.
          Quando lo chiudi, rimetto tutto come prima.
        </p>
      </div>
    ),
  },

  // 18 — Test ed errori 1
  {
    id: 18,
    title: "Test ed errori (1/2)",
    icon: Bug,
    theme: "light",
    content: (
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-tomato-red/20 bg-tomato-red/5 p-4">
          <h3 className="font-display text-base font-semibold mb-2 text-tomato-red sm:text-lg">Errore: il server non partiva</h3>
          <BulletList items={[
            "Il dev server dava errore: Turbopack non supportato",
            "Next.js 16 usa Turbopack di default ma qui non funziona",
            "Ho cambiato il comando in 'next dev --webpack'",
            "Dopo ha funzionato tutto",
          ]} />
        </div>
        <div className="rounded-2xl border border-anthracite/10 bg-anthracite/5 p-4">
          <h3 className="font-display text-base font-semibold mb-2 sm:text-lg">Errore: il logo non si vedeva</h3>
          <BulletList items={[
            "Il logo blu era invisibile sull'immagine scura",
            "Ho aggiunto invert per cambiare colore a seconda dello stato",
            "Ora è chiaro sull'hero e scuro quando la barra è bianca",
          ]} />
        </div>
      </div>
    ),
  },

  // 19 — Test ed errori 2
  {
    id: 19,
    title: "Test ed errori (2/2)",
    icon: Bug,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-display text-base font-semibold mb-3 sm:text-lg">Test che ho fatto</h3>
          <BulletList items={[
            "Desktop: scroll orizzontale, parallasse, contatori — tutto ok",
            "Mobile: layout verticale, menu hamburger, carousel touch — ok",
            "Tastiera: Escape chiude il modale, focus visibile",
            "Build: npm run build finisce senza errori",
          ]} />
        </div>
        <div className="rounded-2xl border border-pasta-yellow/30 bg-pasta-yellow/10 p-4">
          <h3 className="font-display text-sm font-semibold mb-2 sm:text-base">Una risposta dell'AI che ho dovuto correggere</h3>
          <p className="text-xs leading-relaxed opacity-85 sm:text-sm">
            L'AI aveva fatto il logo senza cambiare colore. Ho dovuto spiegare meglio:
            &quot;Il logo deve essere chiaro quando la barra è trasparente e scuro quando è bianca&quot;.
            Allora ha aggiunto la proprietà invert e ha funzionato.
          </p>
        </div>
      </div>
    ),
  },

  // 20 — Dimostrazione
  {
    id: 20,
    title: "Dimostrazione pratica",
    icon: Play,
    theme: "light",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Aprire il sito e mostrare l'hero animato",
          "Scorrere fino alla storia e mostrare lo scroll di lato",
          "Arrivare ai numeri e far vedere i contatori",
          "Andare alle ricette e trascinare le card",
          "Cliccare una ricetta e mostrare ingredienti e passaggi",
          "Chiudere con Escape e far vedere che lo scroll torna",
          "Aprire il menu mobile",
          "Mostrare le pagine privacy e termini",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-anthracite/10 bg-anthracite/5 p-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-pasta-yellow font-display text-sm font-bold text-anthracite">
              {i + 1}
            </span>
            <span className="text-xs leading-relaxed opacity-85 sm:text-sm">{step}</span>
          </div>
        ))}
      </div>
    ),
  },

  // 21 — Modifica durante valutazione
  {
    id: 21,
    title: "Modifica dal vivo",
    icon: Wrench,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed opacity-80 sm:text-base">
          Il prof può chiedere di cambiare qualcosa sul momento. Ecco cosa potrei fare.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { r: "Aggiungere una ricetta", h: "Aggiungo un oggetto Recipe nell'array" },
            { r: "Cambiare un colore", h: "Modifico le variabili CSS in globals.css" },
            { r: "Aggiungere un pulsante", h: "Metto un bottone nel componente con un'icona" },
            { r: "Cambiare i numeri", h: "Aggiungo o tolgo oggetti nell'array STATS" },
            { r: "Aggiungere una sezione", h: "Creo un componente e lo metto in page.tsx" },
            { r: "Cambiare l'ordine", h: "Sposto i componenti nel file principale" },
          ].map((ex, i) => (
            <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
              <h3 className="font-display text-sm font-semibold text-tomato-red mb-1 sm:text-base">{ex.r}</h3>
              <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{ex.h}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 22 — Limiti
  {
    id: 22,
    title: "Limiti del progetto",
    icon: Pencil,
    theme: "light",
    content: (
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-display text-base font-semibold mb-3 sm:text-lg">Cosa non è completo</h3>
          <BulletList items={[
            "Niente database: le ricette sono scritte nel codice",
            "Niente login o area admin",
            "Niente ricerca o filtro delle ricette",
            "Le immagini sono PNG pesanti, non ottimizzate",
          ]} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { a: "Sicurezza", d: "Niente input utente, quindi pochi rischi, ma niente protezioni configurate" },
            { a: "Prestazioni", d: "Le librerie di animazione pesano ~80KB, potrebbero rallentare su telefoni vecchi" },
            { a: "Grafica", d: "Le immagini sono PNG, non otimizzate per il web" },
            { a: "Dati", d: "Per cambiare una ricetta devi modificare il codice" },
          ].map((l, i) => (
            <div key={i} className="rounded-xl border border-anthracite/10 bg-anthracite/5 p-3">
              <h4 className="font-display text-xs font-semibold text-pasta-yellow mb-1 sm:text-sm">{l.a}</h4>
              <p className="text-xs leading-relaxed opacity-70 sm:text-sm">{l.d}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // 23 — Miglioramenti futuri
  {
    id: 23,
    title: "Cosa aggiungerei in futuro",
    icon: Pencil,
    theme: "dark",
    content: (
      <div className="flex flex-col gap-4">
        <BulletList items={[
          "Database Supabase per gestire le ricette senza toccare il codice",
          "Login per un admin che può aggiungere e modificare ricette",
          "Ricerca e filtro per categoria, tempo e ingredienti",
          "Form di contatto che salva i messaggi",
          "Tema chiaro/scuro che si ricorda",
          "Immagini più leggere con formati moderni (WebP)",
        ]} />
        <div className="rounded-2xl border border-basil-green/30 bg-basil-green/10 p-4">
          <h3 className="font-display text-sm font-semibold mb-2 text-basil-green sm:text-base">Cosa farei diversamente</h3>
          <p className="text-xs leading-relaxed opacity-85 sm:text-sm">
            Rifacendolo, metterei il database dall'inizio per non dover migrare dopo,
            e progetterei prima i colori e i font, poi i componenti.
          </p>
        </div>
      </div>
    ),
  },

  // 24 — Valutazione
  {
    id: 24,
    title: "Come viene valutato",
    icon: BarChart3,
    theme: "light",
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed opacity-75 max-w-2xl">
          Un progetto più semplice ma capito bene vale più di uno complesso ma non capito.
        </p>
        <div className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-anthracite/20">
                <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider">Area</th>
                <th className="py-2 px-4 text-xs font-semibold uppercase tracking-wider">Peso</th>
                <th className="py-2 pl-4 text-xs font-semibold uppercase tracking-wider">Cosa conta</th>
              </tr>
            </thead>
            <tbody>
              <EvalRow area="Idea e progettazione" weight="10%" what="Chiarezza" />
              <EvalRow area="Uso dell'AI" weight="15%" what="Saper guidare l'AI" />
              <EvalRow area="Comprensione della struttura" weight="15%" what="Sapere cosa succede" />
              <EvalRow area="Database e dati" weight="15%" what="Capire i dati" />
              <EvalRow area="Codice e tecnologie" weight="20%" what="Spiegare il codice" />
              <EvalRow area="Test e correzione" weight="10%" what="Verificare e correggere" />
              <EvalRow area="Presentazione" weight="10%" what="Chiarezza e ordine" />
              <EvalRow area="Contributo personale" weight="5%" what="Scelte personali" />
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <span className="font-display text-xl font-bold text-tomato-red sm:text-2xl">TOTALE 100%</span>
        </div>
      </div>
    ),
  },

  // 25 — Checklist
  {
    id: 25,
    title: "Checklist prima di presentare",
    icon: CheckSquare,
    theme: "dark",
    content: (
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 max-w-4xl">
        {[
          "Ho spiegato l'obiettivo del progetto",
          "Ho messo 1-2 prompt e so spiegarli",
          "So dire le tecnologie e a cosa servono",
          "Ho mostrato come sono organizzati i dati",
          "Ho messo uno schema dei dati",
          "Ho scelto 2-3 pezzi di codice che so spiegare",
          "Ho pronto un esempio di errore e soluzione",
          "Ho testato il progetto",
          "Sono pronto a fare la demo",
          "So dire cosa ho fatto io e cosa l'AI",
          "So dire limiti e miglioramenti",
          "Le slide hanno testi brevi e schemi",
        ].map((item, i) => (
          <ChecklistItem key={i} label={item} />
        ))}
      </div>
    ),
  },

  // 26 — Chiusura
  {
    id: 26,
    title: "Ricorda",
    icon: Brain,
    theme: "light",
    content: (
      <div className="flex flex-col gap-6 items-center justify-center text-center py-4">
        <div className="max-w-3xl">
          <p className="font-display text-lg leading-relaxed sm:text-2xl opacity-90">
            L'AI è uno strumento di lavoro.
          </p>
          <p className="font-display text-base leading-relaxed mt-3 opacity-75 sm:text-xl">
            Il valore del progetto sta nel saper fare le domande giuste,
            controllare le risposte, capire cosa è stato costruito
            e spiegare le scelte fatte.
          </p>
        </div>
        <div className="mt-6 rounded-2xl border border-anthracite/10 bg-anthracite/5 px-8 py-5">
          <p className="text-xs opacity-60">Progetto fatto da</p>
          <p className="font-display text-xl font-bold mt-1 sm:text-2xl">Davide Arduini</p>
          <p className="text-xs opacity-50 mt-2">
            Sito tributo non ufficiale, fatto per la scuola.<br />
            Giovanni Rana è un marchio dei rispettivi proprietari.
          </p>
        </div>
        <a
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-tomato-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-anthracite"
        >
          <Home className="h-4 w-4" />
          Torna al sito
        </a>
      </div>
    ),
  },
]
