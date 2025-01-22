import { RouterView, createRouter, createWebHistory } from 'vue-router'

import i18n from '@/plugins/i18n'

import HomeView from '@/views/HomeView.vue'

import type { Locale } from '@/types'

const availableLocales = i18n.global.availableLocales

const routes = [
  {
    path: '/:locale?',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, _from) => {
  const localeParam = to.params.locale
  const localeParamExistsButNotAvailable =
    localeParam && !availableLocales.includes(localeParam.toString() as Locale)
  const defaultLocale = i18n.global.fallbackLocale.toString()

  if (localeParamExistsButNotAvailable) {
    // Redirect to the base route with the default locale
    i18n.global.locale = document.documentElement.lang = defaultLocale as Locale
    return { path: '/' }
  } else {
    // Set the locale if exist or fallback to the default one
    i18n.global.locale = document.documentElement.lang =
      (localeParam.toString() as Locale) || i18n.global.fallbackLocale
  }
})

export default router
