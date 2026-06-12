import { describe, expect, it, vi } from 'vitest'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { buildBasicInfoPayload } from '@/shared/utils/resourceApi'
import { flushModuleFormBuffer } from './flushModuleFormBuffer'

const resource: Resource = {
  _id: 'id-1',
  resourceId: 7,
  name: 'alpha',
  status: RESOURCE_STATUS.COMPLETED,
  basicInfo: {
    resourceName: 'alpha',
    owner: 'Jane Doe',
    email: 'jane@example.com',
    description: 'Description',
    priority: 'low',
  },
  projectDetails: {
    projectName: 'Project',
    budget: '1000',
    category: 'internal',
    options: ['FE devs'],
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
}

describe('flushModuleFormBuffer', () => {
  it('clears buffer when form matches server resource', () => {
    const clearBufferedResource = vi.fn()
    const updateBufferedResource = vi.fn()

    flushModuleFormBuffer(
      resource,
      { ...resource.basicInfo },
      (r) => r,
      buildBasicInfoPayload,
      updateBufferedResource,
      clearBufferedResource,
    )

    expect(clearBufferedResource).toHaveBeenCalledWith('7')
    expect(updateBufferedResource).not.toHaveBeenCalled()
  })

  it('updates buffer when form differs from server resource', () => {
    const clearBufferedResource = vi.fn()
    const updateBufferedResource = vi.fn()
    const editedForm = { ...resource.basicInfo, owner: 'John Doe' }

    flushModuleFormBuffer(
      resource,
      editedForm,
      (r) => r,
      buildBasicInfoPayload,
      updateBufferedResource,
      clearBufferedResource,
    )

    expect(updateBufferedResource).toHaveBeenCalledOnce()
    expect(updateBufferedResource).toHaveBeenCalledWith(
      resource,
      buildBasicInfoPayload(resource, editedForm),
    )
    expect(clearBufferedResource).not.toHaveBeenCalled()
  })

  it('uses buffered effective resource when building payload', () => {
    const buffered = {
      ...resource,
      basicInfo: { ...resource.basicInfo, owner: 'Buffered owner' },
    }
    const getResourceWithBufferedEdits = vi.fn(() => buffered)
    const updateBufferedResource = vi.fn()

    flushModuleFormBuffer(
      resource,
      buffered.basicInfo,
      getResourceWithBufferedEdits,
      buildBasicInfoPayload,
      updateBufferedResource,
      vi.fn(),
    )

    expect(getResourceWithBufferedEdits).toHaveBeenCalledWith(resource)
    expect(updateBufferedResource).toHaveBeenCalledWith(
      resource,
      buildBasicInfoPayload(buffered, buffered.basicInfo),
    )
  })
})
