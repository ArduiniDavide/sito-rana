"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatedText } from "@/components/animated-text"
import { IMAGES } from "@/lib/images"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const STATS = [
  { value: 1962, suffix: "", label: "L'anno in cui è nata la prima pasta fresca Rana", isYear: true },
  { value: 60, suffix: "+", label: "Anni di esperienza nella pasta fresca artigianale" },
  { value: 3, suffix: "", label: "Generazioni della famiglia Rana coinvolte nel progetto" },
  { value: 100, suffix: "%", label: "Uova italiane selezionate per le nostre ricette" },
]

export function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const triggers = STATS.map((stat, i) => {
      const el = numberRefs.current[i]
      if (!el) return undefined

      if (reduceMotion) {
        el.textContent = `${stat.value}${stat.suffix}`
        return undefined
      }

      const counter = { val: 0 }
      return ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: stat.value,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${stat.suffix}`
            },
          })
        },
      })
    })

    return () => triggers.forEach((t) => t?.kill())
  }, [])

  return (
    <section id="numeri" ref={sectionRef} className="relative overflow-hidden bg-anthracite py-24 sm:py-32">
      <div className="absolute inset-0 opacity-25">
        <Image
          src={IMAGES.statsBg}
          alt=""
          fill
          className="object-cover object-center"
          role="presentation"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-anthracite via-anthracite/85 to-anthracite" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <AnimatedText
            as="h2"
            text="Numeri che raccontano una storia di famiglia"
            className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl"
          />
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg">
            Non sono solo cifre: sono anni di lavoro, persone, ricette tramandate e la fiducia di chi torna a
            scegliere la nostra pasta.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="border-t border-cream/15 pt-6">
              <span
                ref={(el) => {
                  if (el) numberRefs.current[i] = el
                }}
                className="block font-display text-5xl font-bold tabular-nums text-pasta-yellow sm:text-6xl"
              >
                0
              </span>
              <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-cream/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
