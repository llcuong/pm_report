import AvatarSection from "./avatar/AvatarSection";
import ProfileSection from "./profile/ProfileSection";
import PasswordSection from "./password/PasswordSection";

const MainUserProfile = () => {
  return (
    <div className="p-4 h-230 mx-auto flex flex-col md:flex-row gap-10">
      <div className="md:w-1/5 bg-white shadow-md p-6 rounded-xl">
        <AvatarSection />
      </div>

      <div className="md:w-3/5 bg-white shadow-md p-6 rounded-xl">
        <ProfileSection />
      </div>

      <div className="md:w-1/5 bg-white shadow-md p-6 rounded-xl">
        <PasswordSection />
      </div>
    </div>
  );
};

export default MainUserProfile;