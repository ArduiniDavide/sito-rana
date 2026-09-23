"use client"

import Image from "next/image"
import type { Recipe } from "@/lib/recipes"

type RecipeCardProps = {
  recipe: Recipe
  onOpen: (slug: string) => void
}

export function RecipeCard({ recipe, onOpen }: RecipeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(recipe.slug)}
      className="group relative flex h-full w-[80vw] flex-shrink-0 flex-col overflow-hidden rounded-3xl bg-card text-left shadow-md shadow-anthracite/5 ring-1 ring-anthracite/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-anthracite/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato-red focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-[46vw] lg:w-[23vw]"
      aria-label={`Vedi la ricetta ${recipe.name}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 23vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite/70 via-anthracite/0 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-anthracite backdrop-blur-sm sm:left-4 sm:text-[11px]">
          {recipe.category}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-anthracite/60 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm sm:bottom-4 sm:right-4">
          {recipe.time}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-anthracite sm:text-xl">
          {recipe.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-anthracite/65">{recipe.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-tomato-red transition-transform duration-300 group-hover:translate-x-1">
          Vedi ricetta
          <span aria-hidden>→</span>
        </span>
      </div>
    </button>
  )
}
