import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { NotFound } from "@/components/not-found";
import { INDEXABLE_ROUTES, PAGE_SEO, SEO_CONFIG } from "@/config/seo.config";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    const pageSeo = PAGE_SEO[pathname];
    const isIndexable = INDEXABLE_ROUTES.includes(pathname);
    const canonicalHref =
      pathname === "/"
        ? `${SEO_CONFIG.siteUrl}/`
        : `${SEO_CONFIG.siteUrl}${pathname}`;

    const upsertHeadTag = <T extends HTMLElement>(
      selector: string,
      create: () => T,
      set: (el: T) => void,
    ) => {
      let element = document.head.querySelector(selector) as T | null;
      if (!element) {
        element = create();
        document.head.appendChild(element);
      }
      set(element);
    };

    upsertHeadTag(
      'meta[name="robots"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "robots");
        return el;
      },
      (el) =>
        el.setAttribute(
          "content",
          isIndexable ? "index, follow" : "noindex, nofollow",
        ),
    );

    upsertHeadTag(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      },
      (el) => el.setAttribute("href", canonicalHref),
    );

    upsertHeadTag(
      'meta[property="og:url"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:url");
        return el;
      },
      (el) => el.setAttribute("content", canonicalHref),
    );

    if (pageSeo) {
      document.title = `${pageSeo.title} | ${SEO_CONFIG.title}`;

      upsertHeadTag(
        'meta[name="description"]',
        () => {
          const el = document.createElement("meta");
          el.setAttribute("name", "description");
          return el;
        },
        (el) => el.setAttribute("content", pageSeo.description),
      );

      if (pageSeo.keywords) {
        upsertHeadTag(
          'meta[name="keywords"]',
          () => {
            const el = document.createElement("meta");
            el.setAttribute("name", "keywords");
            return el;
          },
          (el) => el.setAttribute("content", pageSeo.keywords ?? ""),
        );
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
