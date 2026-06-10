import type { Resource } from '../types/resource'
import { RESOURCE_STATUS } from '../constants/resourceDomain'

export function getResourceStatusBadgeVariant(status: Resource['status']) {
  return status === RESOURCE_STATUS.COMPLETED ? 'success' : 'info'
}
