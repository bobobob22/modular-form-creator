import { useEffect, useRef, useState } from 'react'
import type {
  ModuleFormData,
  Resource,
  ResourcePayload,
} from '@/shared/types/resource'
import { useCompletedEditBuffer } from '@/shared/hooks/useCompletedEditBuffer'
import { buildModuleFormHydrationKey } from '../utils/moduleFormHydration'
import { flushModuleFormBuffer } from '../utils/flushModuleFormBuffer'

export function useModuleFormLocalState<TForm extends ModuleFormData>(
  resource: Resource | null,
  emptyForm: TForm,
  selectForm: (resource: Resource) => TForm,
  buildBufferedPayload: (effective: Resource, form: TForm) => ResourcePayload,
) {
  const {
    getResourceWithBufferedEdits,
    updateBufferedResource,
    clearBufferedResource,
  } = useCompletedEditBuffer()

  const hydrationKey = buildModuleFormHydrationKey(resource)

  const selectFormFromBuffer = (source: Resource) =>
    selectForm(getResourceWithBufferedEdits(source))

  const [form, setForm] = useState<TForm>(() =>
    resource ? selectFormFromBuffer(resource) : emptyForm,
  )
  const [hydratedKey, setHydratedKey] = useState(() => hydrationKey)

  const formRef = useRef(form)
  const resourceRef = useRef(resource)
  const buildBufferedPayloadRef = useRef(buildBufferedPayload)

  const effectiveResource = resource ? getResourceWithBufferedEdits(resource) : null

  if (hydrationKey !== hydratedKey) {
    setHydratedKey(hydrationKey)
    setForm(resource ? selectFormFromBuffer(resource) : emptyForm)
  }

  useEffect(() => {
    formRef.current = form
    resourceRef.current = resource
    buildBufferedPayloadRef.current = buildBufferedPayload
  }, [form, resource, buildBufferedPayload])

  useEffect(() => {
    return () => {
      const currentResource = resourceRef.current
      if (!currentResource) {
        return
      }

      flushModuleFormBuffer(
        currentResource,
        formRef.current,
        getResourceWithBufferedEdits,
        buildBufferedPayloadRef.current,
        updateBufferedResource,
        clearBufferedResource,
      )
    }
  }, [
    getResourceWithBufferedEdits,
    updateBufferedResource,
    clearBufferedResource,
  ])

  return { form, setForm, effectiveResource }
}
