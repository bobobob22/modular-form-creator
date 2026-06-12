import { describe, expect, it, vi } from 'vitest'
import {
  deferResourcesListPageLoad,
  RESOURCES_LIST_INITIAL_PAGE,
  resolveListPageChange,
  shouldReloadCurrentPageAfterCreate,
} from './resourcesListNavigation'

const pagination = { page: 2, pageSize: 10, totalItems: 25, totalPages: 3 }

describe('resolveListPageChange', () => {
  it('returns next page when pagination is not loaded yet', () => {
    expect(resolveListPageChange(2, null)).toBe(2)
  })

  it('returns page within bounds', () => {
    expect(resolveListPageChange(3, pagination)).toBe(3)
  })

  it('returns null for out-of-range page', () => {
    expect(resolveListPageChange(0, pagination)).toBeNull()
    expect(resolveListPageChange(4, pagination)).toBeNull()
  })
})

describe('shouldReloadCurrentPageAfterCreate', () => {
  it('reloads when already on the first page', () => {
    expect(shouldReloadCurrentPageAfterCreate(RESOURCES_LIST_INITIAL_PAGE)).toBe(true)
  })

  it('navigates to first page when on another page', () => {
    expect(shouldReloadCurrentPageAfterCreate(2)).toBe(false)
  })
})

describe('deferResourcesListPageLoad', () => {
  it('defers load until after microtask', async () => {
    const loadPage = vi.fn().mockResolvedValue(undefined)
    let deferred = false

    await deferResourcesListPageLoad(2, async (page) => {
      deferred = true
      await loadPage(page)
    })

    expect(deferred).toBe(true)
    expect(loadPage).toHaveBeenCalledWith(2)
  })
})
