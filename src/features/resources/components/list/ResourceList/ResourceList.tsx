import { Checkbox } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { RESOURCE_STATUS } from '@/shared/constants/resourceDomain'
import { SectionHeading } from '@/shared/components/common/SectionHeading/SectionHeading'
import { ErrorMessage, MutedMessage } from '@/shared/styles/common.styles'
import type { Pagination, Resource } from '@/shared/types/resource'
import { ResourceListItem } from '../ResourceListItem/ResourceListItem'
import { ResourceListPagination } from '../ResourceListPagination/ResourceListPagination'
import { FilterRow, List, ListSection } from './ResourceList.styles'

interface ResourceListProps {
  items: Resource[]
  loading: boolean
  error: string | null
  pagination: Pagination | null
  deletingId: number | null
  showDraftsOnly: boolean
  onShowDraftsOnlyChange: (value: boolean) => void
  onDeleteRequest: (resource: Resource) => void
  onPageChange: (page: number) => void
}

export function ResourceList({
  items,
  loading,
  error,
  pagination,
  deletingId,
  showDraftsOnly,
  onShowDraftsOnlyChange,
  onDeleteRequest,
  onPageChange,
}: ResourceListProps) {
  const displayedItems = showDraftsOnly
    ? items.filter((resource) => resource.status === RESOURCE_STATUS.DRAFT)
    : items

  return (
    <ListSection>
      <SectionHeading>{LABELS.RESOURCES_LIST.LIST_SECTION}</SectionHeading>

      <FilterRow>
        <Checkbox
          label={LABELS.RESOURCES_LIST.FILTER_DRAFTS_ONLY}
          checked={showDraftsOnly}
          onChange={(event) => onShowDraftsOnlyChange(event.target.checked)}
        />
      </FilterRow>

      {loading ? <MutedMessage>{LABELS.RESOURCES_LIST.LOADING}</MutedMessage> : null}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      {!loading && displayedItems.length === 0 ? (
        <MutedMessage>
          {showDraftsOnly ? LABELS.RESOURCES_LIST.EMPTY_DRAFTS : LABELS.RESOURCES_LIST.EMPTY}
        </MutedMessage>
      ) : null}

      <List>
        {displayedItems.map((resource) => (
          <ResourceListItem
            key={resource._id}
            resource={resource}
            isDeleting={deletingId === resource.resourceId}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </List>

      {pagination ? (
        <ResourceListPagination
          pagination={pagination}
          disabled={loading || deletingId !== null}
          onPageChange={onPageChange}
        />
      ) : null}
    </ListSection>
  )
}
