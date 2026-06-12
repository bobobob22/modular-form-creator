export type ResourceStatus = 'draft' | 'completed'

export type Priority = 'low' | 'medium' | 'high'
export type Category = 'internal' | 'external' | 'vendor'

export type ModuleFormData = BasicInfo | ProjectDetails

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: Priority | ''
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: Category | ''
  options: string[]
}

export interface Resource {
  _id: string
  resourceId: number
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt: string
  updatedAt: string
}

export interface ResourcePayload {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export interface Pagination {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface ListResourcesResponse {
  items: Resource[]
  pagination: Pagination
}

export interface ListResourcesParams {
  page?: number
  pageSize?: number
  status?: ResourceStatus
  name?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ApiErrorBody {
  message: string
  details?: Record<string, unknown>
}
