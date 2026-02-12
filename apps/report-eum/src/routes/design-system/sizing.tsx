import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@eum/design-system";

const spaceTokens = [
  { name: "size-space-0", value: "0px", px: 0 },
  { name: "size-space-2", value: "2px", px: 2 },
  { name: "size-space-4", value: "4px", px: 4 },
  { name: "size-space-6", value: "6px", px: 6 },
  { name: "size-space-8", value: "8px", px: 8 },
  { name: "size-space-12", value: "12px", px: 12 },
  { name: "size-space-14", value: "14px", px: 14 },
  { name: "size-space-16", value: "16px", px: 16 },
  { name: "size-space-18", value: "18px", px: 18 },
  { name: "size-space-20", value: "20px", px: 20 },
  { name: "size-space-24", value: "24px", px: 24 },
  { name: "size-space-28", value: "28px", px: 28 },
  { name: "size-space-32", value: "32px", px: 32 },
  { name: "size-space-36", value: "36px", px: 36 },
  { name: "size-space-40", value: "40px", px: 40 },
  { name: "size-space-48", value: "48px", px: 48 },
  { name: "size-space-52", value: "52px", px: 52 },
  { name: "size-space-56", value: "56px", px: 56 },
  { name: "size-space-60", value: "60px", px: 60 },
  { name: "size-space-64", value: "64px", px: 64 },
  { name: "size-space-72", value: "72px", px: 72 },
];

const dimensionTokens = [
  { name: "size-dimension-2", value: "2px", px: 2 },
  { name: "size-dimension-4", value: "4px", px: 4 },
  { name: "size-dimension-8", value: "8px", px: 8 },
  { name: "size-dimension-12", value: "12px", px: 12 },
  { name: "size-dimension-16", value: "16px", px: 16 },
  { name: "size-dimension-20", value: "20px", px: 20 },
  { name: "size-dimension-24", value: "24px", px: 24 },
  { name: "size-dimension-32", value: "32px", px: 32 },
  { name: "size-dimension-36", value: "36px", px: 36 },
  { name: "size-dimension-40", value: "40px", px: 40 },
  { name: "size-dimension-44", value: "44px", px: 44 },
  { name: "size-dimension-48", value: "48px", px: 48 },
  { name: "size-dimension-52", value: "52px", px: 52 },
  { name: "size-dimension-56", value: "56px", px: 56 },
  { name: "size-dimension-60", value: "60px", px: 60 },
  { name: "size-dimension-64", value: "64px", px: 64 },
  { name: "size-dimension-72", value: "72px", px: 72 },
];

const radiusTokens = [
  { name: "radius-none", value: "0px", px: 0 },
  { name: "radius-xs", value: "4px", px: 4 },
  { name: "radius-s", value: "8px", px: 8 },
  { name: "radius-m", value: "12px", px: 12 },
  { name: "radius-l", value: "16px", px: 16 },
  { name: "radius-xl", value: "20px", px: 20 },
  { name: "radius-full", value: "9999px", px: 9999 },
];

const SizingPage = () => {
  return (
    <>
      <header className="border-b border-neutral-150 bg-background px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            E-um Design System
          </h1>
          <p className="mt-2 text-lg text-neutral-500">
            Space, Dimension &amp; Radius Tokens
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-12">
        <Tabs defaultValue="space" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="space">Space</TabsTrigger>
            <TabsTrigger value="dimension">Dimension</TabsTrigger>
            <TabsTrigger value="radius">Radius</TabsTrigger>
          </TabsList>

          {/* Space Tokens Tab */}
          <TabsContent value="space">
            <section className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-800">Space</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  패딩, 마진, 갭 등 여백에 사용하는 토큰 (p-sp-*, m-sp-*,
                  gap-sp-*)
                </p>
              </div>
              <div className="space-y-3">
                {spaceTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex cursor-default items-center gap-4 rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <div className="w-44 shrink-0">
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                    </div>
                    <div className="w-16 shrink-0 text-sm font-medium text-neutral-800">
                      {token.value}
                    </div>
                    <div className="flex flex-1 items-center">
                      <div
                        className="h-3 rounded-sm bg-gradient-to-r from-primary-200 to-primary-400"
                        style={{ width: `${Math.min(token.px, 400)}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Dimension Tokens Tab */}
          <TabsContent value="dimension">
            <section className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-800">
                  Dimension
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  너비, 높이 등 크기에 사용하는 토큰 (w-dim-*, h-dim-*,
                  size-dim-*)
                </p>
              </div>
              <div className="space-y-3">
                {dimensionTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex cursor-default items-center gap-4 rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <div className="w-48 shrink-0">
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                    </div>
                    <div className="w-16 shrink-0 text-sm font-medium text-neutral-800">
                      {token.value}
                    </div>
                    <div className="flex flex-1 items-center">
                      <div
                        className="rounded-md bg-primary-300 shadow-sm"
                        style={{
                          width: `${Math.min(token.px, 72)}px`,
                          height: `${Math.min(token.px, 72)}px`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Radius Tokens Tab */}
          <TabsContent value="radius">
            <section className="mb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-800">Radius</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  라운드는 4px 단위로 적용하며, 상황에 맞춰 유연하게 사용합니다.
                  (rounded-e-*)
                </p>
              </div>

              {/* Visual Radius Preview */}
              <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {radiusTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="flex h-28 w-28 items-center justify-center border-2 border-primary-400 bg-primary-50 shadow-md"
                      style={{
                        borderRadius:
                          token.px === 9999 ? "9999px" : `${token.px}px`,
                      }}
                    >
                      <span className="text-sm font-semibold text-primary-500">
                        {token.value}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-xs text-neutral-600">
                        --{token.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Radius Token List */}
              <div className="space-y-3">
                {radiusTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex cursor-default items-center gap-4 rounded-lg border border-neutral-150 px-4 py-3 transition-colors hover:bg-neutral-50"
                  >
                    <div className="w-36 shrink-0">
                      <span className="font-mono text-sm text-neutral-600">
                        --{token.name}
                      </span>
                    </div>
                    <div className="w-16 shrink-0 text-sm font-medium text-neutral-800">
                      {token.value}
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <span className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-600">
                        rounded-e-{token.name.replace("radius-", "")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* Usage Guide */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-neutral-800">Usage</h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-150 p-6">
              <h3 className="mb-3 text-lg font-semibold text-neutral-700">
                Space
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-neutral-800 p-4 text-sm text-neutral-100">
                <code>{`<div className="p-sp-16">        {/* padding: 16px */}
<div className="mt-sp-8">        {/* margin-top: 8px */}
<div className="gap-sp-12">      {/* gap: 12px */}
<div className="px-sp-24 py-sp-16"> {/* padding: 16px 24px */}`}</code>
              </pre>
            </div>
            <div className="rounded-xl border border-neutral-150 p-6">
              <h3 className="mb-3 text-lg font-semibold text-neutral-700">
                Dimension
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-neutral-800 p-4 text-sm text-neutral-100">
                <code>{`<div className="w-dim-48 h-dim-48">  {/* 48x48px */}
<div className="w-dim-64">          {/* width: 64px */}
<div className="min-h-dim-32">      {/* min-height: 32px */}`}</code>
              </pre>
            </div>
            <div className="rounded-xl border border-neutral-150 p-6">
              <h3 className="mb-3 text-lg font-semibold text-neutral-700">
                Radius
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-neutral-800 p-4 text-sm text-neutral-100">
                <code>{`<div className="rounded-e-none">   {/* border-radius: 0px */}
<div className="rounded-e-xs">     {/* border-radius: 4px */}
<div className="rounded-e-m">      {/* border-radius: 12px */}
<div className="rounded-e-full">   {/* border-radius: 9999px */}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute("/design-system/sizing")({
  component: SizingPage,
});
