/** Module completion checks — whether data is complete enough to provision or unlock modules. */
import type { Resource } from '../types/resource'
import { RESOURCE_STATUS } from '../constants/resourceDomain'

export function isBasicInfoModuleComplete(basicInfo: Resource['basicInfo']): boolean {
  return Boolean(
    basicInfo.resourceName.trim() &&
      basicInfo.owner.trim() &&
      basicInfo.email.trim() &&
      basicInfo.description.trim() &&
      basicInfo.priority,
  )
}

export function isProjectDetailsModuleComplete(
  projectDetails: Resource['projectDetails'],
): boolean {
  return Boolean(
    projectDetails.projectName.trim() &&
      projectDetails.budget.trim() &&
      projectDetails.category &&
      projectDetails.options.length > 0,
  )
}

export function canProvisionResource(resource: Resource): boolean {
  return (
    resource.status === RESOURCE_STATUS.DRAFT &&
    isBasicInfoModuleComplete(resource.basicInfo) &&
    isProjectDetailsModuleComplete(resource.projectDetails)
  )
}
