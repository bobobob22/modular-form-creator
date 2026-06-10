import { describe, expect, it } from 'vitest'
import { LABELS } from '@/shared/constants/labels'
import type { BasicInfo, ProjectDetails } from '@/shared/types/resource'
import {
  validateBasicInfo,
  validateProjectDetails,
  validateResourceName,
} from './resourceValidation'

const validBasicInfo: BasicInfo = {
  resourceName: 'alpha',
  owner: 'Jane Doe',
  email: 'jane@example.com',
  description: 'Description',
  priority: 'low',
}

const validProjectDetails: ProjectDetails = {
  projectName: 'Project Alpha',
  budget: '1000',
  category: 'internal',
  options: ['FE devs', 'Designer'],
}

describe('validateResourceName', () => {
  it('accepts a valid resource name', () => {
    expect(validateResourceName('alpha-1')).toBeNull()
  })

  it('rejects empty names', () => {
    expect(validateResourceName('   ')).toBe(LABELS.VALIDATION.RESOURCE_NAME_REQUIRED)
  })

  it('rejects invalid characters', () => {
    expect(validateResourceName('bad_name')).toBe(LABELS.VALIDATION.RESOURCE_NAME_FORMAT)
  })
})

describe('validateBasicInfo', () => {
  it('accepts valid basic info', () => {
    expect(validateBasicInfo(validBasicInfo)).toBeNull()
  })

  it('rejects missing owner', () => {
    expect(
      validateBasicInfo({
        ...validBasicInfo,
        owner: '',
      }),
    ).toBe(LABELS.VALIDATION.OWNER_REQUIRED)
  })

  it('rejects invalid owner format', () => {
    expect(
      validateBasicInfo({
        ...validBasicInfo,
        owner: 'Jane123',
      }),
    ).toBe(LABELS.VALIDATION.OWNER_FORMAT)
  })

  it('rejects invalid email', () => {
    expect(
      validateBasicInfo({
        ...validBasicInfo,
        email: 'not-an-email',
      }),
    ).toBe(LABELS.VALIDATION.EMAIL_FORMAT)
  })

  it('rejects invalid priority', () => {
    expect(
      validateBasicInfo({
        ...validBasicInfo,
        priority: 'urgent',
      }),
    ).toBe(LABELS.VALIDATION.PRIORITY_INVALID)
  })
})

describe('validateProjectDetails', () => {
  it('accepts valid project details', () => {
    expect(validateProjectDetails(validProjectDetails)).toBeNull()
  })

  it('rejects non-integer budget', () => {
    expect(
      validateProjectDetails({
        ...validProjectDetails,
        budget: '12.5',
      }),
    ).toBe(LABELS.VALIDATION.BUDGET_FORMAT)
  })

  it('rejects empty team members', () => {
    expect(
      validateProjectDetails({
        ...validProjectDetails,
        options: [],
      }),
    ).toBe(LABELS.VALIDATION.TEAM_MEMBERS_REQUIRED)
  })

  it('rejects unknown team members', () => {
    expect(
      validateProjectDetails({
        ...validProjectDetails,
        options: ['QA'],
      }),
    ).toBe(LABELS.VALIDATION.TEAM_MEMBERS_INVALID)
  })
})
