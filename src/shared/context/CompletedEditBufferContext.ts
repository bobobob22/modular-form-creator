import { createContext } from 'react'
import type { Resource, ResourcePayload } from '../types/resource'

export interface CompletedEditBufferContextValue {
  hasBufferedEdits: (resourceId: string) => boolean
  getResourceWithBufferedEdits: (resource: Resource) => Resource
  updateBufferedResource: (resource: Resource, payload: ResourcePayload) => void
  clearBufferedResource: (resourceId: string) => void
}

export const CompletedEditBufferContext =
  createContext<CompletedEditBufferContextValue | null>(null)
