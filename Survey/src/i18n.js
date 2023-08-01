import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      preload: true,      
    },
    keySeparator: false,
    nsSeparator: false,
    react: {
      useSuspense: false,
    },    
  })

export default i18n

