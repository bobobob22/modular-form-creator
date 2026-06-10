import { IconButton } from '@/design-system'
import { LABELS } from '@/shared/constants/labels'
import { MetaText } from '@/shared/styles/common.styles'
import type { Pagination } from '@/shared/types/resource'
import { PaginationActions, PaginationBar } from './ResourceListPagination.styles'

interface ResourceListPaginationProps {
  pagination: Pagination
  disabled: boolean
  onPageChange: (page: number) => void
}

export function ResourceListPagination({
  pagination,
  disabled,
  onPageChange,
}: ResourceListPaginationProps) {
  const { page, totalPages, totalItems } = pagination
  const canGoPrevious = page > 1
  const canGoNext = page < totalPages

  if (totalPages <= 1) {
    return null
  }

  return (
    <PaginationBar aria-label="Resources pagination">
      <MetaText>
        {LABELS.RESOURCES_LIST.PAGINATION_SUMMARY(page, totalPages, totalItems)}
      </MetaText>
      <PaginationActions>
        <IconButton
          type="button"
          variant="ghost"
          size="small"
          aria-label={LABELS.RESOURCES_LIST.PAGINATION_PREVIOUS}
          disabled={disabled || !canGoPrevious}
          onClick={() => onPageChange(page - 1)}
        >
          ←
        </IconButton>
        <IconButton
          type="button"
          variant="ghost"
          size="small"
          aria-label={LABELS.RESOURCES_LIST.PAGINATION_NEXT}
          disabled={disabled || !canGoNext}
          onClick={() => onPageChange(page + 1)}
        >
          →
        </IconButton>
      </PaginationActions>
    </PaginationBar>
  )
}
