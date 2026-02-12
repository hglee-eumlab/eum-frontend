import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription } from "@eum/design-system";
import { Palette, LayoutGrid, Type, Ruler } from "lucide-react";

const DesignSystemIndexPage = () => {
  const navigationItems = [
    {
      to: "/design-system/colors" as const,
      icon: Palette,
      title: "Colors",
      description: "디자인 시스템의 색상 팔레트와 토큰을 확인하세요",
    },
    {
      to: "/design-system/components" as const,
      icon: LayoutGrid,
      title: "Components",
      description: "shadcn/ui 기반 컴포넌트 라이브러리",
    },
    {
      to: "/design-system/typography" as const,
      icon: Type,
      title: "Typography",
      description: "타이포그래피 스케일과 텍스트 스타일",
    },
    {
      to: "/design-system/sizing" as const,
      icon: Ruler,
      title: "Sizing",
      description: "간격, 크기, 레이아웃 시스템",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold text-neutral-800">
          E-um Design System
        </h1>
        <p className="text-lg text-neutral-500">
          shadcn/ui 컴포넌트와 디자인 토큰을 활용한 디자인 시스템
        </p>
      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full cursor-pointer border-neutral-150 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                    <Icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <CardTitle className="text-xl text-neutral-800 transition-colors group-hover:text-primary-500">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-500">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/design-system/")({
  component: DesignSystemIndexPage,
});
