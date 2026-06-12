import { replaceResource } from '@/shared/api/resources'
import type {
  ModuleFormData,
  Resource,
  ResourcePayload,
} from '@/shared/types/resource'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'

export type SubmitResourceModuleFormResult =
  | { ok: true }
  | { ok: false; validationError: string }

export async function submitResourceModuleForm<TForm extends ModuleFormData>(
  resource: Resource,
  effectiveResource: Resource,
  form: TForm,
  isCompleted: boolean,
  validateForm: (form: TForm) => string | null,
  saveDraft: (resourceId: string, form: TForm) => Promise<unknown>,
  buildBufferedPayload: (effective: Resource, form: TForm) => ResourcePayload,
  clearBufferedResource: (resourceIdKey: string) => void,
): Promise<SubmitResourceModuleFormResult> {
  const validationError = validateForm(form)
  if (validationError) {
    return { ok: false, validationError }
  }

  const resourceIdKey = formatResourceIdForApi(resource.resourceId)

  if (isCompleted) {
    await replaceResource(
      resourceIdKey,
      buildBufferedPayload(effectiveResource, form),
    )
  } else {
    await saveDraft(resourceIdKey, form)
  }

  clearBufferedResource(resourceIdKey)
  return { ok: true }
}
