import Image from "next/image"

type LogoProps = {
  className?: string
  invert?: boolean
}

export function Logo({ className = "", invert = false }: LogoProps) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src="/images/image.png"
        alt="Giovanni Rana"
        fill
        priority
        className={`object-contain object-left ${invert ? "brightness-0 invert" : ""}`}
      />
    </span>
  )
}
