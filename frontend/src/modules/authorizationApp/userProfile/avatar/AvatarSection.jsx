import AdminAvatar from "@assets/admin-avatar.jpg";

const AvatarSection = () => {
  return (
    <div className="relative p-6 rounded-xl flex flex-col items-center">
      <div className="w-40 h-40 mt-10 border border-[#1b9eaf] rounded-full overflow-hidden bg-gray-300">
        <img
          src={AdminAvatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold mt-4">{"Admin Name"}</h2>
      <p className="text-gray-500">{"admin@example.com"}</p>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Change Avatar
      </button>
    </div>
  );
};

export default AvatarSection;