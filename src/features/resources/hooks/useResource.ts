import { useEffect, useState } from 'react'
import type { Resource } from '@/shared/types/resource'
import { runResourceLoad } from '../utils/runResourceLoad'

export function useResource(resourceId: string | undefined) {
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    runResourceLoad(resourceId, () => cancelled, setResource, setLoading, setError)

    return () => {
      cancelled = true
    }
  }, [resourceId])

  return { resource, loading, error, setResource }
}
