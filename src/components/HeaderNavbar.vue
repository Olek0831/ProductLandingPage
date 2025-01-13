<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useGeneralStore } from '@/store'
import HeaderNavbarLink from './HeaderNavbarLink.vue'

const store = useGeneralStore()

const menuVisible = ref(false)
const animationFinished: Ref<boolean | null> = ref(null)

function toggleMenu() {
  menuVisible.value = !menuVisible.value
  animationFinished.value = false

  setTimeout(() => {
    animationFinished.value = true
  }, 200)
}
</script>

<template>
  <nav class="nav">
    <button class="nav__toggle-btn" @click="toggleMenu" v-if="store.isMobile">
      <i
        class="icon--hamburger"
        :class="{
          'animation-hide': menuVisible,
          'animation-show': !menuVisible && animationFinished,
          'nav__icon--hidden': !menuVisible && !(animationFinished ?? true),
        }"
      ></i>
      <i
        class="nav__icon--hidden icon--close"
        :class="{
          'animation-show': menuVisible && animationFinished,
          'animation-hide': !menuVisible,
        }"
      ></i>
    </button>
    <div
      class="nav__menu"
      :class="{ scrolled: store.websiteScrolled }"
      v-show="menuVisible || !store.isMobile"
    >
      <div class="container nav__menu-wrapper">
        <HeaderNavbarLink
          v-for="section in store.sections"
          :key="section.name"
          :section="section"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.nav {
  display: flex;
  align-items: center;
  gap: 20px;

  &__toggle-btn {
    all: unset;
    cursor: pointer;
    background-color: transparent;
  }

  &__icon--hidden {
    display: none;
  }

  &__menu {
    background-color: v.$color-header;
    width: 100%;
    position: absolute;
    top: v.$header-height-mobile;
    left: 0;
    padding: 0 15px 20px 15px;

    &.scrolled {
      background-color: v.$color-header-scrolled;

      @media (min-width: v.$width-md) {
        background-color: transparent;
      }
    }

    @media (min-width: v.$width-md) {
      position: static;
      padding: 0;
      background-color: transparent;
    }
  }

  &__menu-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-bottom: 15px;

    @media (min-width: v.$width-md) {
      flex-direction: row;
      padding: 0;
      gap: 20px;
    }
  }
}
</style>
