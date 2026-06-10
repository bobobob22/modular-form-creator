import type { Resource } from '@/shared/types/resource'

/** Key that changes when server resource data changes — resets local form state. */
export function buildFormSeedKey(resource: Resource): string {
  return `${resource.resourceId}:${resource.updatedAt}`
}
