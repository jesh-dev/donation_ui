
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminComponents/AdminSidebar";
import AdminNavbar from "./AdminComponents/AdminNavbar";

export default function AdminLayout() {

  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 bg-gray-50 dark:bg-gray-900">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
