<script lang="ts" setup>
import { useGeneralStore } from '@/store'
import HeaderNavbar from './HeaderNavbar.vue'
import scrolls from '@/utils/scrolls'

const store = useGeneralStore()
</script>

<template>
  <header class="header" :class="{ sticky: store.websiteScrolled }">
    <div class="container header__wrapper">
      <img @click="scrolls.toTop" class="header__logo" src="@/assets/images/logo.png" />
      <HeaderNavbar />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  height: v.$header-height-mobile;
  background-color: v.$color-header;
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: v.$width-md) {
    background-color: transparent;
    height: v.$header-height;
  }

  &.sticky {
    position: sticky;
    background-color: v.$color-header-scrolled;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 15px;
  }

  &__logo {
    width: calc(70px - (2 * 15px));
  }
}
</style>
