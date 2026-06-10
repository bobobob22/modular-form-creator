import { useCallback, useEffect, useState } from 'react'
import { createResource, deleteResource, listResources } from '@/shared/api/resources'
import { LABELS } from '@/shared/constants/labels'
import { LIST_QUERY_DEFAULTS } from '@/shared/constants/resourceDomain'
import type { Pagination, Resource } from '@/shared/types/resource'
import { getApiErrorMessage } from '@/shared/utils/apiError'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'
import { validateResourceName } from '@/shared/utils/resourceValidation'
import { useToast } from '@/shared/hooks/useToast'

const INITIAL_PAGE = 1

export function useResourcesList() {
  const { showToast } = useToast()
  const [page, setPage] = useState(INITIAL_PAGE)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [items, setItems] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newResourceName, setNewResourceName] = useState('')
  const [createError, setCreateError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null)

  const loadResourcesPage = useCallback(
    async (targetPage: number) => {
      setLoading(true)
      setError(null)

      try {
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

        setItems(response.items)
        setPagination(response.pagination)
        setPage(response.pagination.page)
      } catch (err) {
        const message = getApiErrorMessage(err, LABELS.ERRORS.LOAD_RESOURCES)
        setError(message)
        showToast({ variant: 'error', message })
      } finally {
        setLoading(false)
      }
    },
    [showToast],
  )

  useEffect(() => {
    queueMicrotask(() => {
      void loadResourcesPage(page)
    })
  }, [page, loadResourcesPage])

  const goToPage = (nextPage: number) => {
    if (!pagination) {
      setPage(nextPage)
      return
    }

    if (nextPage >= 1 && nextPage <= pagination.totalPages) {
      setPage(nextPage)
    }
  }

  const onNameChange = (value: string) => {
    setNewResourceName(value)
    setCreateError(null)
  }

  const handleCreate = async () => {
    const validationError = validateResourceName(newResourceName)
    if (validationError) {
      setCreateError(validationError)
      return
    }

    const trimmed = newResourceName.trim()

    setIsCreating(true)
    setCreateError(null)

    try {
      await createResource(trimmed)
      setNewResourceName('')
      if (page === INITIAL_PAGE) {
        await loadResourcesPage(INITIAL_PAGE)
      } else {
        setPage(INITIAL_PAGE)
      }
      showToast({ variant: 'success', message: LABELS.TOAST.CREATE_SUCCESS })
    } catch (err) {
      const message = getApiErrorMessage(err, LABELS.ERRORS.CREATE_RESOURCE)
      setCreateError(message)
      showToast({ variant: 'error', message })
    } finally {
      setIsCreating(false)
    }
  }

  const requestDelete = (resource: Resource) => {
    setResourceToDelete(resource)
  }

  const cancelDelete = () => {
    if (deletingId !== null) {
      return
    }
    setResourceToDelete(null)
  }

  const confirmDelete = async () => {
    if (!resourceToDelete) {
      return
    }

    setDeletingId(resourceToDelete.resourceId)
    setError(null)

    try {
      await deleteResource(formatResourceIdForApi(resourceToDelete.resourceId))
      setResourceToDelete(null)
      await loadResourcesPage(page)
      showToast({ variant: 'success', message: LABELS.TOAST.DELETE_SUCCESS })
    } catch (err) {
      const message = getApiErrorMessage(err, LABELS.ERRORS.DELETE_RESOURCE)
      setError(message)
      showToast({ variant: 'error', message })
    } finally {
      setDeletingId(null)
    }
  }

  return {
    items,
    loading,
    error,
    pagination,
    goToPage,
    newResourceName,
    onNameChange,
    createError,
    isCreating,
    deletingId,
    resourceToDelete,
    handleCreate,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}
