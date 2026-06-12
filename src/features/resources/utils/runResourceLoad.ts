import type { Resource } from '@/shared/types/resource'
import { loadResource, RESOURCE_LOAD_RESULT_KIND } from './loadResource'

export async function runResourceLoad(
  resourceId: string | undefined,
  isCancelled: () => boolean,
  setResource: (resource: Resource | null) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
) {
  await Promise.resolve()
  if (isCancelled()) {
    return
  }

  setLoading(true)
  setError(null)

  const result = await loadResource(resourceId)
  if (isCancelled()) {
    return
  }

  switch (result.kind) {
    case RESOURCE_LOAD_RESULT_KIND.MISSING_ID:
      setResource(null)
      setLoading(false)
      setError('Resource id is missing')
      break
    case RESOURCE_LOAD_RESULT_KIND.SUCCESS:
      setResource(result.resource)
      setLoading(false)
      setError(null)
      break
    case RESOURCE_LOAD_RESULT_KIND.ERROR:
      setResource(null)
      setLoading(false)
      setError(result.message)
      break
  }
}
