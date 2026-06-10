import { Link, useParams } from 'react-router-dom'
import { Badge, Button } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { ROUTES } from '@/shared/constants/routes'
import { ResourcePageShell } from '@/shared/components/layout/ResourcePageShell/ResourcePageShell'
import { MetaText } from '@/shared/styles/common.styles'
import { ProvisioningSection } from '../components/overview/ProvisioningSection/ProvisioningSection'
import { ResourceOverviewModules } from '../components/overview/ResourceOverviewModules/ResourceOverviewModules'
import { useResourceWithBufferedEdits } from '../hooks/useResourceWithBufferedEdits'
import { useProvisionResource } from '../hooks/useProvisionResource'
import { useResource } from '../hooks/useResource'

export function ResourceOverviewPage() {
  const { resourceId } = useParams()
  const { resource, loading, error, setResource } = useResource(resourceId)
  const { resourceWithBufferedEdits, hasBufferedEdits } =
    useResourceWithBufferedEdits(resource)
  const { provisionError, isProvisioning, handleProvision } = useProvisionResource(
    resource,
    setResource,
  )

  const title = resourceWithBufferedEdits?.name ?? LABELS.OVERVIEW.TITLE

  const headerMeta = resourceWithBufferedEdits ? (
    <>
      <MetaText>
        {LABELS.OVERVIEW.RESOURCE_ID}: {resourceWithBufferedEdits.resourceId}
      </MetaText>
      {hasBufferedEdits ? (
        <Badge variant="warning">{LABELS.OVERVIEW.BUFFER_ACTIVE}</Badge>
      ) : null}
    </>
  ) : undefined

  return (
    <ResourcePageShell
      title={title}
      subtitle={resourceWithBufferedEdits ? LABELS.OVERVIEW.SUBTITLE : undefined}
      resourceStatus={resourceWithBufferedEdits?.status}
      headerMeta={headerMeta}
      loading={loading}
      error={error}
      backTo={resourceWithBufferedEdits ? ROUTES.RESOURCES_LIST : undefined}
      backLabel={resourceWithBufferedEdits ? LABELS.COMMON.ALL_RESOURCES : undefined}
      actions={
        resourceWithBufferedEdits ? (
          <Link to={ROUTES.resourceDetails(resourceWithBufferedEdits.resourceId)}>
            <Button variant="secondary">{LABELS.OVERVIEW.VIEW_DETAILS}</Button>
          </Link>
        ) : undefined
      }
    >
      {resourceWithBufferedEdits ? (
        <>
          <ResourceOverviewModules resource={resourceWithBufferedEdits} />
          <ProvisioningSection
            resource={resourceWithBufferedEdits}
            provisionError={provisionError}
            isProvisioning={isProvisioning}
            onProvision={handleProvision}
          />
        </>
      ) : null}
    </ResourcePageShell>
  )
}
