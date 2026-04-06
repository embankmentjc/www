#!/usr/bin/env node
/**
 * Inject OG meta tags into static HTML files.
 * Reads ogMetadata exports from page source files and injects
 * corresponding <meta> tags into the built HTML.
 */
const fs = require('fs')
const path = require('path')

const outDir = process.argv[2] || '.'
const siteUrl = process.env.VITE_SITE_URL || 'https://embankment.org'

const defaultTitle = "The Embankment - Embankment Preservation Coalition"
const defaultDescription = "Preserving and restoring Jersey City's Harsimus Branch Embankment as a green corridor, connecting neighborhoods with nature, history, and the East Coast Greenway."
const defaultImage = "/images/HOME-STEP2.jpg"

const pagesDir = path.join(__dirname, '..', 'pages')

// Extract ogMetadata from page source files via regex
function extractOgMetadata(pageFile) {
    const filePath = path.join(pagesDir, pageFile)
    if (!fs.existsSync(filePath)) return null

    const src = fs.readFileSync(filePath, 'utf-8')
    const match = src.match(/export\s+const\s+ogMetadata\s*=\s*\{([^}]+)\}/)
    if (!match) return null

    const block = match[1]
    const get = (key) => {
        const m = block.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`))
        return m ? m[1] : null
    }
    return {
        title: get('title'),
        description: get('description'),
        image: get('image'),
    }
}

// Map route names to page files
const routeToFile = {
    '': 'index.tsx',
}

// Scan for all route directories in outDir
const routes = fs.readdirSync(outDir).filter(f => {
    const p = path.join(outDir, f, 'index.html')
    return f !== 'assets' && fs.existsSync(p)
})

// Add root
routes.unshift('')

for (const route of routes) {
    const htmlPath = route
        ? path.join(outDir, route, 'index.html')
        : path.join(outDir, 'index.html')

    if (!fs.existsSync(htmlPath)) continue

    const pageFile = routeToFile[route] || `${route}.tsx`
    const meta = extractOgMetadata(pageFile)

    const title = meta?.title || defaultTitle
    const description = meta?.description || defaultDescription
    const image = meta?.image || defaultImage
    const absImage = image.startsWith('http') ? image : `${siteUrl}${image}`
    const url = route ? `${siteUrl}/${route}` : siteUrl

    const ogTags = [
        `<meta property="og:type" content="website" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:image" content="${absImage}" />`,
        `<meta property="twitter:card" content="summary_large_image" />`,
        `<meta property="twitter:url" content="${url}" />`,
        `<meta property="twitter:title" content="${title}" />`,
        `<meta property="twitter:description" content="${description}" />`,
        `<meta property="twitter:image" content="${absImage}" />`,
        `<meta name="description" content="${description}" />`,
    ].join('\n    ')

    let html = fs.readFileSync(htmlPath, 'utf-8')

    // Also update <title>
    html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${title}</title>`
    )

    // Inject OG tags before </head>
    html = html.replace('</head>', `    ${ogTags}\n  </head>`)

    fs.writeFileSync(htmlPath, html)
    console.log(`Injected OG tags for /${route || '(root)'}`)
}
