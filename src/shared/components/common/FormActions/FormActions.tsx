import type { ReactNode } from 'react'
import { Actions } from './FormActions.styles'

export function FormActions({ children }: { children: ReactNode }) {
  return <Actions>{children}</Actions>
}
