import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastStack } from '../components/common/Toast/ToastStack'
import {
  ToastContext,
  TOAST_AUTO_DISMISS_MS,
  type ToastItem,
  type ShowToastOptions,
} from './ToastContext'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismissToast = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutsRef.current.delete(id)
    }
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ variant, message }: ShowToastOptions) => {
      const id = crypto.randomUUID()
      const toast: ToastItem = { id, variant, message }

      setToasts((current) => [...current, toast])

      const timeout = setTimeout(() => {
        dismissToast(id)
      }, TOAST_AUTO_DISMISS_MS)

      timeoutsRef.current.set(id, timeout)
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
