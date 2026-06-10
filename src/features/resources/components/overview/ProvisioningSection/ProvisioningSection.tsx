import { Button } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import { ErrorMessage, MutedMessage } from '@/shared/styles/common.styles'
import type { Resource } from '@/shared/types/resource'
import { canProvisionResource } from '@/shared/utils/moduleCompletion'
import {
  SectionCard,
  SectionDescription,
  SectionTitle,
} from '@/features/resources/styles/section.styles'

interface ProvisioningSectionProps {
  resource: Resource
  provisionError: string | null
  isProvisioning: boolean
  onProvision: () => void
}

export function ProvisioningSection({
  resource,
  provisionError,
  isProvisioning,
  onProvision,
}: ProvisioningSectionProps) {
  const canProvision = canProvisionResource(resource)
  const isCompleted = resource.status === RESOURCE_STATUS.COMPLETED

  return (
    <SectionCard variant="outline">
      <SectionTitle>{LABELS.OVERVIEW.PROVISIONING}</SectionTitle>
      <SectionDescription>{LABELS.OVERVIEW.PROVISIONING_DESCRIPTION}</SectionDescription>
      {provisionError ? <ErrorMessage>{provisionError}</ErrorMessage> : null}
      {isCompleted ? (
        <MutedMessage>{LABELS.OVERVIEW.ALREADY_COMPLETED}</MutedMessage>
      ) : (
        <Button
          variant="primary"
          onClick={onProvision}
          disabled={!canProvision || isProvisioning}
          state={!canProvision ? 'locked' : 'normal'}
        >
          {isProvisioning
            ? LABELS.OVERVIEW.PROVISIONING_IN_PROGRESS
            : LABELS.OVERVIEW.PROVISION}
        </Button>
      )}
    </SectionCard>
  )
}
