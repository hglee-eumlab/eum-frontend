import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@eum/design-system";

type ColorShade = {
  shade: number;
  hex: string;
};

type PrimitiveColorPalette = {
  name: string;
  shades: ColorShade[];
};

type SemanticColor = {
  token: string;
  hex: string;
};

type SemanticCategory = {
  name: string;
  colors: SemanticColor[];
};

const primitiveColorPalettes: PrimitiveColorPalette[] = [
  {
    name: "Primary (Blue)",
    shades: [
      { shade: 50, hex: "#e8effd" },
      { shade: 100, hex: "#d1e0fa" },
      { shade: 150, hex: "#a3c1f5" },
      { shade: 200, hex: "#74a2f1" },
      { shade: 300, hex: "#4683ec" },
      { shade: 400, hex: "#1350b9" },
      { shade: 500, hex: "#0e3c8b" },
      { shade: 600, hex: "#0a285c" },
      { shade: 700, hex: "#08214d" },
      { shade: 800, hex: "#05142e" },
      { shade: 900, hex: "#020a17" },
    ],
  },
  {
    name: "Secondary (Purple)",
    shades: [
      { shade: 50, hex: "#eae8fc" },
      { shade: 100, hex: "#d5d1fa" },
      { shade: 150, hex: "#aca3f5" },
      { shade: 200, hex: "#8276ef" },
      { shade: 300, hex: "#5848ea" },
      { shade: 400, hex: "#4f3ee9" },
      { shade: 500, hex: "#2515b7" },
      { shade: 600, hex: "#1c1089" },
      { shade: 700, hex: "#130a5c" },
      { shade: 800, hex: "#09052e" },
      { shade: 900, hex: "#050317" },
    ],
  },
  {
    name: "Neutral (Gray)",
    shades: [
      { shade: 50, hex: "#f5f5f8" },
      { shade: 100, hex: "#ededf2" },
      { shade: 150, hex: "#e4e4e7" },
      { shade: 200, hex: "#c9c9cf" },
      { shade: 300, hex: "#aeaeb7" },
      { shade: 400, hex: "#93939f" },
      { shade: 500, hex: "#60606c" },
      { shade: 600, hex: "#484851" },
      { shade: 700, hex: "#303036" },
      { shade: 800, hex: "#18181b" },
      { shade: 900, hex: "#0c0c0e" },
    ],
  },
  {
    name: "Red",
    shades: [
      { shade: 50, hex: "#ffeeed" },
      { shade: 100, hex: "#ffe5e3" },
      { shade: 150, hex: "#ffcfcc" },
      { shade: 200, hex: "#ffa099" },
      { shade: 300, hex: "#ff7066" },
      { shade: 400, hex: "#ee392b" },
      { shade: 500, hex: "#cc0e00" },
      { shade: 600, hex: "#990a00" },
      { shade: 700, hex: "#660700" },
      { shade: 800, hex: "#330300" },
      { shade: 900, hex: "#1a0200" },
    ],
  },
  {
    name: "Green",
    shades: [
      { shade: 50, hex: "#ecf8f4" },
      { shade: 100, hex: "#dcf3ea" },
      { shade: 150, hex: "#c8edde" },
      { shade: 200, hex: "#b3e5d2" },
      { shade: 300, hex: "#8dd8bb" },
      { shade: 400, hex: "#67cba5" },
      { shade: 500, hex: "#349872" },
      { shade: 600, hex: "#277255" },
      { shade: 700, hex: "#1a4c39" },
      { shade: 800, hex: "#0d261c" },
      { shade: 900, hex: "#07130e" },
    ],
  },
  {
    name: "Orange",
    shades: [
      { shade: 50, hex: "#fff5f0" },
      { shade: 100, hex: "#ffeae0" },
      { shade: 150, hex: "#ffdccc" },
      { shade: 200, hex: "#ffb999" },
      { shade: 300, hex: "#ff9666" },
      { shade: 400, hex: "#ff7433" },
      { shade: 500, hex: "#c43e00" },
      { shade: 600, hex: "#902d00" },
      { shade: 700, hex: "#662000" },
      { shade: 800, hex: "#331000" },
      { shade: 900, hex: "#1a0800" },
    ],
  },
  {
    name: "Opacity",
    shades: [
      { shade: 50, hex: "#0c0c0e0d" },
      { shade: 100, hex: "#0c0c0e1a" },
      { shade: 200, hex: "#0c0c0e33" },
      { shade: 300, hex: "#0c0c0e4d" },
      { shade: 400, hex: "#0c0c0e66" },
      { shade: 500, hex: "#0c0c0e80" },
      { shade: 600, hex: "#0c0c0e99" },
      { shade: 700, hex: "#0c0c0eb2" },
      { shade: 800, hex: "#0c0c0ecc" },
      { shade: 900, hex: "#0c0c0ee5" },
    ],
  },
];

const semanticCategories: SemanticCategory[] = [
  {
    name: "Text",
    colors: [
      { token: "brand/primary", hex: "#08214d" },
      { token: "brand/secondary", hex: "#0e3c8b" },
      { token: "brand/accent", hex: "#4f3ee9" },
      { token: "base/primary", hex: "#18181b" },
      { token: "base/secondary", hex: "#484851" },
      { token: "base/tertiary", hex: "#60606c" },
      { token: "base/quaternary", hex: "#93939f" },
      { token: "base/inverse", hex: "#ffffff" },
      { token: "state/disabled", hex: "#0c0c0e33" },
      { token: "status/success", hex: "#277255" },
      { token: "status/danger", hex: "#cc0e00" },
    ],
  },
  {
    name: "Border",
    colors: [
      { token: "brand/primary", hex: "#08214d" },
      { token: "brand/subtle", hex: "#d5d1fa" },
      { token: "base/primary", hex: "#c9c9cf" },
      { token: "base/secondary", hex: "#e4e4e7" },
      { token: "base/tertiary", hex: "#ededf2" },
      { token: "state/focused", hex: "#4683ec" },
      { token: "state/selected", hex: "#08214d" },
      { token: "status/success", hex: "#277255" },
      { token: "status/danger", hex: "#cc0e00" },
    ],
  },
  {
    name: "Icon",
    colors: [
      { token: "brand/primary", hex: "#08214d" },
      { token: "brand/secondary", hex: "#0e3c8b" },
      { token: "base/primary", hex: "#18181b" },
      { token: "base/secondary", hex: "#60606c" },
      { token: "base/tertiary", hex: "#93939f" },
      { token: "base/inverse", hex: "#ffffff" },
      { token: "state/disabled", hex: "#0c0c0e33" },
      { token: "status/success", hex: "#277255" },
      { token: "status/danger", hex: "#cc0e00" },
    ],
  },
  {
    name: "Background",
    colors: [
      { token: "brand/primary", hex: "#05142e" },
      { token: "brand/secondary", hex: "#08214d" },
      { token: "brand/tertiary", hex: "#d1e0fa" },
      { token: "brand/quaternary", hex: "#e8effd" },
      { token: "base/primary", hex: "#ffffff" },
      { token: "base/secondary", hex: "#f5f5f8" },
      { token: "base/tertiary", hex: "#e4e4e7" },
      { token: "base/quaternary", hex: "#c9c9cf" },
      { token: "state/disabled", hex: "#0c0c0e0d" },
      { token: "status/success", hex: "#dcf3ea" },
      { token: "status/danger", hex: "#ffe5e3" },
    ],
  },
  {
    name: "Overlay",
    colors: [{ token: "dim", hex: "#0c0c0ecc" }],
  },
];

const CHECKERBOARD =
  "linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%, #e4e4e7), linear-gradient(45deg, #e4e4e7 25%, transparent 25%, transparent 75%, #e4e4e7 75%, #e4e4e7)";

const ColorsPage = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <header className="border-b border-neutral-150 bg-gradient-to-r from-background to-primary-50/30 px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            E-um Design System
          </h1>
          <p className="mt-2 text-lg text-primary-600">Color Tokens</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-12">
        {/* Primitive Colors */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            Primitive Colors
          </h2>
          <div className="space-y-12">
            {primitiveColorPalettes.map((palette) => (
              <div key={palette.name} className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-700">
                  {palette.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {palette.shades.map((shade) => {
                    const isOpacity = palette.name === "Opacity";

                    return (
                      <div
                        key={shade.shade}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="group relative h-24 w-24 cursor-pointer rounded-lg shadow-sm ring-1 ring-neutral-200 transition-transform hover:scale-105"
                          style={{
                            backgroundColor: isOpacity ? "#ffffff" : shade.hex,
                            backgroundImage: isOpacity
                              ? CHECKERBOARD
                              : undefined,
                            backgroundSize: isOpacity ? "8px 8px" : undefined,
                            backgroundPosition: isOpacity
                              ? "0 0, 4px 4px"
                              : undefined,
                          }}
                          onClick={() => handleCopyHex(shade.hex)}
                        >
                          {isOpacity && (
                            <div
                              className="absolute inset-0 rounded-lg"
                              style={{ backgroundColor: shade.hex }}
                            />
                          )}
                          {/* Hover overlay with hex code */}
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="font-mono text-xs font-semibold text-white">
                              {copiedHex === shade.hex ? "Copied!" : shade.hex}
                            </span>
                          </div>
                        </div>
                        <span className="mt-2 text-xs font-medium text-neutral-600">
                          {shade.shade}
                        </span>
                        <span className="mt-0.5 font-mono text-xs text-neutral-500">
                          {shade.hex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            Semantic Colors
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {semanticCategories.map((category) => (
              <Card
                key={category.name}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.colors.map((color) => {
                    const isTransparent = color.hex.length === 9;

                    return (
                      <div
                        key={color.token}
                        className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                        onClick={() => handleCopyHex(color.hex)}
                      >
                        <div
                          className="relative h-10 w-10 flex-shrink-0 rounded-lg shadow-sm ring-1 ring-neutral-200"
                          style={{
                            backgroundColor: isTransparent
                              ? "#ffffff"
                              : undefined,
                            backgroundImage: isTransparent
                              ? CHECKERBOARD
                              : undefined,
                            backgroundSize: isTransparent
                              ? "8px 8px"
                              : undefined,
                            backgroundPosition: isTransparent
                              ? "0 0, 4px 4px"
                              : undefined,
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-lg"
                            style={{ backgroundColor: color.hex }}
                          />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="text-sm font-medium text-neutral-700">
                            {color.token}
                          </div>
                          <div className="font-mono text-xs text-neutral-500">
                            {copiedHex === color.hex ? (
                              <span className="text-primary-500">Copied!</span>
                            ) : (
                              color.hex
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export const Route = createFileRoute("/design-system/colors")({
  component: ColorsPage,
});
