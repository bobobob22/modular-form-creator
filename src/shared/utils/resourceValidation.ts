/** Form validation rules mirrored from backend `resource.service.ts`. */
import {
  CATEGORY,
  PRIORITY,
  TEAM_MEMBER_OPTIONS,
} from '@/shared/constants/resourceForm'
import { LABELS } from '@/shared/constants/labels'
import type { BasicInfo, ProjectDetails } from '@/shared/types/resource'

const NAME_REGEX = /^[A-Za-z0-9 -]+$/
const OWNER_REGEX = /^[A-Za-z ]+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INTEGER_REGEX = /^\d+$/

const MAX_NAME_LENGTH = 255
const MAX_DESCRIPTION_LENGTH = 1000

const TEAM_MEMBER_SET = new Set<string>(TEAM_MEMBER_OPTIONS)

export function validateResourceName(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return LABELS.VALIDATION.RESOURCE_NAME_REQUIRED
  }
  if (trimmed.length > MAX_NAME_LENGTH) {
    return LABELS.VALIDATION.RESOURCE_NAME_MAX
  }
  if (!NAME_REGEX.test(trimmed)) {
    return LABELS.VALIDATION.RESOURCE_NAME_FORMAT
  }

  return null
}

export function validateBasicInfo(form: BasicInfo): string | null {
  const resourceNameError = validateResourceName(form.resourceName)
  if (resourceNameError) {
    return resourceNameError
  }

  const owner = form.owner.trim()
  if (!owner) {
    return LABELS.VALIDATION.OWNER_REQUIRED
  }
  if (owner.length > MAX_NAME_LENGTH) {
    return LABELS.VALIDATION.OWNER_MAX
  }
  if (!OWNER_REGEX.test(owner)) {
    return LABELS.VALIDATION.OWNER_FORMAT
  }

  const email = form.email.trim()
  if (!email) {
    return LABELS.VALIDATION.EMAIL_REQUIRED
  }
  if (!EMAIL_REGEX.test(email)) {
    return LABELS.VALIDATION.EMAIL_FORMAT
  }

  const description = form.description.trim()
  if (!description) {
    return LABELS.VALIDATION.DESCRIPTION_REQUIRED
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return LABELS.VALIDATION.DESCRIPTION_MAX
  }

  if (!form.priority) {
    return LABELS.VALIDATION.PRIORITY_REQUIRED
  }
  if (!Object.values(PRIORITY).includes(form.priority as typeof PRIORITY[keyof typeof PRIORITY])) {
    return LABELS.VALIDATION.PRIORITY_INVALID
  }

  return null
}

export function validateProjectDetails(form: ProjectDetails): string | null {
  const projectName = form.projectName.trim()
  if (!projectName) {
    return LABELS.VALIDATION.PROJECT_NAME_REQUIRED
  }
  if (projectName.length > MAX_NAME_LENGTH) {
    return LABELS.VALIDATION.PROJECT_NAME_MAX
  }
  if (!NAME_REGEX.test(projectName)) {
    return LABELS.VALIDATION.PROJECT_NAME_FORMAT
  }

  const budget = form.budget.trim()
  if (!budget) {
    return LABELS.VALIDATION.BUDGET_REQUIRED
  }
  if (!INTEGER_REGEX.test(budget)) {
    return LABELS.VALIDATION.BUDGET_FORMAT
  }

  if (!form.category) {
    return LABELS.VALIDATION.CATEGORY_REQUIRED
  }
  if (!Object.values(CATEGORY).includes(form.category as typeof CATEGORY[keyof typeof CATEGORY])) {
    return LABELS.VALIDATION.CATEGORY_INVALID
  }

  if (!form.options.length) {
    return LABELS.VALIDATION.TEAM_MEMBERS_REQUIRED
  }

  const invalidMember = form.options.find((member) => !TEAM_MEMBER_SET.has(member))
  if (invalidMember) {
    return LABELS.VALIDATION.TEAM_MEMBERS_INVALID
  }

  return null
}
