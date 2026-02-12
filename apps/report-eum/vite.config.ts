import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig, type Plugin } from "vite";
import {
  INDEXABLE_ROUTES,
  PAGE_SEO,
  SEO_CONFIG,
  SSG_ROUTES,
} from "./src/config/seo.config";

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SEO_CONFIG.title,
      description: SEO_CONFIG.description,
      url: SEO_CONFIG.siteUrl,
      logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    },
    {
      "@type": "WebApplication",
      name: SEO_CONFIG.title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.description,
    },
  ],
};

const injectSeoPlugin = (): Plugin => ({
  name: "inject-seo",
  transformIndexHtml(html) {
    const seoTags = `
    <title>${SEO_CONFIG.title}</title>
    <meta name="description" content="${SEO_CONFIG.description}" />
    <meta name="keywords" content="${SEO_CONFIG.keywords}" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href="${SEO_CONFIG.siteUrl}/" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${SEO_CONFIG.title}" />
    <meta property="og:description" content="${SEO_CONFIG.description}" />
    <meta property="og:url" content="${SEO_CONFIG.siteUrl}/" />
    <meta property="og:image" content="${SEO_CONFIG.ogImage}" />
    <meta property="og:locale" content="${SEO_CONFIG.locale}" />
    <meta property="og:site_name" content="${SEO_CONFIG.title}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${SEO_CONFIG.title}" />
    <meta name="twitter:description" content="${SEO_CONFIG.description}" />
    <meta name="twitter:image" content="${SEO_CONFIG.ogImage}" />

    <script type="application/ld+json">
${JSON.stringify(jsonLdData, null, 2)}
    </script>
    `;
    return html.replace("%SEO_SCRIPT%", seoTags);
  },
});

const generateSitemapPlugin = (): Plugin => ({
  name: "generate-sitemap",
  closeBundle() {
    const today = new Date().toISOString().split("T")[0];
    const urls = INDEXABLE_ROUTES.map((loc) => {
      const config = PAGE_SEO[loc];
      if (!config) {
        return "";
      }
      return `
  <url>
    <loc>${SEO_CONFIG.siteUrl}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`;
    })
      .filter(Boolean)
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    mkdirSync("dist", { recursive: true });
    writeFileSync("dist/sitemap.xml", sitemap);
  },
});

const exportSeoConfigPlugin = (): Plugin => ({
  name: "export-seo-config",
  closeBundle() {
    mkdirSync("dist", { recursive: true });
    writeFileSync(
      "dist/seo-config.json",
      JSON.stringify({ SEO_CONFIG, PAGE_SEO, SSG_ROUTES }, null, 2),
    );
  },
});

const copySpaFallbackPlugin = (): Plugin => ({
  name: "copy-spa-fallback",
  closeBundle() {
    mkdirSync("dist", { recursive: true });
    copyFileSync("serve.json", "dist/serve.json");
  },
});

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    injectSeoPlugin(),
    generateSitemapPlugin(),
    exportSeoConfigPlugin(),
    copySpaFallbackPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
});
