import PopUpCustom from "@components/PopUpCustom";
import useProfileSection from "./useProfileSection";
import useConfirmChanges from "@hooks/useConfirmChanges";
import { useTranslation } from "react-i18next";

const ProfileSection = () => {
  const {
    error,
    isShowPopUp, togglePopUp,
    profile, handleProfileChange, handleUpdateNewProfile,
  } = useProfileSection();

  const {
    confirmPassword, setConfirmPassword,
  } = useConfirmChanges();

  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={handleUpdateNewProfile}>
        <div className="mb-6">
          <h2 className="text-2xl text-[#1b9eaf] font-bold mb-4">{t('outlet.authUser.profile.dataFields.passwordSection')}</h2>
          <button type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer border border-[#1b9eaf]
                           hover:bg-[#aececf] hover:text-black transition duration-200">
            {t('outlet.authUser.profile.dataFields.updateProfile')}
          </button>
        </div>

        <div className="flex gap-4">
          <div className="md:w-1/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.userId')}</label>
              <input
                name="id"
                type="text"
                value={profile.id}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf] bg-gray-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.fullName')}</label>
              <input
                name="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              />
            </div>
          </div>

          <div className="md:w-1/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.email')}</label>
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.phoneNumber')}</label>
              <input
                name="phone"
                type="text"
                value={profile.phone}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              />
            </div>

          </div>

          <div className="md:w-1/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.role')}</label>
              <input
                name="role"
                type="text"
                value={profile.role}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf] bg-gray-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.factory')}</label>
              <input
                name="factory"
                type="text"
                value={profile.factory}
                onChange={(e) => handleProfileChange(e)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1b9eaf] mb-1">{t('outlet.authUser.userManagement.body.status')}</label>
              <input
                name="isActive"
                type="text"
                value={profile.isActive ? 'Active' : 'Inactive'}
                onChange={(e) => handleProfileChange(e)}
                className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#1b9eaf] bg-gray-300
                            ${profile.isActive ? 'text-green-600 border-black' : 'text-yellow-600 border-black'}`}
                disabled
              />
            </div>
          </div>
        </div>
      </form>

      {
        isShowPopUp && (
          <div>
            <PopUpCustom isOpen={isShowPopUp}
              title={t('outlet.authUser.profile.popup.title')}
              description={t('outlet.authUser.profile.popup.description')}
              onClose={togglePopUp}
              inputs={[
                {
                  label: t('signIn.password'),
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  type: 'password',
                }
              ]}

              buttons={[
                {
                  label: t('popup.buttons.cancel'),
                  bg: "#ff3a3a",
                  textColor: "#fff",
                  onClick: togglePopUp,
                },
                {
                  label: t('popup.buttons.save'),
                  bg: "#16a34a",
                  textColor: "#fff",
                  onClick: (e) => handleUpdateNewProfile(e),
                },
              ]}
            />
          </div>
        )
      }
    </>
  );
};

export default ProfileSection;