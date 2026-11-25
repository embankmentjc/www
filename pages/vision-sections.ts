import sections from "./vision-sections.json"

export type VisionSection = {
  id: string
  title: string
  /** Source image for the section's OG card (`scripts/vision-og.py` → `/images/og/vision/<id>.jpg`) */
  img: string
  desc: string
  /** Other ids (retired anchors, auto-generated heading slugs) that resolve to this section */
  aliases?: string[]
}

export const VISION_SECTION_KEY = "s"
export const visionSections: VisionSection[] = sections
export const VISION_SECTION_IDS = visionSections.map(s => s.id)
export const VISION_ALIASES: Record<string, string> = Object.fromEntries(
  visionSections.flatMap(s => (s.aliases ?? []).map(a => [a, s.id])),
)
export const visionOgImage = (id: string) => `/images/og/vision/${id}.jpg`
