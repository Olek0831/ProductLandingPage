import i18n from '@/plugins/i18n'

export type Locale = typeof i18n.global.locale

export type Section = {
  name: string
}

export type SelectOption = {
  label: string
  value: string | number
}

export type EventTarget = HTMLElement | Document | Window
