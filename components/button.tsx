import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-700 text-white shadow-sm hover:bg-blue-700/90 shadow-blue-700/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-gray-200 bg-background shadow-sm hover:bg-gray-50 hover:text-gray-900",
        secondary:
          "bg-gray-900 text-white shadow-sm hover:bg-gray-900/80 shadow-gray-900/50",
        ghost:
          "text-gray-700 hover:bg-gray-200 hover:text-gray-800 rounded-full dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 shadow-sm shadow-gray-200 dark:shadow-gray-800 border border-gray-200/50 dark:border-gray-700/50",
        tertiary:
          "text-gray-600 hover:bg-gray-200 bg-gray-100 hover:text-gray-800 rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-2",
        sm: "h-7 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-4 gap-2 text-base",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
