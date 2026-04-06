// Short, human-readable IDs (primary)
export const becomeMemberId = "member"
export const signupId = "signup"
export const donateId = "donate"
export const volunteerId = "volunteer"
export const sponsorsId = "sponsors"
export const partnersId = "partners"
export const endorsementsId = "supporters"
export const visionId = "vision"
export const newsId = "news"

export const events2025 = "2025-events"
export const events2024 = "2024-events"

// Legacy IDs for backwards compatibility
export const legacyIds: Record<string, string> = {
    "involved-section-member": becomeMemberId,
    "involved-section-donate": donateId,
    "involved-section-volunteer": volunteerId,
    "involved-section-sponsors": sponsorsId,
    "involved-section-partners": partnersId,
    "involved-section-endorsements": endorsementsId,
    "vision-section-vision": visionId,
    "news-section-recent": newsId,
}
