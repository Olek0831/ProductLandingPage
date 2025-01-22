<script setup lang="ts">
import type { SelectOption } from '@/types'

const props = defineProps({
  options: {
    type: Array<SelectOption>,
    required: true,
  },
  label: {
    type: String,
  },
})

const value = defineModel({ required: true })
</script>

<template>
  <select class="base-select" v-model="value">
    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ $t(option.label) }}
    </option>
  </select>
</template>

<style lang="scss">
.base-select {
  appearance: none;
  height: 36px;
  width: 100%;
  border: 1px solid v.$color-light-gray;
  border-radius: 8px;
  color: v.$color-gray;
  padding: 0 8px;
  background: url('@/assets/icons/caret-down-gray.svg') no-repeat right 8px center;
  background-size: 24px;

  & option {
    background-color: v.$color-white;
    color: v.$color-black;
  }
}
</style>
