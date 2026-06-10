import { useParams } from 'react-router-dom'
import { LABELS } from '@/shared/constants/labels'
import { NoticeBanner } from '@/shared/components/common/NoticeBanner/NoticeBanner'
import { ProjectDetailsForm } from '../components/forms/ProjectDetailsForm/ProjectDetailsForm'
import { useProjectDetailsForm } from '../hooks/useProjectDetailsForm'
import { useResource } from '../hooks/useResource'
import { CompletedEditNotice, ModuleFormPage } from './ModuleFormPage'

export function ProjectDetailsPage() {
  const { resourceId } = useParams()
  const { resource, loading, error } = useResource(resourceId)
  const {
    form,
    isCompleted,
    isAvailable,
    overviewPath,
    submitError,
    isSubmitting,
    updateField,
    handleSubmit,
    handleCancel,
  } = useProjectDetailsForm(resource)

  const subtitle = isCompleted
    ? LABELS.FORM.COMPLETED_EDIT_SUBTITLE
    : LABELS.FORM.PROJECT_DETAILS_DRAFT_SUBTITLE

  return (
    <ModuleFormPage
      title={LABELS.MODULE.PROJECT_DETAILS}
      subtitle={subtitle}
      loading={loading}
      error={error}
      overviewPath={overviewPath}
      notices={
        <>
          {!isAvailable ? (
            <NoticeBanner variant="warning">
              {LABELS.FORM.PROJECT_DETAILS_LOCKED_NOTICE}
            </NoticeBanner>
          ) : null}
          <CompletedEditNotice show={isCompleted} />
        </>
      }
    >
      <ProjectDetailsForm
        form={form}
        isCompleted={isCompleted}
        isAvailable={Boolean(isAvailable)}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </ModuleFormPage>
  )
}
