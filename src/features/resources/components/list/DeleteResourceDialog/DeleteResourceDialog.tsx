import { LABELS } from '@/shared/constants/labels'
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog/ConfirmDialog'
import type { Resource } from '@/shared/types/resource'

interface DeleteResourceDialogProps {
  resource: Resource | null
  isDeleting: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteResourceDialog({
  resource,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteResourceDialogProps) {
  if (!resource) {
    return null
  }

  return (
    <ConfirmDialog
      isOpen={true}
      title={LABELS.RESOURCES_LIST.DELETE_DIALOG_TITLE}
      message={LABELS.RESOURCES_LIST.DELETE_DIALOG_MESSAGE(resource.name)}
      confirmLabel={
        isDeleting ? LABELS.RESOURCES_LIST.DELETING : LABELS.RESOURCES_LIST.DELETE
      }
      cancelLabel={LABELS.COMMON.CANCEL}
      isConfirming={isDeleting}
      confirmVariant="secondary"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}
