import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@eum/design-system";

type TypoToken = {
  name: string;
  className: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  preview: string;
};

type TypoCategory = {
  name: string;
  description: string;
  tokens: TypoToken[];
};

const primitiveTokens = {
  sizes: [
    { name: "typo-size-xs", value: "0.75rem (12px)" },
    { name: "typo-size-s", value: "0.875rem (14px)" },
    { name: "typo-size-m", value: "1rem (16px)" },
    { name: "typo-size-l", value: "1.125rem (18px)" },
    { name: "typo-size-xl", value: "1.25rem (20px)" },
    { name: "typo-size-2xl", value: "1.5rem (24px)" },
    { name: "typo-size-3xl", value: "1.75rem (28px)" },
  ],
  weights: [
    { name: "typo-weight-medium", value: "500" },
    { name: "typo-weight-semibold", value: "600" },
    { name: "typo-weight-bold", value: "700" },
  ],
  lineHeights: [
    { name: "typo-leading-tight", value: "1.3 (130%)" },
    { name: "typo-leading-normal", value: "1.5 (150%)" },
  ],
  letterSpacings: [
    { name: "typo-tracking-tight", value: "-0.04em (-4%)" },
    { name: "typo-tracking-normal", value: "-0.02em (-2%)" },
  ],
};

const typoCategories: TypoCategory[] = [
  {
    name: "Heading",
    description: "페이지나 섹션의 주요 제목에 사용",
    tokens: [
      {
        name: "typo-heading-large-700",
        className: "typo-heading-large-700",
        size: "3xl (28px)",
        weight: "Bold (700)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Large Bold",
      },
      {
        name: "typo-heading-large-600",
        className: "typo-heading-large-600",
        size: "3xl (28px)",
        weight: "Semibold (600)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Large Semibold",
      },
      {
        name: "typo-heading-medium-700",
        className: "typo-heading-medium-700",
        size: "2xl (24px)",
        weight: "Bold (700)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Medium Bold",
      },
      {
        name: "typo-heading-medium-600",
        className: "typo-heading-medium-600",
        size: "2xl (24px)",
        weight: "Semibold (600)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Medium Semibold",
      },
      {
        name: "typo-heading-small-700",
        className: "typo-heading-small-700",
        size: "xl (20px)",
        weight: "Bold (700)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Small Bold",
      },
      {
        name: "typo-heading-small-600",
        className: "typo-heading-small-600",
        size: "xl (20px)",
        weight: "Semibold (600)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "헤딩 Small Semibold",
      },
    ],
  },
  {
    name: "Title",
    description: "카드나 컴포넌트 내부 제목에 사용",
    tokens: [
      {
        name: "typo-title-large-700",
        className: "typo-title-large-700",
        size: "l (18px)",
        weight: "Bold (700)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "타이틀 Large Bold",
      },
      {
        name: "typo-title-large-600",
        className: "typo-title-large-600",
        size: "l (18px)",
        weight: "Semibold (600)",
        lineHeight: "130%",
        letterSpacing: "-4%",
        preview: "타이틀 Large Semibold",
      },
      {
        name: "typo-title-medium-700",
        className: "typo-title-medium-700",
        size: "m (16px)",
        weight: "Bold (700)",
        lineHeight: "130%",
        letterSpacing: "-2%",
        preview: "타이틀 Medium Bold",
      },
      {
        name: "typo-title-medium-600",
        className: "typo-title-medium-600",
        size: "m (16px)",
        weight: "Semibold (600)",
        lineHeight: "130%",
        letterSpacing: "-2%",
        preview: "타이틀 Medium Semibold",
      },
    ],
  },
  {
    name: "Body",
    description: "본문 텍스트에 사용",
    tokens: [
      {
        name: "typo-body-large-600",
        className: "typo-body-large-600",
        size: "m (16px)",
        weight: "Semibold (600)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview:
          "바디 Large Semibold 텍스트입니다. 본문에서 강조가 필요할 때 사용합니다.",
      },
      {
        name: "typo-body-large-500",
        className: "typo-body-large-500",
        size: "m (16px)",
        weight: "Medium (500)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview:
          "바디 Large Medium 텍스트입니다. 기본 본문 텍스트로 사용합니다.",
      },
      {
        name: "typo-body-medium-600",
        className: "typo-body-medium-600",
        size: "s (14px)",
        weight: "Semibold (600)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview:
          "바디 Medium Semibold 텍스트입니다. 보조 텍스트에서 강조가 필요할 때 사용합니다.",
      },
      {
        name: "typo-body-medium-500",
        className: "typo-body-medium-500",
        size: "s (14px)",
        weight: "Medium (500)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview: "바디 Medium 텍스트입니다. 보조 본문 텍스트로 사용합니다.",
      },
      {
        name: "typo-body-small-600",
        className: "typo-body-small-600",
        size: "xs (12px)",
        weight: "Semibold (600)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview:
          "바디 Small Semibold 텍스트입니다. 작은 텍스트에서 강조가 필요할 때 사용합니다.",
      },
      {
        name: "typo-body-small-500",
        className: "typo-body-small-500",
        size: "xs (12px)",
        weight: "Medium (500)",
        lineHeight: "150%",
        letterSpacing: "-2%",
        preview:
          "바디 Small 텍스트입니다. 가장 작은 본문 텍스트로 사용합니다.",
      },
    ],
  },
  {
    name: "Label",
    description: "폼 필드, 버튼 등 UI 요소의 레이블에 사용",
    tokens: [
      {
        name: "typo-label-large-600",
        className: "typo-label-large-600",
        size: "m (16px)",
        weight: "Semibold (600)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "레이블 Large Semibold",
      },
      {
        name: "typo-label-large-500",
        className: "typo-label-large-500",
        size: "m (16px)",
        weight: "Medium (500)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "레이블 Large Medium",
      },
      {
        name: "typo-label-medium-600",
        className: "typo-label-medium-600",
        size: "s (14px)",
        weight: "Semibold (600)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "레이블 Medium Semibold",
      },
      {
        name: "typo-label-medium-500",
        className: "typo-label-medium-500",
        size: "s (14px)",
        weight: "Medium (500)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "레이블 Medium",
      },
    ],
  },
  {
    name: "Caption",
    description: "보조 설명, 날짜, 메타 정보에 사용",
    tokens: [
      {
        name: "typo-caption-large-600",
        className: "typo-caption-large-600",
        size: "xs (12px)",
        weight: "Semibold (600)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "캡션 Large Semibold",
      },
      {
        name: "typo-caption-large-500",
        className: "typo-caption-large-500",
        size: "xs (12px)",
        weight: "Medium (500)",
        lineHeight: "auto",
        letterSpacing: "-2%",
        preview: "캡션 Large Medium",
      },
    ],
  },
];

const TypographyPage = () => {
  return (
    <>
      <header className="border-b border-neutral-150 bg-background px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            E-um Design System
          </h1>
          <p className="mt-2 text-lg text-neutral-500">Typography Tokens</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-12">
        {/* Font Family */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            Font Family
          </h2>
          <div className="rounded-xl border border-neutral-150 bg-neutral-50 p-8">
            <p className="mb-6 text-2xl font-semibold text-neutral-700">
              Pretendard Variable
            </p>
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="w-16 text-sm text-neutral-500">Light</span>
                <p className="flex-1 text-3xl font-light text-neutral-800">
                  가나다라 The quick brown fox 0123456789
                </p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-16 text-sm text-neutral-500">Regular</span>
                <p className="flex-1 text-3xl font-normal text-neutral-800">
                  가나다라 The quick brown fox 0123456789
                </p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-16 text-sm text-neutral-500">Medium</span>
                <p className="flex-1 text-3xl font-medium text-neutral-800">
                  가나다라 The quick brown fox 0123456789
                </p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-16 text-sm text-neutral-500">SemiBold</span>
                <p className="flex-1 text-3xl font-semibold text-neutral-800">
                  가나다라 The quick brown fox 0123456789
                </p>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="w-16 text-sm text-neutral-500">Bold</span>
                <p className="flex-1 text-3xl font-bold text-neutral-800">
                  가나다라 The quick brown fox 0123456789
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Primitive Tokens */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            Primitive Tokens
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Sizes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-700">
                  Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {primitiveTokens.sizes.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center justify-between rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                    >
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                      <span className="text-sm font-medium text-neutral-800">
                        {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-700">
                  Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {primitiveTokens.weights.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center justify-between rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                    >
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                      <span className="text-sm font-medium text-neutral-800">
                        {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Line Heights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-700">
                  Line Height
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {primitiveTokens.lineHeights.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center justify-between rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                    >
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                      <span className="text-sm font-medium text-neutral-800">
                        {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Letter Spacing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-neutral-700">
                  Letter Spacing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {primitiveTokens.letterSpacings.map((token) => (
                    <div
                      key={token.name}
                      className="flex items-center justify-between rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                    >
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                      <span className="text-sm font-medium text-neutral-800">
                        {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Composite Typography Tokens */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            Composite Tokens
          </h2>
          <div className="space-y-12">
            {typoCategories.map((category) => (
              <div key={category.name}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-neutral-800">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-4">
                  {category.tokens.map((token) => (
                    <div
                      key={token.name}
                      className="rounded-xl border border-neutral-150 p-6 transition-colors hover:bg-neutral-50"
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-neutral-800 px-2.5 py-1 font-mono text-xs text-white">
                          .{token.name}
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                          {token.size}
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                          {token.weight}
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                          LH {token.lineHeight}
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                          LS {token.letterSpacing}
                        </span>
                      </div>
                      <div className="rounded-lg bg-neutral-50 px-6 py-8">
                        <p className={`${token.className} text-neutral-800`}>
                          {token.preview}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-neutral-800">Usage</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-150 p-6">
              <h3 className="mb-3 text-lg font-semibold text-neutral-700">
                Composite Class
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-neutral-800 p-4 text-sm text-neutral-100">
                <code>{`<h1 className="typo-heading-large-700">제목</h1>
<p className="typo-body-large-500">본문 텍스트</p>
<span className="typo-caption-large-500">캡션</span>`}</code>
              </pre>
            </div>
            <div className="rounded-xl border border-neutral-150 p-6">
              <h3 className="mb-3 text-lg font-semibold text-neutral-700">
                Tailwind Utilities
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-neutral-800 p-4 text-sm text-neutral-100">
                <code>{`<p className="text-typo-m font-medium leading-typo-normal tracking-typo-normal">
  개별 토큰 조합
</p>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute("/design-system/typography")({
  component: TypographyPage,
});
