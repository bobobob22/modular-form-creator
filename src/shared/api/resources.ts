import { apiRequest } from './client'
import type {
  BasicInfo,
  ListResourcesParams,
  ListResourcesResponse,
  ProjectDetails,
  Resource,
  ResourcePayload,
} from '../types/resource'

function buildQuery(params: ListResourcesParams): string {
  const search = new URLSearchParams()
  if (params.page !== undefined) search.set('page', String(params.page))
  if (params.pageSize !== undefined) search.set('pageSize', String(params.pageSize))
  if (params.status) search.set('status', params.status)
  if (params.name) search.set('name', params.name)
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const query = search.toString()
  return query ? `?${query}` : ''
}

export function listResources(params: ListResourcesParams = {}) {
  return apiRequest<ListResourcesResponse>(`/api/resources${buildQuery(params)}`)
}

export function getResource(id: string) {
  return apiRequest<Resource>(`/api/resources/${id}`)
}

export function createResource(resourceName: string) {
  return apiRequest<Resource>('/api/resources', {
    method: 'POST',
    body: JSON.stringify({ resourceName }),
  })
}

export function updateBasicInfo(id: string, data: BasicInfo) {
  return apiRequest<Resource>(`/api/resources/${id}/basic-info`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function updateProjectDetails(id: string, data: ProjectDetails) {
  return apiRequest<Resource>(`/api/resources/${id}/project-details`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function provisionResource(id: string) {
  return apiRequest<Resource>(`/api/resources/${id}/provisioning`, {
    method: 'PATCH',
  })
}

export function replaceResource(id: string, data: ResourcePayload) {
  return apiRequest<Resource>(`/api/resources/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteResource(id: string) {
  return apiRequest<Resource>(`/api/resources/${id}`, {
    method: 'DELETE',
  })
}
