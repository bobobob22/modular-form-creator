import { updateBasicInfo } from '@/shared/api/resources'
import { LABELS } from '@/shared/constants/labels'
import { EMPTY_BASIC_INFO } from '@/shared/constants/resourceFormDefaults'
import type { BasicInfo, Resource } from '@/shared/types/resource'
import { buildBasicInfoPayload } from '@/shared/utils/resourceApi'
import { validateBasicInfo } from '@/shared/utils/resourceValidation'
import { useResourceModuleForm } from './useResourceModuleForm'

const basicInfoFormConfig = {
  emptyForm: EMPTY_BASIC_INFO,
  selectForm: (effective: Resource) => ({ ...effective.basicInfo }),
  validateForm: (form: BasicInfo) => validateBasicInfo(form),
  saveDraft: (resourceId: string, form: BasicInfo) => updateBasicInfo(resourceId, form),
  buildBufferedPayload: buildBasicInfoPayload,
  toastMessages: {
    draftSuccess: LABELS.TOAST.SAVE_BASIC_INFO_SUCCESS,
    completedSuccess: LABELS.TOAST.SUBMIT_CHANGES_SUCCESS,
  },
  errorFallback: LABELS.ERRORS.SAVE_BASIC_INFO,
}

export function useBasicInfoForm(resource: Resource | null) {
  return useResourceModuleForm(resource, basicInfoFormConfig)
}
