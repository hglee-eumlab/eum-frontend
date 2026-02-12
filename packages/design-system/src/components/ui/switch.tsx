import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const switchRootVariants = cva(
  [
    // Base styles
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
    // States
    'data-[state=checked]:bg-[var(--bg-brand-secondary)]',
    'data-[state=unchecked]:bg-neutral-200',
    // Hover
    'data-[state=checked]:hover:bg-primary-600',
    'data-[state=unchecked]:hover:bg-neutral-300',
    // Disabled
    'disabled:cursor-not-allowed disabled:opacity-50',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-state-focused)] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ],
  {
    variants: {
      size: {
        md: 'h-5 w-10',
        sm: 'h-4 w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-common-white shadow-sm ring-0 transition-transform',
  ],
  {
    variants: {
      size: {
        md: 'h-4 w-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        sm: 'h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchRootVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchRootVariants({ size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

// Export both Switch and Toggle for E-um naming convention
export { Switch, Switch as Toggle };
