"use client"

import { useCallback, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { StorySection } from "@/components/story-section"
import { StatisticsSection } from "@/components/statistics-section"
import { RecipesSection } from "@/components/recipes-section"
import { RecipeDetail } from "@/components/recipe-detail"
import { Footer } from "@/components/footer"
import { ConsentPopup } from "@/components/consent-popup"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { getRecipeBySlug } from "@/lib/recipes"

export default function Page() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const handleOpen = useCallback((slug: string) => setOpenSlug(slug), [])
  const handleClose = useCallback(() => setOpenSlug(null), [])

  const activeRecipe = openSlug ? getRecipeBySlug(openSlug) ?? null : null

  useSmoothScroll()

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <StorySection />
      <StatisticsSection />
      <RecipesSection onOpenRecipe={handleOpen} />
      <Footer />
      <RecipeDetail recipe={activeRecipe} onClose={handleClose} />
      <ConsentPopup />
    </main>
  )
}
