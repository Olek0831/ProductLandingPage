import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import router from '@/router'
import i18n from '@/plugins/i18n'

import { useGeneralStore } from '@/store'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import LanguageSwitcherModal from '@/components/LanguageSwitcherModal.vue'
import LanguageSwitcherDialogue from '@/components/LanguageSwitcherDialogue.vue'

const pinia = setActivePinia(createPinia())

describe('Language Switcher', () => {
  it('Displays current language on button', async () => {
    router.push('/')
    await router.isReady()

    const store = useGeneralStore()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [router, i18n, pinia],
      },
    })

    expect(wrapper.find('button').text()).toBe('EN')

    window.innerWidth = 500
    await store.updateIsMobile()

    expect(wrapper.find('button').text()).toBe('English')

    await wrapper.vm.$router.push('/nl')

    expect(wrapper.find('button').text()).toBe('Nederlands')

    window.innerWidth = 1000
    await store.updateIsMobile()

    expect(wrapper.find('button').text()).toBe('NL')

    await wrapper.vm.$router.push('/asdfghjkl')

    expect(wrapper.find('button').text()).toBe('EN')
  })

  it('Toggles modal when clicked on mobile', async () => {
    const store = useGeneralStore()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n, pinia],
      },
      attachTo: document.body,
    })

    window.innerWidth = 500
    await store.updateIsMobile()

    expect(wrapper.findComponent(LanguageSwitcherModal).exists()).toBe(false)

    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherModal).exists()).toBe(true)

    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherModal).exists()).toBe(false)
  })

  it('Closes modal when modal emits close', async () => {
    const store = useGeneralStore()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [i18n, pinia],
      },
      attachTo: document.body,
    })

    window.innerWidth = 500
    await store.updateIsMobile()
    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherModal).exists()).toBe(true)

    await wrapper.findComponent(LanguageSwitcherModal).vm.$emit('close')

    expect(wrapper.findComponent(LanguageSwitcherModal).exists()).toBe(false)
  })

  it('Toggles dialogue when clicked on dekstop', async () => {
    const store = useGeneralStore()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [router, i18n, pinia],
      },
      attachTo: document.body,
    })

    window.innerWidth = 1000
    await store.updateIsMobile()

    expect(wrapper.findComponent(LanguageSwitcherDialogue).exists()).toBe(false)

    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherDialogue).exists()).toBe(true)

    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherDialogue).exists()).toBe(false)
  })

  it('Closes dialogue when dialogue emits close', async () => {
    const store = useGeneralStore()

    const wrapper = mount(LanguageSwitcher, {
      global: {
        plugins: [router, i18n, pinia],
      },
      attachTo: document.body,
    })

    window.innerWidth = 1000
    await store.updateIsMobile()
    await wrapper.find('button').trigger('click')

    expect(wrapper.findComponent(LanguageSwitcherDialogue).exists()).toBe(true)

    await wrapper.findComponent(LanguageSwitcherDialogue).vm.$emit('close')

    expect(wrapper.findComponent(LanguageSwitcherDialogue).exists()).toBe(false)
  })
})
