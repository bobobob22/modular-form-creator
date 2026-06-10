import type { BasicInfo, ProjectDetails } from '../types/resource'

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

export const CATEGORY = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  VENDOR: 'vendor',
} as const

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

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW, label: 'Low' },
  { value: PRIORITY.MEDIUM, label: 'Medium' },
  { value: PRIORITY.HIGH, label: 'High' },
] as const

export const CATEGORY_OPTIONS = [
  { value: CATEGORY.INTERNAL, label: 'Internal' },
  { value: CATEGORY.EXTERNAL, label: 'External' },
  { value: CATEGORY.VENDOR, label: 'Vendor' },
] as const

export const EMPTY_BASIC_INFO: BasicInfo = {
  resourceName: '',
  owner: '',
  email: '',
  description: '',
  priority: '',
}

export const EMPTY_PROJECT_DETAILS: ProjectDetails = {
  projectName: '',
  budget: '',
  category: '',
  options: [],
}

export const EMPTY_FIELD_PLACEHOLDER = '—'
