import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Building2,
  BarChart3,
  FileText,
  MessageSquare,
  User,
  Bell,
  Trash2,
  Plus,
  FileDown,
  FileUp,
  FolderDown,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "../../lib/utils";

/**
 * E-um Design System Icon Name Mapping
 * Maps Figma icon names to Lucide React components
 */
export const ICON_MAP = {
  // Line style icons
  company: Building2,
  report: BarChart3,
  file: FileText,
  notice: MessageSquare,
  user: User,
  alarm: Bell,
  trash: Trash2,
  plus: Plus,
  exel_download: FileDown,
  exel_upload: FileUp,
  bundle_download: FolderDown,
  check: Check,
  close: X,
  // Fill style icons
  circle_check: CheckCircle2,
  circle_caution: AlertCircle,
  circle_info: Info,
  circle_close: XCircle,
} as const;

export type IconName = keyof typeof ICON_MAP;

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-4", // 16px
      md: "h-5 w-5", // 20px
      lg: "h-6 w-6", // 24px
    },
    color: {
      primary: "text-primary-700", // icon-brand-primary
      secondary: "text-neutral-500", // icon-base-secondary
      tertiary: "text-neutral-400", // icon-base-tertiary
      inverse: "text-common-white", // icon-base-inverse
      disabled: "text-neutral-400 opacity-20", // icon-state-disabled
      success: "text-green-600", // icon-status-success
      danger: "text-red-500", // icon-status-danger
      inherit: "text-current", // currentColor
    },
  },
  defaultVariants: {
    size: "lg",
    color: "inherit",
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "color">,
    VariantProps<typeof iconVariants> {
  /**
   * E-um Design System icon name
   */
  name?: IconName;
  /**
   * Direct Lucide icon component
   */
  icon?: LucideIcon;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, color, name, icon, ...props }, ref) => {
    // Determine which icon component to use
    const IconComponent = name ? ICON_MAP[name] : icon;

    if (!IconComponent) {
      console.warn(
        "Icon: Either 'name' or 'icon' prop must be provided"
      );
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color, className }))}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
