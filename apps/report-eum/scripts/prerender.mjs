import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { preview } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

function loadSeoConfig() {
  try {
    const configPath = path.join(distDir, 'seo-config.json')
    const config = readFileSync(configPath, 'utf-8')
    return JSON.parse(config)
  } catch {
    return {
      SEO_CONFIG: {
        siteUrl: 'https://report.eum.com',
        title: 'Report EUM',
        description: 'Report EUM - E-um 리포트 서비스',
        ogImage: 'https://report.eum.com/og.png',
        locale: 'ko_KR',
      },
      PAGE_SEO: {
        '/': {
          title: 'Home',
          description: 'Report EUM 홈',
        },
      },
      SSG_ROUTES: ['/'],
    }
  }
}

function updatePageMeta(html, route, seoConfig) {
  const { SEO_CONFIG, PAGE_SEO } = seoConfig
  const pageSeo = PAGE_SEO[route]

  if (!pageSeo) {
    return html
  }

  const pageTitle = `${pageSeo.title} | ${SEO_CONFIG.title}`
  const pageDescription = pageSeo.description
  const pageUrl = route === '/' ? `${SEO_CONFIG.siteUrl}/` : `${SEO_CONFIG.siteUrl}${route}`

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${pageDescription}"`,
  )
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${pageUrl}"`)
  html = html.replace(
    /<meta name="robots" content="[^"]*"\s*(?:\/?>)/,
    '<meta name="robots" content="index, follow" />',
  )
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${pageTitle}"`)
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${pageDescription}"`,
  )
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${pageUrl}"`)
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${pageTitle}"`)
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${pageDescription}"`,
  )

  return html
}

async function prerender() {
  const originalHtmlPath = path.join(distDir, 'index.html')
  const appHtmlPath = path.join(distDir, 'app.html')

  copyFileSync(originalHtmlPath, appHtmlPath)

  const seoConfig = loadSeoConfig()
  const { SSG_ROUTES } = seoConfig

  const server = await preview({
    preview: {
      port: 4173,
      strictPort: true,
    },
  })

  const serverUrl = server.resolvedUrls.local[0].replace(/\/$/, '')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    for (const route of SSG_ROUTES) {
      const page = await browser.newPage()
      await page.goto(`${serverUrl}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      await page.waitForSelector('#root', { timeout: 10000 })
      await new Promise((resolve) => setTimeout(resolve, 500))

      let html = await page.content()
      html = updatePageMeta(html, route, seoConfig)

      const outputPath =
        route === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, route, 'index.html')

      mkdirSync(path.dirname(outputPath), { recursive: true })
      writeFileSync(outputPath, html)
      await page.close()
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
