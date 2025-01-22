import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import i18n from '@/plugins/i18n'

import HomeView from '@/views/HomeView.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'

const pinia = createPinia()

describe('HomeView', () => {
  it('should use default layout', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n, pinia],
      },
    })

    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true)
  })
})
