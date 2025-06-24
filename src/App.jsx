import AboutPage from "./Pages/About";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ContactPage from "./Pages/Contact";
import AuthPage from "./Components/register";
import DashboardLayout from "./AllUsers/UserDashboard";
import DashboardOverview from "./AllUsers/UserComponent/Overview";
import MakeDonation from "./AllUsers/UserComponent/Donate";
import PaymentHistory from "./AllUsers/UserComponent/PaymentHistory";
import AdminLayout from "./Admin/AdminLayout";
import AdminOverview from "./Admin/AdminComponents/AdminOverview";
import AdminUsers from "./Admin/AdminComponents/Users";
import AdminPayments from "./Admin/AdminComponents/adminPayment";
import Logout from "./Components/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Block from "./Components/BlockAttack";

export default function App() {
  return (
    <>
    <Routes>
      {/* Public Route */}
     <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<AboutPage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/register" element={<AuthPage/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/block" element={<Block/>}/>

      {/* Dashboard Route */}
      <Route path="/dashboard" element={<ProtectedRoute role='user'><DashboardLayout /></ProtectedRoute>}>
  <Route index element={<DashboardOverview />} />
  <Route path="donate" element={<MakeDonation />} />
  <Route path="history" element={<PaymentHistory />} />
</Route>
        
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>}>
          <Route index element={<AdminOverview/>}/>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="payments" element={<AdminPayments/>}/>
        </Route>

    </Routes>

    </>
  )
}
