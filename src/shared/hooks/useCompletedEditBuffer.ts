import { useContext } from 'react'
import { CompletedEditBufferContext } from '../context/CompletedEditBufferContext'

export function useCompletedEditBuffer() {
  const context = useContext(CompletedEditBufferContext)
  if (!context) {
    throw new Error('useCompletedEditBuffer must be used within CompletedEditBufferProvider')
  }
  return context
}
