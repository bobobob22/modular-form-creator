import { describe, expect, it } from 'vitest'
import {
  isCategory,
  isPriority,
  parseCategoryFormValue,
  parsePriorityFormValue,
} from './resourceFieldGuards'

describe('resourceFieldGuards', () => {
  it('accepts valid priority values', () => {
    expect(isPriority('low')).toBe(true)
    expect(isPriority('medium')).toBe(true)
    expect(isPriority('high')).toBe(true)
  })

  it('rejects invalid priority values', () => {
    expect(isPriority('')).toBe(false)
    expect(isPriority('urgent')).toBe(false)
  })

  it('accepts valid category values', () => {
    expect(isCategory('internal')).toBe(true)
    expect(isCategory('external')).toBe(true)
    expect(isCategory('vendor')).toBe(true)
  })

  it('rejects invalid category values', () => {
    expect(isCategory('')).toBe(false)
    expect(isCategory('other')).toBe(false)
  })

  it('parses select values without assertions', () => {
    expect(parsePriorityFormValue('')).toBe('')
    expect(parsePriorityFormValue('low')).toBe('low')
    expect(parsePriorityFormValue('urgent')).toBe('')

    expect(parseCategoryFormValue('')).toBe('')
    expect(parseCategoryFormValue('vendor')).toBe('vendor')
    expect(parseCategoryFormValue('other')).toBe('')
  })
})
