import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import router from '@/router'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'

beforeEach(async () => {
  router.push('/')
  await router.isReady()
})

describe('App', () => {
  it('should render home view via routing', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router],
      },
    })

    expect(wrapper.findComponent(HomeView).exists()).toBe(true)
  })

  it('should change language to nl via routing', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router],
      },
    })

    await wrapper.vm.$router.push('/nl')

    expect(document.querySelector('html')!.getAttribute('lang')).toBe('nl')
    expect(wrapper.vm.$i18n.locale).toBe('nl')
  })

  it('should redirect to the base route with the default locale if locale not available', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n, router],
      },
    })

    await wrapper.vm.$router.push('/asdfghjkl')

    expect(document.querySelector('html')!.getAttribute('lang')).toBe('en')
    expect(wrapper.vm.$i18n.locale).toBe('en')
    expect(wrapper.vm.$route.path).toBe('/')
  })
})
