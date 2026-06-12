import { describe, expect, it, vi } from 'vitest'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { loadResource, RESOURCE_LOAD_RESULT_KIND } from './loadResource'
import { runResourceLoad } from './runResourceLoad'

vi.mock('./loadResource', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./loadResource')>()
  return {
    ...actual,
    loadResource: vi.fn(),
  }
})

const resource: Resource = {
  _id: 'id-1',
  resourceId: 1,
  name: 'alpha',
  status: RESOURCE_STATUS.DRAFT,
  basicInfo: {
    resourceName: 'alpha',
    owner: '',
    email: '',
    description: '',
    priority: 'low',
  },
  projectDetails: {
    projectName: '',
    budget: '',
    category: 'internal',
    options: [],
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

describe('runResourceLoad', () => {
  it('sets resource on success', async () => {
    vi.mocked(loadResource).mockResolvedValue({
      kind: RESOURCE_LOAD_RESULT_KIND.SUCCESS,
      resource,
    })

    const setResource = vi.fn()
    const setLoading = vi.fn()
    const setError = vi.fn()

    await runResourceLoad('1', () => false, setResource, setLoading, setError)

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setResource).toHaveBeenCalledWith(resource)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(setError).toHaveBeenCalledWith(null)
  })

  it('skips state updates when cancelled after load', async () => {
    vi.mocked(loadResource).mockResolvedValue({
      kind: RESOURCE_LOAD_RESULT_KIND.SUCCESS,
      resource,
    })

    const setResource = vi.fn()
    const setLoading = vi.fn()
    const setError = vi.fn()
    let cancelChecks = 0
    const isCancelled = () => {
      cancelChecks += 1
      return cancelChecks > 1
    }

    await runResourceLoad('1', isCancelled, setResource, setLoading, setError)

    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setResource).not.toHaveBeenCalled()
    expect(setLoading).not.toHaveBeenCalledWith(false)
  })

  it('sets error message on load failure', async () => {
    vi.mocked(loadResource).mockResolvedValue({
      kind: RESOURCE_LOAD_RESULT_KIND.ERROR,
      message: 'Not found',
    })

    const setResource = vi.fn()
    const setLoading = vi.fn()
    const setError = vi.fn()

    await runResourceLoad('1', () => false, setResource, setLoading, setError)

    expect(setResource).toHaveBeenCalledWith(null)
    expect(setError).toHaveBeenCalledWith('Not found')
    expect(setLoading).toHaveBeenCalledWith(false)
  })
})
