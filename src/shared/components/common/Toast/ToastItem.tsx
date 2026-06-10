import { Badge, IconButton } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import type { ToastItem as ToastItemData } from '@/shared/context/ToastContext'
import { ToastCard, ToastHeader, ToastMessage } from './Toast.styles'

interface ToastItemProps {
  toast: ToastItemData
  onDismiss: (id: string) => void
}

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const isSuccess = toast.variant === 'success'
  const badgeLabel = isSuccess ? LABELS.TOAST.SUCCESS_TITLE : LABELS.TOAST.ERROR_TITLE

  return (
    <ToastCard variant="elevated" role="status" aria-live="polite">
      <ToastHeader>
        <Badge variant={isSuccess ? 'success' : 'warning'}>{badgeLabel}</Badge>
        <IconButton
          type="button"
          variant="ghost"
          size="small"
          aria-label={LABELS.TOAST.DISMISS}
          onClick={() => onDismiss(toast.id)}
        >
          ✕
        </IconButton>
      </ToastHeader>
      <ToastMessage>{toast.message}</ToastMessage>
    </ToastCard>
  )
}
