import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const MAX_MOBILE_WIDTH = 768

  const isMobile = ref(window.innerWidth < MAX_MOBILE_WIDTH)
  const websiteScrolled = ref(false)

  const sections = [
    { name: 'Home' },
    { name: 'The Product' },
    { name: 'Author' },
    { name: 'Reviews' },
    { name: 'Contact' },
  ]

  function updateIsMobile() {
    isMobile.value = window.innerWidth < MAX_MOBILE_WIDTH
  }

  function updateWebsiteScrolled() {
    websiteScrolled.value = window.scrollY > 0
  }

  return { isMobile, websiteScrolled, updateIsMobile, updateWebsiteScrolled, sections }
})
