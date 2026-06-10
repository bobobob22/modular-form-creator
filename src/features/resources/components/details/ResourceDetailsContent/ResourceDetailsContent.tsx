import { LABELS } from '@/shared/constants/labels'
import type { Resource } from '@/shared/types/resource'
import { DetailsGrid } from '@/features/resources/styles/section.styles'
import { DetailField } from '../DetailField/DetailField'
import { DetailSection } from '../DetailSection/DetailSection'
import { DetailTeamMembers } from '../DetailTeamMembers/DetailTeamMembers'

interface ResourceDetailsContentProps {
  resource: Resource
}

export function ResourceDetailsContent({ resource }: ResourceDetailsContentProps) {
  const { basicInfo, projectDetails } = resource

  return (
    <DetailsGrid>
      <DetailSection title={LABELS.MODULE.BASIC_INFO}>
        <DetailField label={LABELS.FORM.FIELDS.RESOURCE_NAME} value={basicInfo.resourceName} />
        <DetailField label={LABELS.FORM.FIELDS.OWNER} value={basicInfo.owner} />
        <DetailField label={LABELS.FORM.FIELDS.EMAIL} value={basicInfo.email} />
        <DetailField label={LABELS.FORM.FIELDS.DESCRIPTION} value={basicInfo.description} />
        <DetailField label={LABELS.FORM.FIELDS.PRIORITY} value={basicInfo.priority} />
      </DetailSection>

      <DetailSection title={LABELS.MODULE.PROJECT_DETAILS}>
        <DetailField label={LABELS.FORM.FIELDS.PROJECT_NAME} value={projectDetails.projectName} />
        <DetailField label={LABELS.FORM.FIELDS.BUDGET} value={projectDetails.budget} />
        <DetailField label={LABELS.FORM.FIELDS.CATEGORY} value={projectDetails.category} />
        <DetailTeamMembers
          label={LABELS.FORM.FIELDS.TEAM_MEMBERS}
          members={projectDetails.options}
        />
      </DetailSection>
    </DetailsGrid>
  )
}
