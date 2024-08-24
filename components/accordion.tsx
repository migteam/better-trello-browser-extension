import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { cn } from "../lib/utils";

type AccordionPrimitiveProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
>;
type AccordionProps = AccordionPrimitiveProps;

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ children, ...props }, forwardedRef) => (
  <AccordionPrimitive.Root
    ref={forwardedRef}
    {...props}
    {...(props.type === "single" ? { collapsible: true } : {})}
  >
    {children}
  </AccordionPrimitive.Root>
));

type AccordionTriggerPrimitiveProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>;
type AccordionTriggerProps = AccordionTriggerPrimitiveProps;

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      {...props}
      className={cn("flex items-center w-full", className)}
      ref={forwardedRef}
    >
      <CaretRight
        size={14}
        weight="bold"
        color="currentColor"
        className="mr-1.5 dark:text-white"
      />

      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

type AccordionContentPrimitiveProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>;
type AccordionContentProps = AccordionContentPrimitiveProps;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    {...props}
    className={cn(
      "mt-2 p-2 bg-gray-50 dark:bg-slate-900 rounded-md",
      className
    )}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Content>
));

export const AccordionItem = AccordionPrimitive.Item;
