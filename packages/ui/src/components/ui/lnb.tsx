import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';
import { ChevronDown } from 'lucide-react';

// LNB Root Container - 240px wide with white background
const LNB = React.forwardRef<
  HTMLElement,
  React.ComponentProps<'nav'>
>(({ className, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        'flex h-full w-[240px] flex-col bg-[var(--bg-base-primary)]',
        className
      )}
      {...props}
    />
  );
});
LNB.displayName = 'LNB';

// LNB Title - Section title text
const LNBTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'typo-label-medium-600 px-sp-12 py-sp-8 text-[var(--text-base-tertiary)]',
        className
      )}
      {...props}
    />
  );
});
LNBTitle.displayName = 'LNBTitle';

// LNB Group - Groups menu items under a title
const LNBGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-sp-2', className)}
      {...props}
    />
  );
});
LNBGroup.displayName = 'LNBGroup';

// LNB Header - Header section with border-bottom
const LNBHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-14 items-center border-b border-[var(--border-base-secondary)] bg-[var(--bg-base-primary)] px-sp-16',
        className
      )}
      {...props}
    />
  );
});
LNBHeader.displayName = 'LNBHeader';

// LNB Footer - Footer section with border-top
const LNBFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-t border-[var(--border-base-secondary)] bg-[var(--bg-base-primary)] px-sp-16 py-sp-12',
        className
      )}
      {...props}
    />
  );
});
LNBFooter.displayName = 'LNBFooter';

// LNB Content - Scrollable content area
const LNBContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-y-auto bg-[var(--bg-base-primary)] px-sp-12 py-sp-16',
        className
      )}
      {...props}
    />
  );
});
LNBContent.displayName = 'LNBContent';

// LNB Item variants with states
const lnbItemVariants = cva(
  [
    // Base styles - Figma specs: h-44px, px-16, py-12, gap-8, radius-8px
    'flex h-[44px] w-full items-center gap-sp-8 rounded-[var(--radius-s)] px-sp-16 py-sp-12',
    'text-sm font-bold tracking-[-0.28px] transition-colors',
    // Focus styles
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-state-focused)]',
    // Icon sizing - 24px
    '[&>svg]:size-6 [&>svg]:shrink-0',
  ],
  {
    variants: {
      isActive: {
        true: [
          // Selected state - light blue background, dark blue text
          'bg-[var(--bg-brand-tertiary)] text-[var(--text-brand-secondary)]',
          '[&>svg]:text-[var(--icon-brand-secondary)]',
          // No hover change on selected
          'hover:bg-[var(--bg-brand-tertiary)]',
        ],
        false: [
          // Normal state - transparent bg, neutral text
          'bg-transparent text-[var(--text-base-primary)]',
          // Hover state - light gray background
          'hover:bg-[var(--bg-base-secondary)]',
          // Active/pressed state - darker gray
          'active:bg-[var(--bg-base-tertiary)]',
          // Icon color
          '[&>svg]:text-[var(--icon-base-secondary)]',
        ],
      },
      isDisabled: {
        true: [
          // Disabled state - specific colors, not just opacity
          'pointer-events-none cursor-not-allowed',
          'bg-[var(--bg-state-disabled)] text-[var(--text-state-disabled)]',
          '[&>svg]:text-[var(--text-state-disabled)]',
        ],
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      isActive: false,
      isDisabled: false,
    },
  }
);

// LNB Item - Individual menu item
const LNBItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    icon?: React.ReactNode;
  } & VariantProps<typeof lnbItemVariants>
>(({
  asChild = false,
  isActive = false,
  isDisabled = false,
  icon,
  className,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={cn(lnbItemVariants({ isActive, isDisabled }), className)}
      {...props}
    >
      {icon && <span className="flex size-6 items-center justify-center">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </Comp>
  );
});
LNBItem.displayName = 'LNBItem';

// LNB Collapsible Item - Menu item with dropdown functionality
const LNBCollapsibleItem = ({
  icon,
  defaultOpen = false,
  children,
  className,
}: {
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: [React.ReactNode, React.ReactNode]; // [label, content]
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [label, content] = children;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'flex h-[44px] w-full items-center gap-sp-8 rounded-[var(--radius-s)] px-sp-16 py-sp-12',
            'text-sm font-bold tracking-[-0.28px] transition-colors',
            'outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-state-focused)]',
            'bg-transparent text-[var(--text-base-primary)]',
            'hover:bg-[var(--bg-base-secondary)]',
            'active:bg-[var(--bg-base-tertiary)]',
            '[&>svg]:size-6 [&>svg]:shrink-0',
            '[&>svg]:text-[var(--icon-base-secondary)]',
            className
          )}
        >
          {icon && <span className="flex size-6 items-center justify-center">{icon}</span>}
          <span className="flex-1 text-left">{label}</span>
          <ChevronDown
            className={cn(
              'size-6 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>{content}</CollapsibleContent>
    </Collapsible>
  );
};
LNBCollapsibleItem.displayName = 'LNBCollapsibleItem';

// LNB Sub Group - Container for sub-menu items
const LNBSubGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'mx-3.5 border-l border-[var(--border-base-secondary)] px-2.5',
        className
      )}
      {...props}
    />
  );
});
LNBSubGroup.displayName = 'LNBSubGroup';

// LNB Sub Item variants
const lnbSubItemVariants = cva(
  [
    // Base styles - smaller than main items, keep h-7 but fix radius
    'flex h-7 w-full items-center gap-2 rounded-[var(--radius-s)] px-2 text-sm font-bold tracking-[-0.28px] transition-colors',
    // Focus styles
    'outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-state-focused)]',
    // Icon sizing
    '[&>svg]:size-[18px] [&>svg]:shrink-0',
  ],
  {
    variants: {
      isActive: {
        true: [
          // Selected state - match parent item selected colors
          'bg-[var(--bg-brand-tertiary)] text-[var(--text-brand-secondary)]',
          '[&>svg]:text-[var(--icon-brand-secondary)]',
          'hover:bg-[var(--bg-brand-tertiary)]',
        ],
        false: [
          // Normal state
          'bg-transparent text-[var(--text-base-primary)]',
          'hover:bg-[var(--bg-base-secondary)]',
          'active:bg-[var(--bg-base-tertiary)]',
          '[&>svg]:text-[var(--icon-base-secondary)]',
        ],
      },
      isDisabled: {
        true: [
          'pointer-events-none cursor-not-allowed',
          'bg-[var(--bg-state-disabled)] text-[var(--text-state-disabled)]',
          '[&>svg]:text-[var(--text-state-disabled)]',
        ],
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      isActive: false,
      isDisabled: false,
    },
  }
);

// LNB Sub Item - Individual sub-menu item
const LNBSubItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
  } & VariantProps<typeof lnbSubItemVariants>
>(({
  asChild = false,
  isActive = false,
  isDisabled = false,
  className,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={cn(lnbSubItemVariants({ isActive, isDisabled }), className)}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
    </Comp>
  );
});
LNBSubItem.displayName = 'LNBSubItem';

export {
  LNB,
  LNBHeader,
  LNBFooter,
  LNBContent,
  LNBTitle,
  LNBGroup,
  LNBItem,
  LNBCollapsibleItem,
  LNBSubGroup,
  LNBSubItem,
  lnbItemVariants,
  lnbSubItemVariants,
};
