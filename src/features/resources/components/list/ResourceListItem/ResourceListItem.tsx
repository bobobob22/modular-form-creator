import { Link } from 'react-router-dom'
import { Button } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { ROUTES } from '@/shared/constants/routes'
import { ResourceStatusLayout } from '@/shared/components/common/ResourceStatusLayout/ResourceStatusLayout'
import { MetaText } from '@/shared/styles/common.styles'
import type { Resource } from '@/shared/types/resource'
import { formatResourceDate } from '@/shared/utils/formatDate'
import { getModulesProgressHint } from '@/shared/utils/modulesProgressHint'
import {
  ItemActions,
  ItemCard,
  ItemTitle,
} from './ResourceListItem.styles'

interface ResourceListItemProps {
  resource: Resource
  isDeleting: boolean
  onDeleteRequest: (resource: Resource) => void
}

export function ResourceListItem({
  resource,
  isDeleting,
  onDeleteRequest,
}: ResourceListItemProps) {
  const resourcePath = ROUTES.resource(resource.resourceId)
  const modulesHint = getModulesProgressHint(resource)

  const metaParts = [
    `${LABELS.OVERVIEW.RESOURCE_ID} ${resource.resourceId}`,
    formatResourceDate(resource.updatedAt),
  ]

  return (
    <ItemCard variant="outline">
      <ResourceStatusLayout status={resource.status}>
        <ItemTitle to={resourcePath}>{resource.name}</ItemTitle>
        <MetaText>{metaParts.join(` ${LABELS.RESOURCES_LIST.META_SEPARATOR} `)}</MetaText>
        {modulesHint ? <MetaText>{modulesHint}</MetaText> : null}
      </ResourceStatusLayout>

      <ItemActions>
        <Link to={resourcePath}>
          <Button variant="secondary" size="small">
            {LABELS.RESOURCES_LIST.OPEN_OVERVIEW}
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="small"
          disabled={isDeleting}
          onClick={() => onDeleteRequest(resource)}
        >
          {isDeleting ? LABELS.RESOURCES_LIST.DELETING : LABELS.RESOURCES_LIST.DELETE}
        </Button>
      </ItemActions>
    </ItemCard>
  )
}
