import { useCallback, useEffect, useState } from 'react'
import { ApiClientError } from '@/shared/api/client'
import { getResource } from '@/shared/api/resources'
import type { Resource } from '@/shared/types/resource'

export function useResource(resourceId: string | undefined) {
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!resourceId) {
      setResource(null)
      setLoading(false)
      setError('Resource id is missing')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await getResource(resourceId)
      setResource(data)
    } catch (err) {
      const message =
        err instanceof ApiClientError ? err.message : 'Failed to load resource'
      setError(message)
      setResource(null)
    } finally {
      setLoading(false)
    }
  }, [resourceId])

  useEffect(() => {
    queueMicrotask(() => {
      void reload()
    })
  }, [reload])

  return { resource, loading, error, reload, setResource }
}
