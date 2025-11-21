import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../src/locales/en/translation.json";
import vi from "../src/locales/vi/translation.json";
import zhCN from "../src/locales/zh-CN/translation.json";
import zhTW from "../src/locales/zh-TW/translation.json";

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "zh-CN", "zh-TW", "vi"],
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      "zh-CN": { translation: zhCN },
      "zh-TW": { translation: zhTW },
    },
  });

export default i18next;
