import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import i18n from '@/plugins/i18n'

import DefaultLayout from '@/layout/DefaultLayout.vue'
import BaseHeader from '@/components/BaseHeader.vue'

const pinia = createPinia()

describe('DefaultLayout', () => {
  it('should render header', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        plugins: [i18n, pinia],
      },
    })

    expect(wrapper.findComponent(BaseHeader).exists()).toBe(true)
  })
})
