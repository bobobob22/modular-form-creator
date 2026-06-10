import { LABELS } from '@/shared/constants/labels'
import {
  CATEGORY_OPTIONS,
  TEAM_MEMBER_OPTIONS,
} from '@/shared/constants/resourceForm'
import { FormActions } from '@/shared/components/common/FormActions/FormActions'
import { Button, CheckboxGroup, Input, Select } from '@/design-system'
import { ErrorMessage } from '@/shared/styles/common.styles'
import type { ProjectDetails } from '@/shared/types/resource'

interface ProjectDetailsFormProps {
  form: ProjectDetails
  isCompleted: boolean
  isAvailable: boolean
  isSubmitting: boolean
  submitError: string | null
  onFieldChange: <K extends keyof ProjectDetails>(
    field: K,
    value: ProjectDetails[K],
  ) => void
  onSubmit: () => void
  onCancel: () => void
}

export function ProjectDetailsForm({
  form,
  isCompleted,
  isAvailable,
  isSubmitting,
  submitError,
  onFieldChange,
  onSubmit,
  onCancel,
}: ProjectDetailsFormProps) {
  const submitLabel = isSubmitting
    ? LABELS.FORM.SAVING
    : isCompleted
      ? LABELS.FORM.SUBMIT_CHANGES
      : LABELS.FORM.SAVE_MODULE

  return (
    <>
      <Input
        label={LABELS.FORM.FIELDS.PROJECT_NAME}
        value={form.projectName}
        disabled={!isAvailable}
        onChange={(event) => onFieldChange('projectName', event.target.value)}
      />
      <Input
        label={LABELS.FORM.FIELDS.BUDGET}
        value={form.budget}
        disabled={!isAvailable}
        helperText={LABELS.FORM.BUDGET_HELPER}
        onChange={(event) => onFieldChange('budget', event.target.value)}
      />
      <Select
        label={LABELS.FORM.FIELDS.CATEGORY}
        value={form.category}
        disabled={!isAvailable}
        onChange={(event) => onFieldChange('category', event.target.value)}
        options={[
          { value: '', label: LABELS.FORM.SELECT_CATEGORY },
          ...CATEGORY_OPTIONS,
        ]}
      />
      <CheckboxGroup
        label={LABELS.FORM.FIELDS.TEAM_MEMBERS}
        options={[...TEAM_MEMBER_OPTIONS]}
        value={form.options}
        disabled={!isAvailable}
        onChange={(value) => onFieldChange('options', value)}
        helper={LABELS.FORM.TEAM_MEMBERS_HELPER}
      />
      {submitError ? <ErrorMessage>{submitError}</ErrorMessage> : null}
      <FormActions>
        <Button variant="ghost" onClick={onCancel}>
          {LABELS.COMMON.CANCEL}
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!isAvailable || isSubmitting}
        >
          {submitLabel}
        </Button>
      </FormActions>
    </>
  )
}
