<script setup lang="ts">
import i18n from '@/plugins/i18n'

const emit = defineEmits(['close'])

const languageSwitcherItems = i18n.global.availableLocales
</script>

<template>
  <div class="lng-sw-dialogue">
    <template v-for="item in languageSwitcherItems" :key="item">
      <span @click="emit('close')" v-if="item !== i18n.global.locale">
        <RouterLink :to="{ name: 'Home', params: { locale: item } }" class="lng-sw-dialogue__item">
          {{ $t('system.langs.' + item) }}
        </RouterLink>
      </span>
    </template>
  </div>
</template>

<style lang="scss">
.lng-sw-dialogue {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  background: v.$color-white;
  border: 1px solid v.$color-gray;
  border-radius: 8px;
  padding: 6px 0;

  &__item {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
    color: v.$color-black;

    &:hover {
      background-color: v.$color-light-gray;
      color: v.$color-primary;
    }
  }
}
</style>
