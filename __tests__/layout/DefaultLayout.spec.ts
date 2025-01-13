import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import BaseHeader from '@/components/BaseHeader.vue'

const pinia = createPinia()

describe('DefaultLayout', () => {
  it('should render navbar', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.findComponent(BaseHeader).exists()).toBe(true)
  })
})
