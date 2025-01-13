<script setup lang="ts">
import DefaultLayout from '@/layout/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <main>
      <!-- <Component v-for="section in sections" :key="section.name" :is="'Section' + section.name" /> -->
      {{ $t('hello') }}
    </main>
  </DefaultLayout>
</template>

<style lang="scss">
main {
  height: 1000px;
}
</style>
