import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import {
  isBasicInfoModuleComplete,
  isProjectDetailsModuleComplete,
} from '@/shared/utils/moduleCompletion'

export function getModulesProgressHint(resource: Resource): string | null {
  if (resource.status !== RESOURCE_STATUS.DRAFT) {
    return null
  }

  const basicInfoComplete = isBasicInfoModuleComplete(resource.basicInfo)
  const projectDetailsComplete = isProjectDetailsModuleComplete(resource.projectDetails)

  if (basicInfoComplete && projectDetailsComplete) {
    return null
  }

  if (!basicInfoComplete && !projectDetailsComplete) {
    return LABELS.RESOURCES_LIST.MODULES_NOT_STARTED
  }

  return LABELS.RESOURCES_LIST.MODULES_ONE_LEFT
}
