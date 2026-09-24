import Image from "next/image"

type LogoProps = {
  className?: string
  invert?: boolean
}

export function Logo({ className = "", invert = false }: LogoProps) {
  return (
    <span className={`relative block ${className}`}>
      <Image
        src={invert ? "/images/logo-rana-cream.png" : "/images/logo-rana-blue.png"}
        alt="Giovanni Rana"
        fill
        priority
        className="object-contain object-left"
      />
    </span>
  )
}
