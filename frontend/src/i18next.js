import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "zh-CN", "zh-TW", "vi"],
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: "/src/locales/{{lng}}/translation.json"
    },
    detection: {
      order: ["localStorage", "navigator"],
    },
  });

export default i18next;