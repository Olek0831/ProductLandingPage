import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { createI18n } from 'vue-i18n'

import BaseSelect from '@/components/BaseSelect.vue'

describe('BaseSelect', () => {
  const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: { One: 'One', Two: 'Two', Three: 'Three' } },
  })

  const options = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
  ]

  const modelValue = ref('1')

  it('should render select with options', () => {
    const wrapper = mount(BaseSelect, {
      global: {
        plugins: [i18n],
      },
      props: {
        options,
        modelValue,
      },
    })

    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findAll('option').length).toBe(options.length)
  })

  it('updates selected value by emit', () => {
    const wrapper = mount(BaseSelect, {
      global: {
        plugins: [i18n],
      },
      props: {
        options,
        modelValue,
      },
    })

    wrapper.find('select').element.value = '2'
    wrapper.find('select').trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
  })
})
