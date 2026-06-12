import { CATEGORY, PRIORITY } from '@/shared/constants/resourceFieldValues'
import type { Category, Priority } from '@/shared/types/resource'

export function isPriority(value: string): value is Priority {
  return (
    value === PRIORITY.LOW ||
    value === PRIORITY.MEDIUM ||
    value === PRIORITY.HIGH
  )
}

export function isCategory(value: string): value is Category {
  return (
    value === CATEGORY.INTERNAL ||
    value === CATEGORY.EXTERNAL ||
    value === CATEGORY.VENDOR
  )
}

/** Maps a select value from the DOM to a typed basic-info priority field. */
export function parsePriorityFormValue(value: string): Priority | '' {
  if (value === '') {
    return ''
  }

  return isPriority(value) ? value : ''
}

/** Maps a select value from the DOM to a typed project-details category field. */
export function parseCategoryFormValue(value: string): Category | '' {
  if (value === '') {
    return ''
  }

  return isCategory(value) ? value : ''
}
