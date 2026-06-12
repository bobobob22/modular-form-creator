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

export function isResourcePayloadEqual(resource: Resource, payload: ResourcePayload): boolean {
  return (
    resource.name === payload.name &&
    JSON.stringify(resource.basicInfo) === JSON.stringify(payload.basicInfo) &&
    JSON.stringify(resource.projectDetails) === JSON.stringify(payload.projectDetails)
  )
}
