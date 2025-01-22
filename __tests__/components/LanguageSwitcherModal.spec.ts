import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import router from '@/router'
import i18n from '@/plugins/i18n'

import LanguageSwitcherModal from '@/components/LanguageSwitcherModal.vue'

const pinia = setActivePinia(createPinia())

describe('LanguageSwitcher Modal', () => {
  it('sends close emit with button', async () => {
    const emitHandler = vi.fn()

    const wrapper = mount(LanguageSwitcherModal, {
      global: {
        plugins: [i18n],
        mocks: {
          emit: emitHandler,
        },
      },
      attachTo: document.body,
    })

    await wrapper.find('.lng-sw-modal__button--close')!.trigger('click')
    expect(emitHandler).toHaveBeenCalledWith('close')
  })

  it('Has select with available languages', () => {
    const wrapper = mount(LanguageSwitcherModal, {
      global: {
        plugins: [router, i18n, pinia],
      },
    })

    expect(wrapper.findAll('option').length).toBe(i18n.global.availableLocales.length)
  })

  it('Changes language according to selected after clicking a button and sends on close emit', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(LanguageSwitcherModal, {
      global: {
        plugins: [router, i18n, pinia],
      },
      attachTo: document.body,
    })

    wrapper.find('select').element.value = 'nl'
    await wrapper.find('select').trigger('change')

    await wrapper.find('.lng-sw-modal__button--accept').trigger('click')
    await flushPromises()

    expect(document.querySelector('html')!.getAttribute('lang')).toBe('nl')
    expect(wrapper.vm.$i18n.locale).toBe('nl')
    expect(wrapper.vm.$route.params.locale).toBe('nl')

    expect(wrapper.emitted().close).toBeTruthy()
  })
})
