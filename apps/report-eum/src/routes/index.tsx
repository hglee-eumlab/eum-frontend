import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription } from "@eum/design-system";
import { Palette, LayoutGrid, Type, Ruler } from "lucide-react";

const IndexPage = () => {
  const designSystemItems = [
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
    <>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-150 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-8">
          <Link to="/" className="mr-8 text-sm font-semibold text-neutral-800">
            Report EUM
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Home
            </Link>
            <Link
              to="/design-system"
              activeProps={{
                className: "text-sm font-medium text-primary-500",
              }}
              inactiveProps={{
                className:
                  "text-sm text-neutral-500 hover:text-neutral-800 transition-colors",
              }}
            >
              Design System
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-8 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-neutral-800">
            Report EUM
          </h1>
          <p className="text-lg text-neutral-500">
            E-um 디자인 시스템 기반 리포트 애플리케이션
          </p>
        </div>

        {/* Login/Logout Placeholder */}
        <div className="mb-16 flex justify-center">
          <div className="rounded-xl border border-neutral-150 bg-neutral-50 px-8 py-6 text-center">
            <p className="text-sm text-neutral-500">
              로그인 영역 (OIDC 인증 연동 예정)
            </p>
          </div>
        </div>

        {/* Design System Navigation Cards */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-neutral-800">
            Design System
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {designSystemItems.map((item) => {
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
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-150 py-8">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <p className="text-sm text-neutral-500">Report EUM</p>
        </div>
      </footer>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: IndexPage,
});
