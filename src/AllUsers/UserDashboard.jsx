import UserSidebar from "./UserComponent/sidebar";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserComponent/UserNavbar";
import DashboardFooter from "./UserComponent/userFooter";

export default function DashboardLayout() {
  return (
    <>
    <div className="min-h-screen dark:bg-black">

      <UserSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 bg-gray-50 dark:bg-gray-900">
        <UserNavbar /> 

        <main className="flex-1 dark:bg-black/50 overflow-y-auto p-6">
           <Outlet /> 
        </main>
      </div>
    </div>
    <DashboardFooter/>
    </>
  );
}
