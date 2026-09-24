"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { animate, stagger, createTimer } from "animejs"
import { AnimatedText } from "@/components/animated-text"
import { IMAGES } from "@/lib/images"

const STATS = [
  { value: 1962, suffix: "", label: "L'anno in cui è nata la prima pasta fresca Rana", isYear: true },
  { value: 60, suffix: "+", label: "Anni di esperienza nella pasta fresca artigianale" },
  { value: 3, suffix: "", label: "Generazioni della famiglia Rana coinvolte nel progetto" },
  { value: 100, suffix: "%", label: "Uova italiane selezionate per le nostre ricette" },
]

export function StatisticsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])
  const numberRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        if (reduceMotion) {
          cardRefs.current.forEach((card) => {
            if (card) card.style.opacity = "1"
          })
        } else {
          animate(cardRefs.current.filter(Boolean), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(120),
            duration: 900,
            ease: "out(4)",
          })
        }
        cardObserver.disconnect()
      },
      { rootMargin: "0px 0px -15% 0px" },
    )

    const numberObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        STATS.forEach((stat, i) => {
          const el = numberRefs.current[i]
          if (!el) return

          if (reduceMotion) {
            el.textContent = `${stat.value}${stat.suffix}`
            return
          }

          const counter = { val: 0 }
          animate(counter, {
            val: stat.value,
            duration: 2000,
            ease: "out(3)",
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${stat.suffix}`
            },
          })
        })

        numberObserver.disconnect()
      },
      { rootMargin: "0px 0px -20% 0px" },
    )

    cardObserver.observe(section)
    numberObserver.observe(section)

    return () => {
      cardObserver.disconnect()
      numberObserver.disconnect()
    }
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
            <div
              key={stat.label}
              ref={(el) => {
                if (el) cardRefs.current[i] = el
              }}
              className="border-t border-cream/15 pt-6 opacity-0"
            >
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
