// Per-section unfurl meta for `/vision?s=<id>`: crawlers never run the React section spy, so the edge rewrites the
// static page's title / description / og:image to name the linked section (`pages/vision-sections.json`).
import { VISION_ALIASES, VISION_SECTION_KEY, visionOgImage, visionSections } from "../../pages/vision-sections"

export type SectionMeta = { title: string; desc: string; image: string; url: string }

/** `url`'s section meta, or null when it names no (known) section. Aliases resolve to their canonical section. */
export function sectionMeta(url: URL): SectionMeta | null {
    const raw = url.searchParams.get(VISION_SECTION_KEY)
    if (!raw) return null
    const id = VISION_ALIASES[raw] ?? raw
    const s = visionSections.find(s => s.id === id)
    if (!s) return null
    const page = new URL(url.pathname, url.origin)
    page.searchParams.set(VISION_SECTION_KEY, s.id)
    return {
        title: `${s.title} - The Embankment`,
        desc: s.desc,
        image: new URL(visionOgImage(s.id), url.origin).toString(),
        url: page.toString(),
    }
}

/** `html` with its title and `og:*` / `twitter:*` / description meta rewritten to `meta`. */
export function stampMeta(html: Response, meta: SectionMeta): Response {
    return new HTMLRewriter()
        .on("meta", {
            element(el) {
                const key = el.getAttribute("property") ?? el.getAttribute("name")
                const value =
                    key === "og:title" || key === "twitter:title" ? meta.title
                    : key === "og:description" || key === "twitter:description" || key === "description" ? meta.desc
                    : key === "og:image" || key === "twitter:image" ? meta.image
                    : key === "og:url" || key === "twitter:url" ? meta.url
                    : null
                if (value) el.setAttribute("content", value)
            },
        })
        .on("title", {
            element(el) {
                el.setInnerContent(meta.title)
            },
        })
        .transform(html)
}
