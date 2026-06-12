import type { BasicInfo, ProjectDetails } from '../types/resource'

export const EMPTY_BASIC_INFO: BasicInfo = {
  resourceName: '',
  owner: '',
  email: '',
  description: '',
  priority: '',
}

export const EMPTY_PROJECT_DETAILS: ProjectDetails = {
  projectName: '',
  budget: '',
  category: '',
  options: [],
}
