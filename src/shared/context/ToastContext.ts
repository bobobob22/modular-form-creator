import { createContext } from 'react'

export type ToastVariant = 'success' | 'error'

export interface ToastItem {
  id: string
  variant: ToastVariant
  message: string
}

export interface ShowToastOptions {
  variant: ToastVariant
  message: string
}

export interface ToastContextValue {
  showToast: (options: ShowToastOptions) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export const TOAST_AUTO_DISMISS_MS = 4500
