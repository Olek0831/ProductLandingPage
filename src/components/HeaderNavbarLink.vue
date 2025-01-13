<script setup lang="ts">
import type { Section } from '@/types'

const props = defineProps<{
  section: Section
}>()
</script>

<template>
  <a href="#" class="nav-link">{{ props.section.name }}</a>
</template>

<style lang="scss">
.nav-link {
  text-decoration: none;
  color: v.$color-white;
  margin: 10px;
  font-size: v.$menu-font-size;
  font-weight: v.$font-weight-regular;
  line-height: 18px;

  &:hover {
    color: v.$color-primary;
  }
}
</style>
