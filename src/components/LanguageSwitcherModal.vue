<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router'
import i18n from '@/plugins/i18n'

import BaseSelect from '@/components/BaseSelect.vue'

const emit = defineEmits(['close'])

const selectedLanguage = ref(i18n.global.locale)

const selectableLanguages = i18n.global.availableLocales.map((locale) => {
  return {
    value: locale,
    label: 'system.langs.' + locale,
  }
})

function changeLanguage() {
  router.push({ name: 'Home', params: { locale: selectedLanguage.value } })
  emit('close')
}
</script>

<template>
  <div class="lng-sw-modal__shadowbox">
    <div class="lng-sw-modal">
      <div class="lng-sw-modal__header">
        <span>{{ $t('language-switcher.title') }}</span>
        <button class="lng-sw-modal__button lng-sw-modal__button--close" @click="emit('close')">
          <i class="icon--close-gray"></i>
        </button>
      </div>
      <BaseSelect :options="selectableLanguages" v-model="selectedLanguage" />
      <div class="lng-sw-modal__btn-wrapper">
        <button @click="changeLanguage" class="lng-sw-modal__button lng-sw-modal__button--accept">
          {{ $t('general.accept') }}
        </button>
        <button @click="emit('close')" class="lng-sw-modal__button lng-sw-modal__button--cancel">
          {{ $t('general.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.lng-sw-modal {
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: v.$color-white;
  border: 1px solid v.$color-gray;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 420px;
  gap: 24px;
  font-size: 16px;
  line-height: 18px;

  &__shadowbox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: v.$color-shadowbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__button {
    all: unset;
    cursor: pointer;

    &--accept {
      background-color: v.$color-primary;
      color: v.$color-white;
      border-radius: 8px;
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--cancel {
      background-color: v.$color-white;
      color: v.$color-primary;
      border: 1px solid v.$color-primary;
      border-radius: 8px;
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
