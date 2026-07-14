import { initials } from "@/lib/data"
import { cn } from "@/lib/utils"

export function UserAvatar({
  name,
  color,
  size = 44,
  ring = false,
  className,
}: {
  name: string
  color: string
  size?: number
  ring?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-ig-text",
        ring && "ring-2 ring-gift ring-offset-2 ring-offset-ig-bg",
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.36,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
