import { createI18n } from 'vue-i18n'

import en from './translations/en.json'
import pl from './translations/pl.json'
import nl from './translations/nl.json'

const messages = { en, pl, nl }

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
})

export default i18n
