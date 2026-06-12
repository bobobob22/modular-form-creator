import { describe, expect, it } from 'vitest'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { buildModuleFormHydrationKey } from './moduleFormHydration'

const resource: Resource = {
  _id: 'id-1',
  resourceId: 42,
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
  updatedAt: '2026-01-02T00:00:00.000Z',
}

describe('buildModuleFormHydrationKey', () => {
  it('returns empty string for null resource', () => {
    expect(buildModuleFormHydrationKey(null)).toBe('')
  })

  it('combines resource id and updatedAt', () => {
    expect(buildModuleFormHydrationKey(resource)).toBe(
      '42:2026-01-02T00:00:00.000Z',
    )
  })

  it('changes when updatedAt changes', () => {
    const updated = { ...resource, updatedAt: '2026-01-03T00:00:00.000Z' }

    expect(buildModuleFormHydrationKey(updated)).not.toBe(
      buildModuleFormHydrationKey(resource),
    )
  })
})
