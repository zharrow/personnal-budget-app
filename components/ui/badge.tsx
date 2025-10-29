import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        blue:
          "border-pastel-blue bg-pastel-blue text-pastel-blue [a&]:hover:scale-105",
        purple:
          "border-pastel-purple bg-pastel-purple text-pastel-purple [a&]:hover:scale-105",
        pink:
          "border-pastel-pink bg-pastel-pink text-pastel-pink [a&]:hover:scale-105",
        green:
          "border-pastel-green bg-pastel-green text-pastel-green [a&]:hover:scale-105",
        yellow:
          "border-pastel-yellow bg-pastel-yellow text-pastel-yellow [a&]:hover:scale-105",
        orange:
          "border-pastel-orange bg-pastel-orange text-pastel-orange [a&]:hover:scale-105",
        red:
          "border-pastel-red bg-pastel-red text-pastel-red [a&]:hover:scale-105",
        teal:
          "border-pastel-teal bg-pastel-teal text-pastel-teal [a&]:hover:scale-105",
        indigo:
          "border-pastel-indigo bg-pastel-indigo text-pastel-indigo [a&]:hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
