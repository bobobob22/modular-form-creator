import { ApiClientError } from '../api/client'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiClientError ? error.message : fallback
}
