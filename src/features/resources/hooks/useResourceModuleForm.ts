import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { replaceResource } from '@/shared/api/resources'
import { ROUTES } from '@/shared/constants/routes'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import { buildFormSeedKey } from '@/shared/utils/formSeed'
import type { Resource, ResourcePayload } from '@/shared/types/resource'
import { getApiErrorMessage } from '@/shared/utils/apiError'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'
import { useCompletedEditBuffer } from '@/shared/hooks/useCompletedEditBuffer'
import { useToast } from '@/shared/hooks/useToast'

interface ResourceModuleFormConfig<TForm extends object> {
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

export function useResourceModuleForm<TForm extends object>(
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
  const { getResourceWithBufferedEdits, updateBufferedResource, clearBufferedResource } =
    useCompletedEditBuffer()

  const resourceIdKey = resource ? formatResourceIdForApi(resource.resourceId) : ''
  const serverSeedKey = resource ? buildFormSeedKey(resource) : ''
  const hydrationKey = resource ? `${resourceIdKey}:${serverSeedKey}` : ''

  const selectFormFromBuffer = (source: Resource) =>
    selectForm(getResourceWithBufferedEdits(source))

  const [form, setForm] = useState<TForm>(() =>
    resource ? selectFormFromBuffer(resource) : emptyForm,
  )
  const [hydratedKey, setHydratedKey] = useState(() => hydrationKey)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const effectiveResource = resource ? getResourceWithBufferedEdits(resource) : null

  if (hydrationKey !== hydratedKey) {
    setHydratedKey(hydrationKey)
    setForm(resource ? selectFormFromBuffer(resource) : emptyForm)
  }

  const isCompleted = resource?.status === RESOURCE_STATUS.COMPLETED
  const isAvailable = effectiveResource ? isModuleAvailable(effectiveResource) : false
  const overviewPath = resource ? ROUTES.resource(resource.resourceId) : ROUTES.RESOURCES_LIST

  const updateField = <K extends keyof TForm>(field: K, value: TForm[K]) => {
    if (!resource) {
      return
    }

    const nextForm = { ...form, [field]: value }
    setForm(nextForm)
    setSubmitError(null)

    if (effectiveResource) {
      updateBufferedResource(resource, buildBufferedPayload(effectiveResource, nextForm))
    }
  }

  const handleSubmit = async () => {
    if (!resource || !effectiveResource || !isAvailable) {
      return
    }

    const validationError = validateForm(form)
    if (validationError) {
      setSubmitError(validationError)
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)
    const resourceIdKey = formatResourceIdForApi(resource.resourceId)

    try {
      if (isCompleted) {
        await replaceResource(
          resourceIdKey,
          buildBufferedPayload(effectiveResource, form),
        )
      } else {
        await saveDraft(resourceIdKey, form)
      }
      clearBufferedResource(resourceIdKey)

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
