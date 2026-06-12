import { TEAM_MEMBER_OPTIONS } from '@/shared/constants/resourceFieldValues'
import { isCategory, isPriority } from '@/shared/utils/resourceFieldGuards'
import {
  RESOURCE_FIELD_MAX_LENGTH,
  RESOURCE_FIELD_PATTERN,
} from '@/shared/constants/resourceValidationRules'
import { LABELS } from '@/shared/constants/labels'
import type { BasicInfo, ProjectDetails } from '@/shared/types/resource'

const TEAM_MEMBER_SET = new Set<string>(TEAM_MEMBER_OPTIONS)

export function validateResourceName(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return LABELS.VALIDATION.RESOURCE_NAME_REQUIRED
  }
  if (trimmed.length > RESOURCE_FIELD_MAX_LENGTH.RESOURCE_NAME) {
    return LABELS.VALIDATION.RESOURCE_NAME_MAX
  }
  if (!RESOURCE_FIELD_PATTERN.ALPHANUMERIC_NAME.test(trimmed)) {
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
  if (owner.length > RESOURCE_FIELD_MAX_LENGTH.OWNER) {
    return LABELS.VALIDATION.OWNER_MAX
  }
  if (!RESOURCE_FIELD_PATTERN.OWNER.test(owner)) {
    return LABELS.VALIDATION.OWNER_FORMAT
  }

  const email = form.email.trim()
  if (!email) {
    return LABELS.VALIDATION.EMAIL_REQUIRED
  }
  if (!RESOURCE_FIELD_PATTERN.EMAIL.test(email)) {
    return LABELS.VALIDATION.EMAIL_FORMAT
  }

  const description = form.description.trim()
  if (!description) {
    return LABELS.VALIDATION.DESCRIPTION_REQUIRED
  }
  if (description.length > RESOURCE_FIELD_MAX_LENGTH.DESCRIPTION) {
    return LABELS.VALIDATION.DESCRIPTION_MAX
  }

  if (!form.priority) {
    return LABELS.VALIDATION.PRIORITY_REQUIRED
  }
  if (!isPriority(form.priority)) {
    return LABELS.VALIDATION.PRIORITY_INVALID
  }

  return null
}

export function validateProjectDetails(form: ProjectDetails): string | null {
  const projectName = form.projectName.trim()
  if (!projectName) {
    return LABELS.VALIDATION.PROJECT_NAME_REQUIRED
  }
  if (projectName.length > RESOURCE_FIELD_MAX_LENGTH.PROJECT_NAME) {
    return LABELS.VALIDATION.PROJECT_NAME_MAX
  }
  if (!RESOURCE_FIELD_PATTERN.ALPHANUMERIC_NAME.test(projectName)) {
    return LABELS.VALIDATION.PROJECT_NAME_FORMAT
  }

  const budget = form.budget.trim()
  if (!budget) {
    return LABELS.VALIDATION.BUDGET_REQUIRED
  }
  if (!RESOURCE_FIELD_PATTERN.BUDGET.test(budget)) {
    return LABELS.VALIDATION.BUDGET_FORMAT
  }

  if (!form.category) {
    return LABELS.VALIDATION.CATEGORY_REQUIRED
  }
  if (!isCategory(form.category)) {
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
