import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#B15F2C]/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0A0A0A] text-white shadow-2xs",
        accent:
          "border-transparent bg-[#B15F2C] text-white shadow-2xs",
        secondary:
          "border-[#E2E0DB] bg-[#E7E5E0] text-[#0A0A0A] hover:bg-[#DEDBD4]",
        destructive:
          "border-transparent bg-rose-500 text-white",
        outline: "text-[#0A0A0A] border-[#E2E0DB] bg-white hover:bg-[#F1F0EE]",
        sky: "border-sky-200 bg-sky-50 text-sky-800",
        navy: "border-[#B15F2C]/20 bg-[#B15F2C]/10 text-[#B15F2C]",
        violet: "border-purple-200 bg-purple-50 text-purple-800",
        emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
        amber: "border-amber-200 bg-amber-50 text-amber-800",
        purple: "border-purple-200 bg-purple-50 text-purple-800",
        orange: "border-[#B15F2C]/30 bg-[#B15F2C]/10 text-[#B15F2C]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

