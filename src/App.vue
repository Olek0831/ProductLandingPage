<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGeneralStore } from './store'
import { useEventListener } from './composables/useEventListener'

const store = useGeneralStore()

useEventListener(window, 'resize', store.updateIsMobile)
useEventListener(window, 'scroll', store.updateWebsiteScrolled)
</script>

<template>
  <RouterView />
</template>
