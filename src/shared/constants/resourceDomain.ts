import type { ResourceStatus } from '../types/resource'

export const RESOURCE_STATUS = {
  DRAFT: 'draft',
  COMPLETED: 'completed',
} as const satisfies Record<string, ResourceStatus>

export const LIST_QUERY_DEFAULTS = {
  PAGE_SIZE: 10,
  SORT_ORDER: 'desc',
} as const
