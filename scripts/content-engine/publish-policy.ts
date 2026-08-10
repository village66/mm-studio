export const PUBLISH_REQUIRED_USER_FIELDS = [
  "district",
  "area",
  "publishDate",
] as const;

export const PUBLISH_OPTIONAL_ENHANCEMENTS = [
  "photographer",
  "materials",
  "designNarrative",
  "imageCaptions",
  "beforeImages",
  "afterImages",
  "styleConfirmation",
  "featured",
] as const;

export const PUBLISH_POLICY = {
  requiredUserFields: PUBLISH_REQUIRED_USER_FIELDS,
  optionalEnhancements: PUBLISH_OPTIONAL_ENHANCEMENTS,
  optionalEnhancementsBlockPublishing: false,
} as const;
