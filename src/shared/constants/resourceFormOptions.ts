import { CATEGORY, PRIORITY } from './resourceFieldValues'

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
