import { describe, expect, it } from 'vitest'
import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import { getModulesProgressHint } from './modulesProgressHint'

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

describe('getModulesProgressHint', () => {
  it('returns null for completed resources', () => {
    expect(
      getModulesProgressHint(
        makeResource({
          status: RESOURCE_STATUS.COMPLETED,
        }),
      ),
    ).toBeNull()
  })

  it('returns null when both draft modules are complete', () => {
    expect(getModulesProgressHint(makeResource())).toBeNull()
  })

  it('returns not-started hint when both modules are incomplete', () => {
    expect(
      getModulesProgressHint(
        makeResource({
          basicInfo: {
            resourceName: 'alpha',
            owner: '',
            email: '',
            description: '',
            priority: '',
          },
          projectDetails: {
            projectName: '',
            budget: '',
            category: '',
            options: [],
          },
        }),
      ),
    ).toBe(LABELS.RESOURCES_LIST.MODULES_NOT_STARTED)
  })

  it('returns one-left hint when only one module is complete', () => {
    expect(
      getModulesProgressHint(
        makeResource({
          projectDetails: {
            projectName: '',
            budget: '',
            category: '',
            options: [],
          },
        }),
      ),
    ).toBe(LABELS.RESOURCES_LIST.MODULES_ONE_LEFT)
  })
})
