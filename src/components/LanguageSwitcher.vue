<script setup lang="ts">
import { ref } from 'vue'

import { useGeneralStore } from '@/store'
import LanguageSwitcherModal from './LanguageSwitcherModal.vue'
import LanguageSwitcherDialogue from './LanguageSwitcherDialogue.vue'

const store = useGeneralStore()

const modalVisible = ref(false)
const dialogueVisible = ref(false)

function toggleSwitcher() {
  if (store.isMobile) {
    modalVisible.value = !modalVisible.value
  } else {
    dialogueVisible.value = !dialogueVisible.value
  }
}
</script>

<template>
  <div class="lng-sw">
    <button class="lng-sw__button" @click="toggleSwitcher">
      <i class="icon--globe"></i>
      {{ store.isMobile ? $t('system.currentLang') : $t('system.currentLangIso') }}
      <i class="icon--caret-down" :class="{ active: dialogueVisible }" v-if="!store.isMobile"></i>
    </button>
    <LanguageSwitcherDialogue v-if="!store.isMobile && dialogueVisible" @close="toggleSwitcher" />
  </div>
  <LanguageSwitcherModal v-if="store.isMobile && modalVisible" @close="toggleSwitcher" />
</template>

<style lang="scss">
.lng-sw {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__button {
    all: unset;
    cursor: pointer;
    background-color: transparent;
    color: v.$color-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
    border: 1px solid v.$color-primary;
    border-radius: 100px;
    padding: 8px;
    margin-top: 16px;

    @media (min-width: v.$width-md) {
      color: v.$color-white;
      font-size: 14px;
      font-weight: v.$font-weight-regular;
      line-height: v.$menu-line-height;
      border: 0;
      padding: 0;
      margin: 0;
      width: unset;
    }
  }
}
</style>

<style lang="scss" scoped>
.icon--globe {
  @media (max-width: v.$width-md) {
    background: url('@/assets/icons/globe-orange.svg');
  }
}

.icon--caret-down {
  margin-top: -2px;
  margin-left: -2px;

  &.active {
    transform: rotate(180deg);
    margin-top: 0;
  }
}
</style>
