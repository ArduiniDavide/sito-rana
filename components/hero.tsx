"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { animate, stagger } from "animejs"
import { AnimatedText } from "@/components/animated-text"
import { IMAGES } from "@/lib/images"

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      if (introRef.current) gsap.set(introRef.current, { opacity: 1, y: 0 })
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0 })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 })
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1 })
      return
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (imageRef.current) gsap.set(imageRef.current, { y: y * 0.35 })
        if (overlayRef.current) gsap.set(overlayRef.current, { opacity: Math.min(1, y / 600) })
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const tl: ReturnType<typeof animate> | undefined = animate(
      [badgeRef.current, introRef.current, ctaRef.current].filter(Boolean) as HTMLElement[],
      {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger([600, 900, 1100]),
        duration: 1100,
        ease: "out(4)",
      },
    )

    const failSafe = window.setTimeout(() => {
      if (introRef.current) gsap.set(introRef.current, { opacity: 1, y: 0 })
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0 })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 })
    }, 3000)

    return () => {
      window.clearTimeout(failSafe)
      window.removeEventListener("scroll", onScroll)
      tl?.pause()
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-anthracite"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div ref={imageRef} className="absolute inset-0 -top-24 h-[calc(100%+6rem)] w-full">
        <Image
          src={IMAGES.hero}
          alt="Famiglia italiana prepara pasta fresca a mano in cucina"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(41,39,37,0.55) 0%, rgba(41,39,37,0.15) 35%, rgba(41,39,37,0.35) 65%, rgba(41,39,37,0.92) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-anthracite/50 via-transparent to-transparent" />

      <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-pasta-yellow/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -left-16 bottom-24 h-56 w-56 rounded-full bg-tomato-red/25 blur-3xl" />

      <div
        className="relative z-10 flex w-full flex-col gap-6 px-5 pb-16 sm:gap-8 sm:px-10 sm:pb-24 lg:px-16"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 4rem)" }}
      >
        <div className="max-w-4xl">
          <span
            ref={badgeRef}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm opacity-0 sm:mb-6 sm:text-xs"
          >
            Pasta fresca artigianale
          </span>

          <AnimatedText
            as="h1"
            text={"La tradizione italiana\nche si fa a mano, ogni giorno."}
            splitBy="lines"
            start="top 100%"
            className="font-display text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-cream"
          />

          <div
            ref={introRef}
            className="mt-6 flex flex-col gap-6 opacity-0 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
          >
            <p className="max-w-md text-sm leading-relaxed text-cream/80 sm:text-base sm:text-lg">
              Ingredienti veri, ricette di famiglia e la cura artigianale di chi crede che il buon cibo unisca le
              persone attorno a un tavolo.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 opacity-0 sm:gap-4">
              <a
                href="#ricette"
                className="group inline-flex items-center gap-2 rounded-full bg-tomato-red px-6 py-3 text-xs font-semibold text-cream transition-all duration-300 hover:bg-cream hover:text-anthracite sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Scopri le ricette
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#storia"
                className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-xs font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                La nostra storia
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
