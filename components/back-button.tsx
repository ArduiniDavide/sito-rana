import Link from "next/link"

type BackButtonProps = {
  className?: string
  variant?: "light" | "dark"
}

export function BackButton({ className = "", variant = "light" }: BackButtonProps) {
  const base =
    variant === "dark"
      ? "border-cream/20 text-cream hover:border-pasta-yellow hover:bg-pasta-yellow hover:text-anthracite focus-visible:ring-pasta-yellow/40"
      : "border-anthracite/15 text-anthracite hover:border-tomato-red hover:bg-tomato-red hover:text-cream focus-visible:ring-tomato-red/40"

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${base} ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Torna alla home
    </Link>
  )
}
