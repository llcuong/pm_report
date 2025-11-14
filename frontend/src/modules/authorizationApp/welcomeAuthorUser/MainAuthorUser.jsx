const MainAuthorUser = () => {
  return (
    <div className="p-6">
      <div className="relative p-6 border-2 border-[#1b9eaf] rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-bold text-[#1b9eaf] mb-2">
          👋 Hello, Admin!
        </h1>
        <p className="mb-4">
          Welcome to the Admin Dashboard. Here you can manage and oversee the entire application.
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>✅ View and manage all user accounts</li>
          <li>⚙️ Edit, delete, or suspend users if necessary</li>
          <li>📊 Monitor system reports and analytics</li>
          <li>📝 Update configuration settings and roles</li>
          <li>🔐 Manage permissions and access control</li>
        </ul>

        <div className="mt-6 text-sm text-gray-500 italic">
          Tip: Use the sidebar to navigate through different admin tools.
        </div>
      </div>
    </div>
  );
};

export default MainAuthorUser;