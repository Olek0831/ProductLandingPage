import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

import i18n from '@/plugins/i18n'

import { useGeneralStore } from '@/store'
import BaseHeader from '@/components/BaseHeader.vue'
import HeaderNavbar from '@/components/HeaderNavbar.vue'

const pinia = setActivePinia(createPinia())

describe('BaseHeader', () => {
  it('should render logo', () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [i18n, pinia],
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('should render navbar component', () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [i18n, pinia],
      },
    })

    expect(wrapper.findComponent(HeaderNavbar).exists()).toBe(true)
  })

  it('should make header sticky when scrolled', async () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [i18n, pinia],
      },
    })
    const header = wrapper.find('header')

    expect(header.classes()).not.toContain('sticky')

    const store = useGeneralStore()

    window.scrollY = 100
    await store.updateWebsiteScrolled()

    expect(header.classes()).toContain('sticky')
  })
})

describe('Logo', () => {
  it('should scroll to top when clicked', () => {
    const wrapper = mount(BaseHeader, {
      global: {
        plugins: [i18n, pinia],
      },
    })
    window.scrollTo = vi.fn()

    wrapper.find('img').trigger('click')
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
