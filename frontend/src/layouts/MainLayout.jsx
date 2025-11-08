import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <Navbar />
        <main className="relative overflow-y-auto bg-gray-50 p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};