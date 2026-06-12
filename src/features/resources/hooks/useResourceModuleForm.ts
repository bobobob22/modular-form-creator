import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type {
  ModuleFormData,
  Resource,
  ResourcePayload,
} from '@/shared/types/resource'
import { getApiErrorMessage } from '@/shared/utils/apiError'
import { useCompletedEditBuffer } from '@/shared/hooks/useCompletedEditBuffer'
import { useToast } from '@/shared/hooks/useToast'
import { submitResourceModuleForm } from '../utils/submitResourceModuleForm'
import { useModuleFormLocalState } from './useModuleFormLocalState'

interface ResourceModuleFormConfig<TForm extends ModuleFormData> {
  emptyForm: TForm
  selectForm: (resource: Resource) => TForm
  isModuleAvailable?: (effective: Resource) => boolean
  validateForm: (form: TForm) => string | null
  saveDraft: (resourceId: string, form: TForm) => Promise<unknown>
  buildBufferedPayload: (effective: Resource, form: TForm) => ResourcePayload
  toastMessages: {
    draftSuccess: string
    completedSuccess: string
  }
  errorFallback: string
}

export function useResourceModuleForm<TForm extends ModuleFormData>(
  resource: Resource | null,
  config: ResourceModuleFormConfig<TForm>,
) {
  const {
    emptyForm,
    selectForm,
    isModuleAvailable = () => true,
    validateForm,
    saveDraft,
    buildBufferedPayload,
    toastMessages,
    errorFallback,
  } = config

  const navigate = useNavigate()
  const { showToast } = useToast()
  const { clearBufferedResource } = useCompletedEditBuffer()

  const { form, setForm, effectiveResource } = useModuleFormLocalState(
    resource,
    emptyForm,
    selectForm,
    buildBufferedPayload,
  )

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isCompleted = resource?.status === RESOURCE_STATUS.COMPLETED
  const isAvailable = effectiveResource ? isModuleAvailable(effectiveResource) : false
  const overviewPath = resource ? ROUTES.resource(resource.resourceId) : ROUTES.RESOURCES_LIST

  const updateField = <K extends keyof TForm>(field: K, value: TForm[K]) => {
    if (!resource) {
      return
    }

    setForm({ ...form, [field]: value })
    setSubmitError(null)
  }

  const handleSubmit = async () => {
    if (!resource || !effectiveResource || !isAvailable) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitResourceModuleForm(
        resource,
        effectiveResource,
        form,
        isCompleted,
        validateForm,
        saveDraft,
        buildBufferedPayload,
        clearBufferedResource,
      )

      if (result.ok === false) {
        setSubmitError(result.validationError)
        return
      }

      setSubmitError(null)
      showToast({
        variant: 'success',
        message: isCompleted
          ? toastMessages.completedSuccess
          : toastMessages.draftSuccess,
      })
      navigate(overviewPath)
    } catch (err) {
      const message = getApiErrorMessage(err, errorFallback)
      setSubmitError(message)
      showToast({ variant: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => navigate(overviewPath)

  return {
    form,
    isCompleted,
    isAvailable,
    overviewPath,
    submitError,
    isSubmitting,
    updateField,
    handleSubmit,
    handleCancel,
  }
}
