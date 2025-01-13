import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import HeaderNavbarLink from '@/components/HeaderNavbarLink.vue'

describe('HeaderNavbarLink', () => {
  it('should render link to section with correct properties', () => {
    const section = { name: 'Some Link' }

    const wrapper = mount(HeaderNavbarLink, {
      props: {
        section,
      },
    })

    expect(wrapper.find('a').text()).toBe(section.name)
  })
})
