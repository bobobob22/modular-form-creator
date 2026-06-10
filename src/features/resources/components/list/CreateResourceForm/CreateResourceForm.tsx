import { Button, Input } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { SectionHeading } from '@/shared/components/common/SectionHeading/SectionHeading'
import {
  CreateResourceCard,
  CreateResourceSection,
  FormFields,
} from './CreateResourceForm.styles'

interface CreateResourceFormProps {
  name: string
  createError: string | null
  isCreating: boolean
  onNameChange: (value: string) => void
  onSubmit: () => void
}

export function CreateResourceForm({
  name,
  createError,
  isCreating,
  onNameChange,
  onSubmit,
}: CreateResourceFormProps) {
  return (
    <CreateResourceSection>
      <CreateResourceCard variant="elevated">
        <SectionHeading>{LABELS.RESOURCES_LIST.CREATE_SECTION}</SectionHeading>
        <FormFields>
          <Input
            label={LABELS.RESOURCES_LIST.RESOURCE_NAME}
            placeholder={LABELS.RESOURCES_LIST.NAME_PLACEHOLDER}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            error={createError ?? undefined}
            helperText={LABELS.RESOURCES_LIST.NAME_HELPER}
          />
          <Button variant="primary" onClick={onSubmit} disabled={isCreating}>
            {isCreating ? LABELS.RESOURCES_LIST.CREATING : LABELS.RESOURCES_LIST.CREATE_BUTTON}
          </Button>
        </FormFields>
      </CreateResourceCard>
    </CreateResourceSection>
  )
}
