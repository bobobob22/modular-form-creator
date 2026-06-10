import { useState } from 'react'
import { provisionResource } from '@/shared/api/resources'
import { LABELS } from '@/shared/constants/labels'
import { useCompletedEditBuffer } from '@/shared/hooks/useCompletedEditBuffer'
import type { Resource } from '@/shared/types/resource'
import { getApiErrorMessage } from '@/shared/utils/apiError'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'
import { useToast } from '@/shared/hooks/useToast'

export function useProvisionResource(
  resource: Resource | null,
  onSuccess: (updated: Resource) => void,
) {
  const { showToast } = useToast()
  const { clearBufferedResource } = useCompletedEditBuffer()
  const [provisionError, setProvisionError] = useState<string | null>(null)
  const [isProvisioning, setIsProvisioning] = useState(false)

  const handleProvision = async () => {
    if (!resource) {
      return
    }

    setProvisionError(null)
    setIsProvisioning(true)

    try {
      const updated = await provisionResource(formatResourceIdForApi(resource.resourceId))
      clearBufferedResource(formatResourceIdForApi(resource.resourceId))
      onSuccess(updated)
      showToast({ variant: 'success', message: LABELS.TOAST.PROVISION_SUCCESS })
    } catch (err) {
      const message = getApiErrorMessage(err, LABELS.ERRORS.PROVISION_RESOURCE)
      setProvisionError(message)
      showToast({ variant: 'error', message })
    } finally {
      setIsProvisioning(false)
    }
  }

  return { provisionError, isProvisioning, handleProvision }
}
