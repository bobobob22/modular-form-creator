import type { ApiErrorBody } from '../types/resource'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001'

export class ApiClientError extends Error {
  status: number
  details?: Record<string, unknown>

  constructor(status: number, message: string, details?: Record<string, unknown>) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.details = details
  }
}

async function parseError(response: Response): Promise<ApiClientError> {
  try {
    const body = (await response.json()) as ApiErrorBody
    return new ApiClientError(response.status, body.message, body.details)
  } catch {
    return new ApiClientError(response.status, response.statusText || 'Request failed')
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw await parseError(response)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
