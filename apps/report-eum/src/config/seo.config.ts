export const SEO_CONFIG = {
  siteUrl: "https://report.eum.com",
  title: "Report EUM",
  description: "Report EUM - E-um 리포트 서비스",
  keywords: "report, eum, analytics, dashboard, 리포트",
  ogImage: "https://report.eum.com/og.png",
  locale: "ko_KR",
} as const;

export const PAGE_SEO: Record<
  string,
  {
    title: string;
    description: string;
    keywords?: string;
    priority: string;
    changefreq: string;
  }
> = {
  "/": {
    title: "Home",
    description: "Report EUM 홈",
    priority: "1.0",
    changefreq: "weekly",
  },
  "/design-system": {
    title: "Design System",
    description: "E-um 디자인 시스템 가이드",
    priority: "0.8",
    changefreq: "monthly",
  },
  "/design-system/colors": {
    title: "Colors",
    description: "E-um 디자인 시스템 컬러 토큰",
    priority: "0.7",
    changefreq: "monthly",
  },
  "/design-system/components": {
    title: "Components",
    description: "E-um 디자인 시스템 UI 컴포넌트",
    priority: "0.7",
    changefreq: "monthly",
  },
  "/design-system/typography": {
    title: "Typography",
    description: "E-um 디자인 시스템 타이포그래피",
    priority: "0.7",
    changefreq: "monthly",
  },
  "/design-system/sizing": {
    title: "Sizing",
    description: "E-um 디자인 시스템 사이징 토큰",
    priority: "0.7",
    changefreq: "monthly",
  },
};

export const INDEXABLE_ROUTES = ["/"];
export const SSG_ROUTES = ["/"];
