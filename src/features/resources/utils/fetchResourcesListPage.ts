import { listResources } from '@/shared/api/resources'
import { LIST_QUERY_DEFAULTS } from '@/shared/constants/resourceDomain'
import type { Pagination, Resource } from '@/shared/types/resource'

export async function fetchResourcesListPage(targetPage: number): Promise<{
  items: Resource[]
  pagination: Pagination
}> {
  let pageToLoad = targetPage
  let response = await listResources({
    page: pageToLoad,
    pageSize: LIST_QUERY_DEFAULTS.PAGE_SIZE,
    sortOrder: LIST_QUERY_DEFAULTS.SORT_ORDER,
  })

  while (response.items.length === 0 && response.pagination.page > 1) {
    pageToLoad = response.pagination.page - 1
    response = await listResources({
      page: pageToLoad,
      pageSize: LIST_QUERY_DEFAULTS.PAGE_SIZE,
      sortOrder: LIST_QUERY_DEFAULTS.SORT_ORDER,
    })
  }

  return { items: response.items, pagination: response.pagination }
}
