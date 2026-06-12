import { ApiClientError } from '@/shared/api/client'
import { getResource } from '@/shared/api/resources'
import type { Resource } from '@/shared/types/resource'

export const RESOURCE_LOAD_RESULT_KIND = {
  MISSING_ID: 'missing-id',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type ResourceLoadResult =
  | { kind: typeof RESOURCE_LOAD_RESULT_KIND.MISSING_ID }
  | { kind: typeof RESOURCE_LOAD_RESULT_KIND.SUCCESS; resource: Resource }
  | { kind: typeof RESOURCE_LOAD_RESULT_KIND.ERROR; message: string }

export async function loadResource(resourceId: string | undefined): Promise<ResourceLoadResult> {
  if (!resourceId) {
    return { kind: RESOURCE_LOAD_RESULT_KIND.MISSING_ID }
  }

  try {
    const resource = await getResource(resourceId)
    return { kind: RESOURCE_LOAD_RESULT_KIND.SUCCESS, resource }
  } catch (err) {
    const message =
      err instanceof ApiClientError ? err.message : 'Failed to load resource'
    return { kind: RESOURCE_LOAD_RESULT_KIND.ERROR, message }
  }
}
