import type { Category, Priority } from '../types/resource'

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const satisfies Record<string, Priority>

export const CATEGORY = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  VENDOR: 'vendor',
} as const satisfies Record<string, Category>

export const TEAM_MEMBER = {
  FE_DEVS: 'FE devs',
  BE_DEVS: 'BE devs',
  DESIGNER: 'Designer',
  DATA_ENG: 'Data Eng',
  PRODUCT_OWNER: 'Product Owner',
} as const

export const TEAM_MEMBER_OPTIONS = [
  TEAM_MEMBER.FE_DEVS,
  TEAM_MEMBER.BE_DEVS,
  TEAM_MEMBER.DESIGNER,
  TEAM_MEMBER.DATA_ENG,
  TEAM_MEMBER.PRODUCT_OWNER,
] as const
