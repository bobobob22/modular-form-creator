import { describe, expect, it } from 'vitest'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import {
  applyPayloadToResource,
  buildBasicInfoPayload,
  buildProjectDetailsPayload,
  cloneProjectDetails,
} from './resourceApi'

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

describe('cloneProjectDetails', () => {
  it('clones options array', () => {
    const cloned = cloneProjectDetails(resource.projectDetails)
    cloned.options.push('Designer')

    expect(resource.projectDetails.options).toEqual(['FE devs'])
  })
})

describe('buildBasicInfoPayload', () => {
  it('updates basic info while preserving other module data', () => {
    const payload = buildBasicInfoPayload(resource, {
      ...resource.basicInfo,
      owner: 'John Smith',
    })

    expect(payload.basicInfo.owner).toBe('John Smith')
    expect(payload.projectDetails).toEqual(resource.projectDetails)
    expect(payload.name).toBe(resource.name)
  })
})

describe('buildProjectDetailsPayload', () => {
  it('updates project details while preserving basic info', () => {
    const payload = buildProjectDetailsPayload(resource, {
      ...resource.projectDetails,
      budget: '2000',
    })

    expect(payload.projectDetails.budget).toBe('2000')
    expect(payload.basicInfo).toEqual(resource.basicInfo)
  })
})

describe('applyPayloadToResource', () => {
  it('merges buffered payload into the resource', () => {
    const payload = buildBasicInfoPayload(resource, {
      ...resource.basicInfo,
      owner: 'Buffered Owner',
    })

    const merged = applyPayloadToResource(resource, payload)

    expect(merged.basicInfo.owner).toBe('Buffered Owner')
    expect(merged.projectDetails.options).not.toBe(resource.projectDetails.options)
    expect(merged).not.toBe(resource)
  })
})
