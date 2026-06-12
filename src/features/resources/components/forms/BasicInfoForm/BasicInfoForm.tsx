import { LABELS } from '@/shared/constants/labels'
import { PRIORITY_OPTIONS } from '@/shared/constants/resourceFormOptions'
import { parsePriorityFormValue } from '@/shared/utils/resourceFieldGuards'
import { FormActions } from '@/shared/components/common/FormActions/FormActions'
import { Button, Input, Select } from '@/design-system'
import { ErrorMessage } from '@/shared/styles/common.styles'
import type { BasicInfo } from '@/shared/types/resource'

interface BasicInfoFormProps {
  form: BasicInfo
  isCompleted: boolean
  isSubmitting: boolean
  submitError: string | null
  onFieldChange: <K extends keyof BasicInfo>(field: K, value: BasicInfo[K]) => void
  onSubmit: () => void
  onCancel: () => void
}

export function BasicInfoForm({
  form,
  isCompleted,
  isSubmitting,
  submitError,
  onFieldChange,
  onSubmit,
  onCancel,
}: BasicInfoFormProps) {
  const submitLabel = isSubmitting
    ? LABELS.FORM.SAVING
    : isCompleted
      ? LABELS.FORM.SUBMIT_CHANGES
      : LABELS.FORM.SAVE_MODULE

  return (
    <>
      <Input
        label={LABELS.FORM.FIELDS.RESOURCE_NAME}
        value={form.resourceName}
        state="locked"
        helperText={LABELS.FORM.RESOURCE_NAME_LOCKED}
      />
      <Input
        label={LABELS.FORM.FIELDS.OWNER}
        value={form.owner}
        helperText={LABELS.FORM.OWNER_HELPER}
        onChange={(event) => onFieldChange('owner', event.target.value)}
      />
      <Input
        label={LABELS.FORM.FIELDS.EMAIL}
        type="email"
        value={form.email}
        onChange={(event) => onFieldChange('email', event.target.value)}
      />
      <Input
        label={LABELS.FORM.FIELDS.DESCRIPTION}
        multiline
        rows={4}
        value={form.description}
        onChange={(event) => onFieldChange('description', event.target.value)}
      />
      <Select
        label={LABELS.FORM.FIELDS.PRIORITY}
        value={form.priority}
        onChange={(event) =>
          onFieldChange('priority', parsePriorityFormValue(event.target.value))
        }
        options={[
          { value: '', label: LABELS.FORM.SELECT_PRIORITY },
          ...PRIORITY_OPTIONS,
        ]}
      />
      {submitError ? <ErrorMessage>{submitError}</ErrorMessage> : null}
      <FormActions>
        <Button variant="ghost" onClick={onCancel}>
          {LABELS.COMMON.CANCEL}
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </FormActions>
    </>
  )
}
