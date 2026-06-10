import { Link, useParams } from 'react-router-dom'
import { Badge, Button } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { ROUTES } from '@/shared/constants/routes'
import { ResourcePageShell } from '@/shared/components/layout/ResourcePageShell/ResourcePageShell'
import { MetaText } from '@/shared/styles/common.styles'
import { ResourceDetailsContent } from '../components/details/ResourceDetailsContent/ResourceDetailsContent'
import { useResourceWithBufferedEdits } from '../hooks/useResourceWithBufferedEdits'
import { useResource } from '../hooks/useResource'

export function ResourceDetailsPage() {
  const { resourceId } = useParams()
  const { resource, loading, error } = useResource(resourceId)
  const { resourceWithBufferedEdits, hasBufferedEdits } =
    useResourceWithBufferedEdits(resource)

  const overviewPath = resourceWithBufferedEdits
    ? ROUTES.resource(resourceWithBufferedEdits.resourceId)
    : ROUTES.RESOURCES_LIST

  const title = resourceWithBufferedEdits?.name ?? LABELS.DETAILS.TITLE

  const headerMeta = resourceWithBufferedEdits ? (
    <>
      <MetaText>
        {LABELS.OVERVIEW.RESOURCE_ID}: {resourceWithBufferedEdits.resourceId}
      </MetaText>
      {hasBufferedEdits ? (
        <Badge variant="warning">{LABELS.DETAILS.BUFFER_NOTE}</Badge>
      ) : null}
    </>
  ) : undefined

  return (
    <ResourcePageShell
      title={title}
      subtitle={resourceWithBufferedEdits ? LABELS.DETAILS.SUBTITLE : undefined}
      resourceStatus={resourceWithBufferedEdits?.status}
      headerMeta={headerMeta}
      loading={loading}
      error={error}
      backTo={resourceWithBufferedEdits ? overviewPath : undefined}
      backLabel={resourceWithBufferedEdits ? LABELS.COMMON.OVERVIEW : undefined}
      actions={
        resourceWithBufferedEdits ? (
          <Link to={overviewPath}>
            <Button variant="secondary">{LABELS.DETAILS.BACK_TO_OVERVIEW}</Button>
          </Link>
        ) : undefined
      }
    >
      {resourceWithBufferedEdits ? (
        <ResourceDetailsContent resource={resourceWithBufferedEdits} />
      ) : null}
    </ResourcePageShell>
  )
}
