import type { Resource } from '@/shared/types/resource'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'

/**
 * Key for rehydrating module form state when server data changes (e.g. after save
 * on another screen) or when navigating between resources. Compared in
 * useResourceModuleForm — when it changes, local form resets from buffer/server.
 */
export function buildModuleFormHydrationKey(resource: Resource | null): string {
  if (!resource) {
    return ''
  }

  return `${formatResourceIdForApi(resource.resourceId)}:${resource.updatedAt}`
}
