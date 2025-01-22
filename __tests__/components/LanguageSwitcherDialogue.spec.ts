import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { computed } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

import router from '@/router'
import i18n from '@/plugins/i18n'

import LanguageSwitcherDialogue from '@/components/LanguageSwitcherDialogue.vue'

const pinia = setActivePinia(createPinia())

describe('Language switcher dialogue', () => {
  it('Renders list of available languages except current one', async () => {
    const wrapper = mount(LanguageSwitcherDialogue, {
      global: {
        plugins: [router, i18n, pinia],
      },
      attachTo: document.body,
    })

    expect(wrapper.findAll('.lng-sw-dialogue__item').length).toBe(
      i18n.global.availableLocales.length - 1,
    )

    const itemsTexts = computed(() => {
      return wrapper.findAll('.lng-sw-dialogue__item').map((item) => {
        return item.text()
      })
    })

    expect(itemsTexts.value).contain('Polski')
    expect(itemsTexts.value).not.contain('English')

    await wrapper.vm.$router.push('/pl')

    expect(wrapper.findAll('.lng-sw-dialogue__item').length).toBe(
      i18n.global.availableLocales.length - 1,
    )

    expect(itemsTexts.value).contain('English')
    expect(itemsTexts.value).not.contain('Polski')
  })
})

describe('Language switcher dialogue item', () => {
  it('Changes site language and closes dialogue', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(LanguageSwitcherDialogue, {
      global: {
        plugins: [i18n, router, pinia],
      },
      attachTo: document.body,
    })

    const changeToNederlandsBtn = wrapper.findAll('.lng-sw-dialogue__item').find((item) => {
      return item.text() === 'Nederlands'
    })

    await changeToNederlandsBtn!.trigger('click')
    await flushPromises()

    expect(document.querySelector('html')!.getAttribute('lang')).toBe('nl')
    expect(wrapper.vm.$i18n.locale).toBe('nl')
    expect(wrapper.vm.$route.params.locale).toBe('nl')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
