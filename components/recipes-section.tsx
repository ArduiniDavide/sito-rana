"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { animate, stagger } from "animejs"
import { recipes } from "@/lib/recipes"
import { RecipeCard } from "@/components/recipe-card"
import { AnimatedText } from "@/components/animated-text"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

type RecipesSectionProps = {
  onOpenRecipe: (slug: string) => void
}

export function RecipesSection({ onOpenRecipe }: RecipesSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const [isDown, setIsDown] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false, lastX: 0, velocity: 0, rafId: 0 })

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (reduceMotion) {
          cardRefs.current.forEach((el) => el && (el.style.opacity = "1"))
        } else {
          animate(cardRefs.current.filter(Boolean), {
            opacity: [0, 1],
            translateY: [50, 0],
            delay: stagger(90),
            duration: 850,
            ease: "out(4)",
          })
        }
        observer.disconnect()
      },
      { rootMargin: "0px 0px -10% 0px" },
    )

    cardRefs.current.filter(Boolean).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const applyMomentum = (velocity: number) => {
    const el = scrollerRef.current
    if (!el) return

    const decay = 0.95
    const step = () => {
      if (Math.abs(velocity) < 0.5) return
      el.scrollLeft -= velocity
      velocity *= decay
      dragState.current.rafId = requestAnimationFrame(step)
    }
    dragState.current.rafId = requestAnimationFrame(step)
  }

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    cancelAnimationFrame(dragState.current.rafId)
    const target = el.scrollLeft + dir * el.clientWidth * 0.85
    gsap.to(el, {
      scrollTo: { x: target },
      duration: 1.0,
      ease: "power3.out",
    })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current
    if (!el) return
    cancelAnimationFrame(dragState.current.rafId)
    gsap.killTweensOf(el)
    setIsDown(true)
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft, moved: false, lastX: e.clientX, velocity: 0, rafId: 0 }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown) return
    const el = scrollerRef.current
    if (!el) return
    const delta = e.clientX - dragState.current.startX
    if (Math.abs(delta) > 4) dragState.current.moved = true
    el.scrollLeft = dragState.current.scrollLeft - delta
    dragState.current.velocity = (e.clientX - dragState.current.lastX) * 0.8
    dragState.current.lastX = e.clientX
  }

  const endDrag = () => {
    if (!isDown) return
    setIsDown(false)
    if (Math.abs(dragState.current.velocity) > 1) {
      applyMomentum(dragState.current.velocity)
    }
  }

  return (
    <section id="ricette" className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-8">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-basil-green">Ricette</span>
            <AnimatedText
              as="h2"
              text="Piatti pensati per la tavola di tutti i giorni"
              className="mt-3 font-display text-2xl font-bold leading-tight text-anthracite sm:text-4xl lg:text-5xl"
            />
            <p className="mt-4 text-sm leading-relaxed text-anthracite/65 sm:text-base sm:text-lg">
              Scorri o trascina le card per scoprire alcune delle nostre ricette più amate, pensate per portare la
              tradizione italiana in tavola in pochi minuti.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Ricetta precedente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-anthracite/15 text-anthracite transition-colors hover:border-tomato-red hover:bg-tomato-red hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Ricetta successiva"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-anthracite/15 text-anthracite transition-colors hover:border-tomato-red hover:bg-tomato-red hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
            >
              →
            </button>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Ricetta precedente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-anthracite/15 text-anthracite transition-colors hover:border-tomato-red hover:bg-tomato-red hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Ricetta successiva"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-anthracite/15 text-anthracite transition-colors hover:border-tomato-red hover:bg-tomato-red hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red/40"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`mt-10 flex gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mt-12 sm:gap-6 sm:px-10 lg:px-16 [&::-webkit-scrollbar]:hidden ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollSnapType: isDown ? "none" : "x proximity", WebkitOverflowScrolling: "touch" }}
      >
        {recipes.map((recipe, i) => (
          <div
            key={recipe.slug}
            ref={(el) => { if (el) cardRefs.current[i] = el }}
            className="opacity-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <RecipeCard
              recipe={recipe}
              onOpen={(slug) => {
                if (!dragState.current.moved) onOpenRecipe(slug)
              }}
            />
          </div>
        ))}
        <div className="w-1 flex-shrink-0" aria-hidden />
      </div>
    </section>
  )
}
