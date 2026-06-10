import { useCompletedEditBuffer } from '@/shared/hooks/useCompletedEditBuffer'
import type { Resource } from '@/shared/types/resource'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'

export function useResourceWithBufferedEdits(resource: Resource | null) {
  const { getResourceWithBufferedEdits, hasBufferedEdits } = useCompletedEditBuffer()

  if (!resource) {
    return { resourceWithBufferedEdits: null, hasBufferedEdits: false }
  }

  const resourceIdKey = formatResourceIdForApi(resource.resourceId)

  return {
    resourceWithBufferedEdits: getResourceWithBufferedEdits(resource),
    hasBufferedEdits: hasBufferedEdits(resourceIdKey),
  }
}
