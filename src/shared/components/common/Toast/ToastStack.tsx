import type { ToastItem as ToastItemData } from '@/shared/context/ToastContext'
import { ToastItem } from './ToastItem'
import { Stack } from './Toast.styles'

interface ToastStackProps {
  toasts: ToastItemData[]
  onDismiss: (id: string) => void
}

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) {
    return null
  }

  return (
    <Stack aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </Stack>
  )
}
