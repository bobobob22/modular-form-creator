import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LIST_QUERY_DEFAULTS } from '@/shared/constants/resourceDomain'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { listResources } from '@/shared/api/resources'
import { fetchResourcesListPage } from './fetchResourcesListPage'

vi.mock('@/shared/api/resources', () => ({
  listResources: vi.fn(),
}))

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

const listQuery = {
  pageSize: LIST_QUERY_DEFAULTS.PAGE_SIZE,
  sortOrder: LIST_QUERY_DEFAULTS.SORT_ORDER,
}

describe('fetchResourcesListPage', () => {
  beforeEach(() => {
    vi.mocked(listResources).mockReset()
  })

  it('returns items and pagination for the requested page', async () => {
    vi.mocked(listResources).mockResolvedValue({
      items: [resource],
      pagination: { page: 2, pageSize: 10, totalItems: 15, totalPages: 2 },
    })

    const result = await fetchResourcesListPage(2)

    expect(listResources).toHaveBeenCalledOnce()
    expect(listResources).toHaveBeenCalledWith({ page: 2, ...listQuery })
    expect(result.items).toEqual([resource])
    expect(result.pagination.page).toBe(2)
  })

  it('rewinds to previous page when current page is empty', async () => {
    vi.mocked(listResources)
      .mockResolvedValueOnce({
        items: [],
        pagination: { page: 3, pageSize: 10, totalItems: 20, totalPages: 3 },
      })
      .mockResolvedValueOnce({
        items: [resource],
        pagination: { page: 2, pageSize: 10, totalItems: 20, totalPages: 3 },
      })

    const result = await fetchResourcesListPage(3)

    expect(listResources).toHaveBeenCalledTimes(2)
    expect(listResources).toHaveBeenNthCalledWith(1, { page: 3, ...listQuery })
    expect(listResources).toHaveBeenNthCalledWith(2, { page: 2, ...listQuery })
    expect(result.pagination.page).toBe(2)
    expect(result.items).toEqual([resource])
  })

  it('does not rewind when empty page is the first page', async () => {
    vi.mocked(listResources).mockResolvedValue({
      items: [],
      pagination: { page: 1, pageSize: 10, totalItems: 0, totalPages: 1 },
    })

    const result = await fetchResourcesListPage(1)

    expect(listResources).toHaveBeenCalledOnce()
    expect(result.items).toEqual([])
    expect(result.pagination.page).toBe(1)
  })
})
