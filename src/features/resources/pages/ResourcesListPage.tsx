import { useState } from 'react'
import { LABELS } from '@/shared/constants/labels'
import { PageLayout } from '@/shared/components/layout/PageLayout/PageLayout'
import { CreateResourceForm } from '../components/list/CreateResourceForm/CreateResourceForm'
import { DeleteResourceDialog } from '../components/list/DeleteResourceDialog/DeleteResourceDialog'
import { ResourceList } from '../components/list/ResourceList/ResourceList'
import { useResourcesList } from '../hooks/useResourcesList'

export function ResourcesListPage() {
  const [showDraftsOnly, setShowDraftsOnly] = useState(false)
  const {
    items,
    loading,
    error,
    pagination,
    goToPage,
    newResourceName,
    onNameChange,
    createError,
    isCreating,
    deletingId,
    resourceToDelete,
    handleCreate,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useResourcesList()

  return (
    <PageLayout
      title={LABELS.RESOURCES_LIST.TITLE}
      subtitle={LABELS.RESOURCES_LIST.SUBTITLE}
    >
      <CreateResourceForm
        name={newResourceName}
        createError={createError}
        isCreating={isCreating}
        onNameChange={onNameChange}
        onSubmit={handleCreate}
      />
      <ResourceList
        items={items}
        loading={loading}
        error={error}
        pagination={pagination}
        deletingId={deletingId}
        showDraftsOnly={showDraftsOnly}
        onShowDraftsOnlyChange={setShowDraftsOnly}
        onDeleteRequest={requestDelete}
        onPageChange={goToPage}
      />
      <DeleteResourceDialog
        resource={resourceToDelete}
        isDeleting={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </PageLayout>
  )
}
