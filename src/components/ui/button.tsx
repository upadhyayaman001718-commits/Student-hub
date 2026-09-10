import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#B15F2C]/30 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#0A0A0A] text-white hover:bg-[#262626] shadow-sm hover:shadow-md border border-black/10",
        accent: "bg-[#B15F2C] text-white hover:bg-[#9E5324] shadow-sm hover:shadow-md border border-[#B15F2C]/20",
        outline:
          "border-[#E2E0DB] bg-white text-[#0A0A0A] shadow-2xs hover:bg-[#F1F0EE] hover:border-[#D4D1C9] hover:text-[#0A0A0A]",
        secondary:
          "bg-[#E7E5E0] text-[#0A0A0A] hover:bg-[#DEDBD4]",
        ghost:
          "text-[#0A0A0A]/70 hover:bg-[#EBE9E4] hover:text-[#0A0A0A]",
        destructive:
          "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200",
        link: "text-[#B15F2C] underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default:
          "h-11 gap-2 px-5 py-2 text-sm",
        xs: "h-7 gap-1 rounded-full px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-full px-4 text-xs font-medium",
        lg: "h-13 gap-2.5 rounded-full px-7 text-base font-bold tracking-tight",
        icon: "size-11 rounded-full",
        "icon-xs": "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-13 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

