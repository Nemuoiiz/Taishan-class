import { createI18n } from 'vue-i18n'
import zhHant from './zhHant'

const i18n = createI18n({
  locale: 'zhHant',
  fallback: 'zhHant',
  legacy: false,
  messages: {
    zhHant
  }
})

export default i18n
