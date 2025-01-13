import { describe, it, expect, vi } from 'vitest'
import scrolls from '@/utils/scrolls'

describe('scrolls', () => {
  it('should scroll to top', () => {
    window.scrollTo = vi.fn()

    scrolls.toTop()

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
