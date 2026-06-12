import { useCallback, useEffect, useState } from 'react'
import { createResource, deleteResource } from '@/shared/api/resources'
import { LABELS } from '@/shared/constants/labels'
import type { Pagination, Resource } from '@/shared/types/resource'
import { getApiErrorMessage } from '@/shared/utils/apiError'
import { formatResourceIdForApi } from '@/shared/utils/resourceApi'
import { validateResourceName } from '@/shared/utils/resourceValidation'
import { useToast } from '@/shared/hooks/useToast'
import { fetchResourcesListPage } from '../utils/fetchResourcesListPage'
import {
  deferResourcesListPageLoad,
  RESOURCES_LIST_INITIAL_PAGE,
  resolveListPageChange,
  shouldReloadCurrentPageAfterCreate,
} from '../utils/resourcesListNavigation'

export function useResourcesList() {
  const { showToast } = useToast()
  const [page, setPage] = useState(RESOURCES_LIST_INITIAL_PAGE)
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
        const { items: loadedItems, pagination: loadedPagination } =
          await fetchResourcesListPage(targetPage)

        setItems(loadedItems)
        setPagination(loadedPagination)
        setPage(loadedPagination.page)
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
    deferResourcesListPageLoad(page, loadResourcesPage)
  }, [page, loadResourcesPage])

  const goToPage = (nextPage: number) => {
    const resolvedPage = resolveListPageChange(nextPage, pagination)
    if (resolvedPage !== null) {
      setPage(resolvedPage)
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
      if (shouldReloadCurrentPageAfterCreate(page)) {
        await loadResourcesPage(RESOURCES_LIST_INITIAL_PAGE)
      } else {
        setPage(RESOURCES_LIST_INITIAL_PAGE)
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
