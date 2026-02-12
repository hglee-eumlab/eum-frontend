import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-e-s font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-state-focused)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        "primary-fill":
          "bg-primary-800 text-white hover:bg-primary-700 active:bg-primary-900",
        "primary-line":
          "border border-primary-700 text-primary-700 bg-transparent hover:bg-primary-50",
        "neutral-fill":
          "bg-neutral-800 text-white hover:bg-neutral-700 active:bg-neutral-900",
        "neutral-line":
          "border border-neutral-200 text-neutral-800 bg-transparent hover:bg-neutral-50",
        ghost: "text-neutral-800 hover:bg-neutral-50",
        link: "text-primary-700 underline-offset-4 hover:underline",
        destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
      },
      size: {
        lg: "h-14 px-6 text-base gap-2 [&_svg]:size-6",
        md: "h-12 px-5 text-sm gap-2 [&_svg]:size-5",
        sm: "h-10 px-4 text-xs gap-1.5 [&_svg]:size-4",
        icon: "h-12 w-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary-fill",
      size: "md",
    },
  }
);
