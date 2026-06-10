import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Resource, ResourcePayload } from '../types/resource'
import { applyPayloadToResource } from '../utils/resourceApi'
import {
  CompletedEditBufferContext,
  type CompletedEditBufferContextValue,
} from './CompletedEditBufferContext'

type BufferMap = Record<string, ResourcePayload>

export function CompletedEditBufferProvider({ children }: { children: ReactNode }) {
  const [buffers, setBuffers] = useState<BufferMap>({})

  const hasBufferedEdits = useCallback(
    (resourceId: string) => buffers[resourceId] !== undefined,
    [buffers],
  )

  const getResourceWithBufferedEdits = useCallback(
    (resource: Resource) => {
      const buffered = buffers[String(resource.resourceId)]
      if (!buffered) {
        return resource
      }
      return applyPayloadToResource(resource, buffered)
    },
    [buffers],
  )

  const updateBufferedResource = useCallback((resource: Resource, payload: ResourcePayload) => {
    setBuffers((current) => ({
      ...current,
      [String(resource.resourceId)]: payload,
    }))
  }, [])

  const clearBufferedResource = useCallback((resourceId: string) => {
    setBuffers((current) => {
      const next = { ...current }
      delete next[resourceId]
      return next
    })
  }, [])

  const value = useMemo<CompletedEditBufferContextValue>(
    () => ({
      hasBufferedEdits,
      getResourceWithBufferedEdits,
      updateBufferedResource,
      clearBufferedResource,
    }),
    [
      hasBufferedEdits,
      getResourceWithBufferedEdits,
      updateBufferedResource,
      clearBufferedResource,
    ],
  )

  return (
    <CompletedEditBufferContext.Provider value={value}>
      {children}
    </CompletedEditBufferContext.Provider>
  )
}
