import { useParams } from 'react-router-dom'
import { LABELS } from '@/shared/constants/labels'
import { BasicInfoForm } from '../components/forms/BasicInfoForm/BasicInfoForm'
import { useBasicInfoForm } from '../hooks/useBasicInfoForm'
import { useResource } from '../hooks/useResource'
import { CompletedEditNotice, ModuleFormPage } from './ModuleFormPage'

export function BasicInfoPage() {
  const { resourceId } = useParams()
  const { resource, loading, error } = useResource(resourceId)
  const {
    form,
    isCompleted,
    overviewPath,
    submitError,
    isSubmitting,
    updateField,
    handleSubmit,
    handleCancel,
  } = useBasicInfoForm(resource)

  const subtitle = isCompleted
    ? LABELS.FORM.COMPLETED_EDIT_SUBTITLE
    : LABELS.FORM.DRAFT_BASIC_INFO_SUBTITLE

  return (
    <ModuleFormPage
      title={LABELS.MODULE.BASIC_INFO}
      subtitle={subtitle}
      loading={loading}
      error={error}
      overviewPath={overviewPath}
      notices={<CompletedEditNotice show={isCompleted} />}
    >
      <BasicInfoForm
        form={form}
        isCompleted={isCompleted}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </ModuleFormPage>
  )
}
