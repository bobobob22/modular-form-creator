import { describe, expect, it } from 'vitest'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import {
  canProvisionResource,
  isBasicInfoModuleComplete,
  isProjectDetailsModuleComplete,
} from './moduleCompletion'

function makeResource(overrides: Partial<Resource> = {}): Resource {
  return {
    _id: 'id-1',
    resourceId: 1,
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
    ...overrides,
  }
}

describe('isBasicInfoModuleComplete', () => {
  it('returns true when all required fields are filled', () => {
    expect(isBasicInfoModuleComplete(makeResource().basicInfo)).toBe(true)
  })

  it('returns false when a required field is missing', () => {
    expect(
      isBasicInfoModuleComplete({
        ...makeResource().basicInfo,
        owner: '   ',
      }),
    ).toBe(false)
  })
})

describe('isProjectDetailsModuleComplete', () => {
  it('returns true when all required fields are filled', () => {
    expect(isProjectDetailsModuleComplete(makeResource().projectDetails)).toBe(true)
  })

  it('returns false when team members are empty', () => {
    expect(
      isProjectDetailsModuleComplete({
        ...makeResource().projectDetails,
        options: [],
      }),
    ).toBe(false)
  })
})

describe('canProvisionResource', () => {
  it('allows provisioning only for draft resources with both modules complete', () => {
    expect(canProvisionResource(makeResource())).toBe(true)
  })

  it('blocks provisioning for completed resources', () => {
    expect(
      canProvisionResource(
        makeResource({
          status: RESOURCE_STATUS.COMPLETED,
        }),
      ),
    ).toBe(false)
  })

  it('blocks provisioning when basic info is incomplete', () => {
    expect(
      canProvisionResource(
        makeResource({
          basicInfo: {
            ...makeResource().basicInfo,
            email: '',
          },
        }),
      ),
    ).toBe(false)
  })
})
