import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGeneralStore } from '@/store'

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns whether is running on mobile or desktop based on width', () => {
    const generalStore = useGeneralStore()

    window.innerWidth = 1000
    generalStore.updateIsMobile()
    expect(generalStore.isMobile).toBe(false)

    window.innerWidth = 500
    generalStore.updateIsMobile()
    expect(generalStore.isMobile).toBe(true)
  })

  it('returns whether position of the scroll is on top or not', () => {
    const generalStore = useGeneralStore()

    window.scrollY = 120
    generalStore.updateWebsiteScrolled()
    expect(generalStore.websiteScrolled).toBe(true)

    window.scrollY = 0
    generalStore.updateWebsiteScrolled()
    expect(generalStore.websiteScrolled).toBe(false)
  })
})
