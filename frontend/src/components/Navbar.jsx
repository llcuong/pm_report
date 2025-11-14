import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import DropdownDataCustom from "./DropdownDataCustom";
import useSignOut from "@hooks/useSignOut";
import useLang from "@hooks/useLang";
import useAuthorUser from "@hooks/useAuthorUser";
import { LANGUAGE_LIST } from "@constants/LanguageList";
import AuthorUserTaskList from "@constants/AuthorUserTaskList";

export default function Navbar() {
  const [isSignOutSuccess, setIsSignOutSuccess] = useState(false);

  const onSignOutSuccess = () => setIsSignOutSuccess(true);

  const {
    selectedLang, setSelectedLang,
  } = useLang();

  const {
    isOpen,
    handleSelectedTask,
    dropdownRef,
    toggleDropdown,
  } = useAuthorUser();

  const {
    defaultUserName, userName, isAdmin,
    handleSignOut,
  } = useSignOut({ onSignOutSuccess });

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

          <div className="flex flex-row gap-4 items-center justify-end mx-4 w-[77%]">
            <DropdownDataCustom
              id='lang'
              options={LANGUAGE_LIST}
              value={selectedLang}
              onChange={setSelectedLang}
              placeholder="Language"
              buttonClassName="w-40"
              menuClassName="w-40"
            />

            {
              userName === defaultUserName && isAdmin && (
                <div className="relative">
                  <button className={`w-10 h-10 border rounded-[50%] flex items-center justify-center ${isOpen && 'bg-[#aececf]'}
                                    hover:bg-[#aececf] transition duration-200 cursor-pointer`}
                    ref={dropdownRef}
                    onClick={toggleDropdown}
                    title="Auth User"
                  >
                    <MdOutlineAdminPanelSettings className="text-2xl" />
                  </button>

                  {
                    isOpen && (
                      <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto left-0 w-40">
                        <ul className="text-sm text-gray-700 border-b border-gray-100 last:border-b-0">
                          {
                            AuthorUserTaskList.map(task => (
                              <li className='px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-[#aececf]'
                                key={task.id}
                                onClick={() => handleSelectedTask(task.id)}>
                                <span className="text-sm font-semibold">
                                  {t(`navbar.${task.label}`)}
                                </span>
                              </li>
                            ))
                          }
                          <li className="px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-[#aececf]"
                            onClick={handleSignOut}>
                            <span className="text-sm font-semibold text-red-600">
                              {t('sidebar.signOut')}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>

          <div className="flex items-center justify-end gap-1 w-[8%]">
            <span className="text-(--text-secondary) px-3 py-2 text-sm font-medium transition-colors">
              {t('navbar.version')} 0.1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
