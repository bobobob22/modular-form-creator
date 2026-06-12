import { beforeEach, describe, expect, it, vi } from 'vitest'
import { replaceResource } from '@/shared/api/resources'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { buildBasicInfoPayload } from '@/shared/utils/resourceApi'
import { submitResourceModuleForm } from './submitResourceModuleForm'

vi.mock('@/shared/api/resources', () => ({
  replaceResource: vi.fn(),
}))

const resource: Resource = {
  _id: 'id-1',
  resourceId: 7,
  name: 'alpha',
  status: RESOURCE_STATUS.DRAFT,
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

describe('submitResourceModuleForm', () => {
  const clearBufferedResource = vi.fn()
  const saveDraft = vi.fn()

  beforeEach(() => {
    vi.mocked(replaceResource).mockReset()
    clearBufferedResource.mockReset()
    saveDraft.mockReset()
    saveDraft.mockResolvedValue(resource)
  })

  it('returns validation error without calling API', async () => {
    const result = await submitResourceModuleForm(
      resource,
      resource,
      resource.basicInfo,
      false,
      () => 'Owner is required',
      saveDraft,
      buildBasicInfoPayload,
      clearBufferedResource,
    )

    expect(result).toEqual({ ok: false, validationError: 'Owner is required' })
    expect(saveDraft).not.toHaveBeenCalled()
    expect(replaceResource).not.toHaveBeenCalled()
    expect(clearBufferedResource).not.toHaveBeenCalled()
  })

  it('saves draft for non-completed resource', async () => {
    const form = { ...resource.basicInfo, owner: 'New owner' }

    const result = await submitResourceModuleForm(
      resource,
      resource,
      form,
      false,
      () => null,
      saveDraft,
      buildBasicInfoPayload,
      clearBufferedResource,
    )

    expect(result).toEqual({ ok: true })
    expect(saveDraft).toHaveBeenCalledWith('7', form)
    expect(replaceResource).not.toHaveBeenCalled()
    expect(clearBufferedResource).toHaveBeenCalledWith('7')
  })

  it('replaces resource when completed', async () => {
    const completed = { ...resource, status: RESOURCE_STATUS.COMPLETED }
    const form = { ...completed.basicInfo, owner: 'New owner' }
    vi.mocked(replaceResource).mockResolvedValue(completed)

    const result = await submitResourceModuleForm(
      completed,
      completed,
      form,
      true,
      () => null,
      saveDraft,
      buildBasicInfoPayload,
      clearBufferedResource,
    )

    expect(result).toEqual({ ok: true })
    expect(replaceResource).toHaveBeenCalledWith(
      '7',
      buildBasicInfoPayload(completed, form),
    )
    expect(saveDraft).not.toHaveBeenCalled()
    expect(clearBufferedResource).toHaveBeenCalledWith('7')
  })
})
