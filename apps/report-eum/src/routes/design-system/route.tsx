import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

function DesignSystemLayout() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-150 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-8">
          <Link to="/" className="mr-8 text-sm font-semibold text-neutral-800">
            E-um
          </Link>
          <div className="flex gap-6">
            <Link
              to="/design-system"
              activeOptions={{ exact: true }}
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Overview
            </Link>
            <Link
              to="/design-system/colors"
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Colors
            </Link>
            <Link
              to="/design-system/components"
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Components
            </Link>
            <Link
              to="/design-system/typography"
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Typography
            </Link>
            <Link
              to="/design-system/sizing"
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Sizing
            </Link>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="mt-20 border-t border-neutral-150 bg-neutral-50 px-8 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-neutral-500">
          E-um Design System
        </div>
      </footer>
    </>
  );
}

export const Route = createFileRoute("/design-system")({
  component: DesignSystemLayout,
});
