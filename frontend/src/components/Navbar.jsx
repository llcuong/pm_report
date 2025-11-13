import DropdownIcon from "@assets/icons/dropdown-icon";
import DropdownDataCustom from "./DropdownDataCustom";
import useLang from "@hooks/useLang";
import { LANGUAGE_LIST } from "@constants/LanguageList";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const {
    selectedLang, setSelectedLang,
  } = useLang();

  const { t } = useTranslation();

  return (
    <nav
      className="bg-(--bg-primary) shadow-[0_10px_5px_-3px_var(--navbar-shadow-color),0_4px_6px_-2px_var(--navbar-shadow-color)] sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-baseline h-16">
          <div className="flex items-center w-[15%]">
            <div className="flex items-center shrink-0">
              <div>
                <a href="/">
                  <img className="h-12"
                    src="https://www.pmgloves.com/images/PreciousMountain-EN-LOGO.jpg" alt="PM Group" />
                </a>
              </div>
            </div>

            <div className="ml-8 shrink-0">
            </div>
          </div>

          <div className="flex flex-row items-center justify-end mx-4 w-[79%]">
            <DropdownDataCustom
              id='lang'
              options={LANGUAGE_LIST}
              value={selectedLang}
              onChange={setSelectedLang}
              placeholder="Language"
              buttonClassName="w-40"
              menuClassName="w-40"
            />
          </div>

          <div className="flex items-center justify-end gap-1 w-[6%]">
            <span className="text-(--text-secondary) px-3 py-2 text-sm font-medium transition-colors">
              {t('navbar.version')} 0.1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
