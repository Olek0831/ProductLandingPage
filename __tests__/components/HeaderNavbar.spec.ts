import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeaderNavbar from '@/components/HeaderNavbar.vue'
import HeaderNavbarLink from '@/components/HeaderNavbarLink.vue'
import { useGeneralStore } from '@/store'

const pinia = setActivePinia(createPinia())

describe('HeaderNavbar', () => {
  it('should render links to all sections', () => {
    const store = useGeneralStore()

    store.sections = [{ name: 'Section 1' }, { name: 'Section 2' }, { name: 'Section 3' }]

    const wrapper = mount(HeaderNavbar, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.findAllComponents(HeaderNavbarLink).length).toBe(store.sections.length)
  })

  it('should change visibility of hamburger button according to width', async () => {
    const wrapper = mount(HeaderNavbar, {
      global: {
        plugins: [pinia],
      },
    })

    const store = useGeneralStore()

    window.innerWidth = 1000
    await store.updateIsMobile()

    expect(wrapper.find('.nav__toggle-btn').exists()).toBe(false)

    window.innerWidth = 500
    await store.updateIsMobile()

    expect(wrapper.find('.nav__toggle-btn').exists()).toBe(true)
  })

  it('should toggle visibility of links when hamburger button is clicked', async () => {
    const wrapper = mount(HeaderNavbar, {
      global: {
        plugins: [pinia],
      },
      attachTo: document.body,
    })

    const store = useGeneralStore()

    window.innerWidth = 500
    await store.updateIsMobile()

    expect(wrapper.find('.nav__menu').isVisible()).toBe(false)

    await wrapper.find('.nav__toggle-btn').trigger('click')

    expect(wrapper.find('.nav__menu').isVisible()).toBe(true)
  })
})
