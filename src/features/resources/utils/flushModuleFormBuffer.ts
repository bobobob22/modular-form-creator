import type {
  ModuleFormData,
  Resource,
  ResourcePayload,
} from '@/shared/types/resource'
import {
  formatResourceIdForApi,
  isResourcePayloadEqual,
} from '@/shared/utils/resourceApi'

export function flushModuleFormBuffer<TForm extends ModuleFormData>(
  resource: Resource,
  form: TForm,
  getResourceWithBufferedEdits: (resource: Resource) => Resource,
  buildBufferedPayload: (effective: Resource, form: TForm) => ResourcePayload,
  updateBufferedResource: (resource: Resource, payload: ResourcePayload) => void,
  clearBufferedResource: (resourceIdKey: string) => void,
): void {
  const effective = getResourceWithBufferedEdits(resource)
  const payload = buildBufferedPayload(effective, form)
  const idKey = formatResourceIdForApi(resource.resourceId)

  if (isResourcePayloadEqual(resource, payload)) {
    clearBufferedResource(idKey)
  } else {
    updateBufferedResource(resource, payload)
  }
}
