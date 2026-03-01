import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        nav:"bg-white text-blue h-8 rounded m-3 transition duration-150 hover:bg-pink hover:text-white",
        promo:"bg-blue text-base font-light w-auto text-white h-20 rounded  m-2.5 border-blue transition duration-150 hover:bg-white hover:text-blue hover:border-blue",
        promo2:"bg-white text-base font-light w-auto text-blue h-20 rounded m-0.5 md:text-sm sm:text-sm  xsm:text-xs xsm:h-8 border-white transition duration-150 hover:bg-white hover:text-pink hover:border-pink",
        promo3:"bg-blue text-sm font-light w-fit m-auto text-white h-20 rounded mt-[5px] border-blue transition duration-150 hover:bg-white hover:text-blue hover:border-blue",
        promo4:"bg-blue w-[100px] text-sm font-light w-auto text-white h-10 rounded  m-2.5 border-blue transition duration-150 hover:bg-white hover:text-blue hover:border-blue",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
