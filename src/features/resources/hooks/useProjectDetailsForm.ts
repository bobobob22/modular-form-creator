import { updateProjectDetails } from '@/shared/api/resources'
import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import { EMPTY_PROJECT_DETAILS } from '@/shared/constants/resourceFormDefaults'
import type { ProjectDetails, Resource } from '@/shared/types/resource'
import { isBasicInfoModuleComplete } from '@/shared/utils/moduleCompletion'
import {
  buildProjectDetailsPayload,
  cloneProjectDetails,
} from '@/shared/utils/resourceApi'
import { validateProjectDetails } from '@/shared/utils/resourceValidation'
import { useResourceModuleForm } from './useResourceModuleForm'

const projectDetailsFormConfig = {
  emptyForm: EMPTY_PROJECT_DETAILS,
  selectForm: (effective: Resource) => cloneProjectDetails(effective.projectDetails),
  isModuleAvailable: (effective: Resource) =>
    effective.status === RESOURCE_STATUS.COMPLETED ||
    isBasicInfoModuleComplete(effective.basicInfo),
  validateForm: (form: ProjectDetails) => validateProjectDetails(form),
  saveDraft: (resourceId: string, form: ProjectDetails) =>
    updateProjectDetails(resourceId, cloneProjectDetails(form)),
  buildBufferedPayload: buildProjectDetailsPayload,
  toastMessages: {
    draftSuccess: LABELS.TOAST.SAVE_PROJECT_DETAILS_SUCCESS,
    completedSuccess: LABELS.TOAST.SUBMIT_CHANGES_SUCCESS,
  },
  errorFallback: LABELS.ERRORS.SAVE_PROJECT_DETAILS,
}

export function useProjectDetailsForm(resource: Resource | null) {
  return useResourceModuleForm(resource, projectDetailsFormConfig)
}
