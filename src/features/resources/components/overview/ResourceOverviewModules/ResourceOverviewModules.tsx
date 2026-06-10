import { LABELS } from '@/shared/constants/labels'
import { ROUTES } from '@/shared/constants/routes'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { Resource } from '@/shared/types/resource'
import {
  isBasicInfoModuleComplete,
  isProjectDetailsModuleComplete,
} from '@/shared/utils/moduleCompletion'
import { ModuleGrid } from '@/features/resources/styles/section.styles'
import { ModuleProgressCard } from '../ModuleProgressCard/ModuleProgressCard'

interface ResourceOverviewModulesProps {
  resource: Resource
}

export function ResourceOverviewModules({ resource }: ResourceOverviewModulesProps) {
  const basicInfoComplete = isBasicInfoModuleComplete(resource.basicInfo)
  const projectDetailsComplete = isProjectDetailsModuleComplete(resource.projectDetails)

  return (
    <ModuleGrid>
      <ModuleProgressCard
        title={LABELS.MODULE.BASIC_INFO}
        description={LABELS.MODULE.BASIC_INFO_DESCRIPTION}
        isComplete={basicInfoComplete}
        isAvailable={true}
        editPath={ROUTES.resourceBasicInfo(resource.resourceId)}
      />
      <ModuleProgressCard
        title={LABELS.MODULE.PROJECT_DETAILS}
        description={LABELS.MODULE.PROJECT_DETAILS_DESCRIPTION}
        isComplete={projectDetailsComplete}
        isAvailable={
          resource.status === RESOURCE_STATUS.COMPLETED || basicInfoComplete
        }
        editPath={ROUTES.resourceProjectDetails(resource.resourceId)}
        unavailableReason={LABELS.MODULE.LOCKED_REASON}
      />
    </ModuleGrid>
  )
}
