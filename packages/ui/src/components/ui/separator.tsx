import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const separatorVariants = cva('shrink-0', {
  variants: {
    variant: {
      default: 'bg-[var(--border-base-secondary)]',
      subtle: 'bg-[var(--border-base-tertiary)]',
      strong: 'bg-[var(--border-base-primary)]',
    },
    spacing: {
      none: '',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'none',
  },
});

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, variant, spacing, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, spacing }),
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

// Export as Divider alias for E-um naming convention
const Divider = Separator;
Divider.displayName = 'Divider';

export { Separator, Divider };
export type { SeparatorProps };
