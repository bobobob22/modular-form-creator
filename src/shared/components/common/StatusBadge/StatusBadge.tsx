import { Badge } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import type { ResourceStatus } from '@/shared/types/resource'
import { getResourceStatusBadgeVariant } from '@/shared/utils/resourceStatusPresentation'

export function StatusBadge({ status }: { status: ResourceStatus }) {
  const label =
    status === RESOURCE_STATUS.COMPLETED
      ? LABELS.STATUS.COMPLETED
      : LABELS.STATUS.DRAFT

  return <Badge variant={getResourceStatusBadgeVariant(status)}>{label}</Badge>
}
