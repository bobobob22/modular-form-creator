import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourcePayload,
} from '../types/resource'

export function formatResourceIdForApi(resourceId: number): string {
  return String(resourceId)
}

export function cloneProjectDetails(projectDetails: ProjectDetails): ProjectDetails {
  return {
    ...projectDetails,
    options: [...projectDetails.options],
  }
}

export function buildBasicInfoPayload(
  effective: Resource,
  basicInfo: BasicInfo,
): ResourcePayload {
  return {
    name: effective.name,
    basicInfo: { ...basicInfo },
    projectDetails: cloneProjectDetails(effective.projectDetails),
  }
}

export function buildProjectDetailsPayload(
  effective: Resource,
  projectDetails: ProjectDetails,
): ResourcePayload {
  return {
    name: effective.name,
    basicInfo: { ...effective.basicInfo },
    projectDetails: cloneProjectDetails(projectDetails),
  }
}

export function applyPayloadToResource(resource: Resource, payload: ResourcePayload): Resource {
  return {
    ...resource,
    name: payload.name,
    basicInfo: { ...payload.basicInfo },
    projectDetails: cloneProjectDetails(payload.projectDetails),
  }
}
