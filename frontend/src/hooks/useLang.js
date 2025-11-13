import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LIST } from "@constants/LanguageList";

export const LANG = "__lang__";

const useLang = () => {
  const { i18n } = useTranslation();

  // Initialize selectedLang from localStorage or i18n.language 
  const [selectedLang, setSelectedLang] = useState(
    LANGUAGE_LIST.find(lang => lang.value === localStorage.getItem(LANG)) ||
    LANGUAGE_LIST[0]
  );

  // Get language in local storage
  useEffect(() => {
    const currentLang = localStorage.getItem(LANG);
    if (currentLang !== i18n.language) {
      i18n.changeLanguage(currentLang);
    };
  }, []);

  // Change language based on user command
  useEffect(() => {
    if (!LANGUAGE_LIST.find(lang => lang.value === selectedLang.value)) return;
    i18n.changeLanguage(selectedLang.value);
    localStorage.setItem(LANG, selectedLang.value);
  }, [selectedLang]);

  return { selectedLang, setSelectedLang };
};

export default useLang;