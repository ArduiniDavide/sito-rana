"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import type { Recipe } from "@/lib/recipes"

type RecipeDetailProps = {
  recipe: Recipe | null
  onClose: () => void
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!recipe) return

    lastFocused.current = document.activeElement as HTMLElement
    const scrollY = window.scrollY
    const body = document.body
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"

    requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      window.scrollTo(0, scrollY)
      lastFocused.current?.focus()
    }
  }, [recipe, onClose])

  useEffect(() => {
    if (!recipe) return
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      gsap.set(overlay, { opacity: 1 })
      gsap.set(panel, { y: 0, opacity: 1 })
      return
    }

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
    gsap.fromTo(
      panel,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.05 },
    )
  }, [recipe])

  if (!recipe) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-anthracite/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-detail-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="relative flex h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-cream sm:h-[88vh] sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Chiudi la ricetta"
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-anthracite/60 text-cream backdrop-blur-sm transition-colors hover:bg-anthracite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/60 sm:right-4 sm:top-4"
          style={{ top: "max(env(safe-area-inset-top), 0.75rem)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className="h-full w-full overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="relative h-56 w-full sm:h-80">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent" />
          </div>

          <div className="mx-auto max-w-2xl px-5 pb-16 pt-2 sm:px-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-basil-green">
              {recipe.category}
            </span>
            <h2
              id="recipe-detail-title"
              className="mt-3 font-display text-2xl font-bold leading-tight text-anthracite sm:text-4xl"
            >
              {recipe.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-anthracite/70 sm:text-base sm:text-lg">
              {recipe.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <span className="rounded-full bg-pasta-yellow/25 px-3 py-1.5 text-xs font-medium text-anthracite sm:px-4 sm:text-sm">
                Preparazione: {recipe.time}
              </span>
              <span className="rounded-full bg-pasta-yellow/25 px-3 py-1.5 text-xs font-medium text-anthracite sm:px-4 sm:text-sm">
                {recipe.servings}
              </span>
            </div>

            <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
              <div>
                <h3 className="font-display text-lg font-semibold text-anthracite sm:text-xl">Ingredienti</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="flex items-start gap-2.5 text-sm leading-relaxed text-anthracite/75">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tomato-red" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-anthracite sm:text-xl">Preparazione</h3>
                <ol className="mt-4 flex flex-col gap-4">
                  {recipe.steps.map((step, i) => (
                    <li key={step} className="flex gap-4 text-sm leading-relaxed text-anthracite/75">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-basil-green text-xs font-bold text-cream">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-anthracite px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-tomato-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anthracite/40 sm:mt-12 sm:px-7 sm:py-3.5"
            >
              ← Torna a tutte le ricette
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
