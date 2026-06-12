/**
 * Resource form field patterns and limits.
 * Mirrored from backend `resource.service.ts`.
 */
export const RESOURCE_FIELD_PATTERN = {
  ALPHANUMERIC_NAME: /^[A-Za-z0-9 -]+$/,
  OWNER: /^[A-Za-z ]+$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  BUDGET: /^\d+$/,
} as const

export const RESOURCE_FIELD_MAX_LENGTH = {
  RESOURCE_NAME: 255,
  OWNER: 255,
  PROJECT_NAME: 255,
  DESCRIPTION: 1000,
} as const
