"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium uppercase tracking-widest transition-[background-color,color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1419] [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 active:scale-[0.99]",
        secondary:
          "bg-white/14 text-slate-50 border border-white/28 hover:bg-white/22 active:scale-[0.99]",
        outline:
          "border border-white/40 bg-transparent text-slate-50 hover:bg-white/16 active:scale-[0.99]",
        ghost:
          "bg-transparent text-slate-50 hover:bg-white/14 active:scale-[0.99]",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 rounded-full px-4",
        lg: "h-14 rounded-full px-10 text-[0.8rem]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
