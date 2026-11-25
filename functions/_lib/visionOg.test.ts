import { describe, expect, it } from "vitest"
import { sectionMeta } from "./visionOg"

describe("sectionMeta", () => {
    it("names the section in `?s=`", () => {
        expect(sectionMeta(new URL("https://embankment.org/vision?s=field-station"))).toEqual({
            title: "Field Station - The Embankment",
            desc: "A covered outdoor classroom at the meadow's edge, with planting shelves for propagating native plants.",
            image: "https://embankment.org/images/og/vision/field-station.jpg",
            url: "https://embankment.org/vision?s=field-station",
        })
    })

    it("resolves an alias to its canonical section, and drops other params from `og:url`", () => {
        expect(sectionMeta(new URL("https://dev.embankment.org/vision?s=block-1-public-plaza-promenade-and-pedestrian-bridge&utm_source=x"))).toEqual({
            title: "Block 1: Plaza, Promenade, and Pedestrian Bridge - The Embankment",
            desc: "An entrance plaza, a 30-foot-wide promenade, and Jersey City's first mass timber pedestrian bridge.",
            image: "https://dev.embankment.org/images/og/vision/block-1.jpg",
            url: "https://dev.embankment.org/vision?s=block-1",
        })
    })

    it("is null without a known section", () => {
        expect([
            sectionMeta(new URL("https://embankment.org/vision")),
            sectionMeta(new URL("https://embankment.org/vision?s=nope")),
        ]).toEqual([null, null])
    })
})
