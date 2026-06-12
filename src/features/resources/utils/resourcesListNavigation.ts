import type { Pagination } from '@/shared/types/resource'

export const RESOURCES_LIST_INITIAL_PAGE = 1

export function resolveListPageChange(
  nextPage: number,
  pagination: Pagination | null,
): number | null {
  if (!pagination) {
    return nextPage
  }

  if (nextPage >= 1 && nextPage <= pagination.totalPages) {
    return nextPage
  }

  return null
}

export function shouldReloadCurrentPageAfterCreate(
  currentPage: number,
  initialPage = RESOURCES_LIST_INITIAL_PAGE,
): boolean {
  return currentPage === initialPage
}

export async function deferResourcesListPageLoad(
  targetPage: number,
  loadPage: (page: number) => Promise<void>,
): Promise<void> {
  await Promise.resolve()
  await loadPage(targetPage)
}
