"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { animate, stagger } from "animejs"
import { IMAGES } from "@/lib/images"
import { BlurText } from "@/components/shiny-text"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const PANELS = [
  {
    image: IMAGES.story.panel1,
    kicker: "1962",
    title: "Un uovo, una farina, una promessa",
    text: "Tutto comincia in un piccolo laboratorio a San Giovanni Lupatoto: Giovanni Rana impasta la sua prima pasta fresca all'uovo, convinto che il gusto di casa non debba mai andare perso.",
  },
  {
    image: IMAGES.story.panel2,
    kicker: "Anni '70",
    title: "La botteguccia diventa un punto di riferimento",
    text: "La qualità artigianale conquista il quartiere. Nasce la prima vera bottega Rana, dove le famiglie tornano ogni settimana per la pasta fresca fatta a mano.",
  },
  {
    image: IMAGES.story.panel3,
    kicker: "Crescita",
    title: "Dall'artigianalità alla produzione responsabile",
    text: "Le ricette restano quelle di sempre, ma la cura si organizza: nuovi spazi, nuove persone, la stessa attenzione al dettaglio di quando si impastava a mano.",
  },
  {
    image: IMAGES.story.panel4,
    kicker: "Oggi",
    title: "Una tavola che unisce le generazioni",
    text: "Dai nonni ai nipoti, la pasta Rana resta il filo che lega le famiglie italiane a tavola: un gesto semplice, ripetuto ogni giorno con la stessa autenticità.",
  },
]

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mobilePanelRefs = useRef<HTMLDivElement[]>([])
  const [isDesktop, setIsDesktop] = useState(false)
  const [activePanel, setActivePanel] = useState(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (isDesktop) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (reduceMotion) {
          mobilePanelRefs.current.forEach((el) => el && (el.style.opacity = "1"))
        } else {
          animate(mobilePanelRefs.current.filter(Boolean), {
            opacity: [0, 1],
            translateY: [48, 0],
            delay: stagger(140),
            duration: 1000,
            ease: "out(4)",
          })
        }
        observer.disconnect()
      },
      { rootMargin: "0px 0px -15% 0px" },
    )

    mobilePanelRefs.current.filter(Boolean).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return

    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    let st: ScrollTrigger | undefined

    const setup = () => {
      st?.kill()
      const distance = track.scrollWidth - container.clientWidth
      if (distance <= 0) return

      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${distance}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance * self.progress })
          setActivePanel(Math.min(PANELS.length - 1, Math.round(self.progress * (PANELS.length - 1))))
        },
      })
      scrollTriggerRef.current = st
    }

    setup()
    const onResize = () => {
      st?.kill()
      setup()
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      st?.kill()
      scrollTriggerRef.current = null
    }
  }, [isDesktop])

  const goToPanel = (index: number) => {
    const trigger = scrollTriggerRef.current
    if (!trigger) return
    const progress = index / (PANELS.length - 1)
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
    setActivePanel(index)
  }

  if (!isDesktop) {
    return (
      <section id="storia" className="relative bg-anthracite py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-basil-green">
              La nostra storia
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
              <BlurText text="Quattro capitoli di una famiglia in cucina" />
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            {PANELS.map((panel, i) => (
              <article
                key={panel.title}
                ref={(el) => { if (el) mobilePanelRefs.current[i] = el }}
                className="flex flex-col gap-5 opacity-0"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-anthracite/50 via-transparent to-transparent" />
                </div>
                <div>
                  <span className="font-display text-5xl font-bold text-pasta-yellow/90">
                    {panel.kicker}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-cream">
                    {panel.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-cream/70">{panel.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="storia" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-anthracite">
      <div
        ref={trackRef}
        className="flex h-full w-max will-change-transform"
        style={{ touchAction: "pan-y" }}
      >
        {PANELS.map((panel, i) => (
          <article
            key={panel.title}
            className="relative flex h-full w-[100vw] flex-shrink-0 items-center justify-center px-10 lg:px-20"
          >
            <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 via-transparent to-transparent" />
              </div>

              <div className={`order-2 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="font-display text-6xl font-bold text-pasta-yellow/90 sm:text-7xl">
                  {panel.kicker}
                </span>
                <h3 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-[2.6rem]">
                  {panel.title}
                </h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">{panel.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" aria-label="Seleziona un capitolo della storia">
        {PANELS.map((panel, i) => (
          <button
            key={panel.title}
            type="button"
            onClick={() => goToPanel(i)}
            aria-label={`Vai al capitolo ${i + 1}: ${panel.kicker}`}
            aria-current={activePanel === i ? "step" : undefined}
            className="group flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pasta-yellow"
          >
            <span className={`block h-2 rounded-full transition-all duration-300 ${activePanel === i ? "w-7 bg-pasta-yellow" : "w-2 bg-cream/45 group-hover:bg-cream/80"}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
