import { Button, Drawer, type ButtonVariant } from '@/design-system'
import { FormActions } from '../FormActions/FormActions'
import { DialogMessage } from './ConfirmDialog.styles'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  isConfirming?: boolean
  confirmVariant?: ButtonVariant
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  isConfirming = false,
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleClose = () => {
    if (!isConfirming) {
      onCancel()
    }
  }

  return (
    <Drawer title={title} isOpen={isOpen} onClose={handleClose}>
      <DialogMessage id="confirm-dialog-message">{message}</DialogMessage>
      <FormActions>
        <Button variant="ghost" onClick={onCancel} disabled={isConfirming}>
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {confirmLabel}
        </Button>
      </FormActions>
    </Drawer>
  )
}
