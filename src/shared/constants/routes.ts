export const ROUTE_SEGMENTS = {
  RESOURCES: 'resources',
  DETAILS: 'details',
  BASIC_INFO: 'basic-info',
  PROJECT_DETAILS: 'project-details',
} as const

export const ROUTES = {
  HOME: '/',
  RESOURCES_LIST: '/resources',
  resource: (id: string | number) => `/resources/${id}`,
  resourceDetails: (id: string | number) => `/resources/${id}/${ROUTE_SEGMENTS.DETAILS}`,
  resourceBasicInfo: (id: string | number) =>
    `/resources/${id}/${ROUTE_SEGMENTS.BASIC_INFO}`,
  resourceProjectDetails: (id: string | number) =>
    `/resources/${id}/${ROUTE_SEGMENTS.PROJECT_DETAILS}`,
} as const

export const ROUTE_PATTERNS = {
  RESOURCE_OVERVIEW: `/resources/:resourceId`,
  RESOURCE_DETAILS: `/resources/:resourceId/${ROUTE_SEGMENTS.DETAILS}`,
  RESOURCE_BASIC_INFO: `/resources/:resourceId/${ROUTE_SEGMENTS.BASIC_INFO}`,
  RESOURCE_PROJECT_DETAILS: `/resources/:resourceId/${ROUTE_SEGMENTS.PROJECT_DETAILS}`,
} as const
