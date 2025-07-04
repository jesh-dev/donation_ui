import { Contact, Home, LogIn, MailCheck, MapPinHouse, MessageCircleMore, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-500  dark:bg-slate-700 text-white dark:text-gray-300 py-10 px-6">
      <div className="max-w-7xl  mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        {/* About */}
        <div className="pl-9 max-sm:pl-0">
          <h3 className="text-lg md:text-2xl font-bold text-white dark:text-blue-500 mb-3">ECEF</h3>
          <p className="font-sans text-gray-300 dark:text-gray-300 text-sm">
            Esocs Centenary Endowment Funds is dedicated to <br />
            supporting church growth,
            missions, and <br /> community impact through generous giving.
          </p>
        </div>

        {/* Quick Links */}
        <div className="pl-20 max-sm:pl-0">
          <h3 className="text-lg font-bold md:text-xl mb-2 text-white dark:text-blue-500">Quick Links</h3>
          <ul className="space-y-2.5 text-sm self-center flex ">
            <div className="flex flex-col  space-y-3">
              <div><li><Link to="/" className="hover:text-blue-500"><Home className="md:hidden  hover:text-blue-800"/><p className="max-md:hidden">Home</p> </Link></li></div>
              <div><li><Link to="/about" className="hover:text-blue-500"><MessageCircleMore className="md:hidden  hover:text-blue-800"/><p className="max-md:hidden">About</p></Link></li></div>
              <div><li><Link to="/contact" className="hover:text-blue-500"><Contact className="md:hidden hover:text-blue-800"/><p className="max-md:hidden">Contact</p></Link></li></div>
              <div><li><Link to="/login" className="hover:text-blue-500"><LogIn className="md:hidden hover:text-blue-800"/><p className="max-md:hidden">Login</p></Link></li></div>
            </div>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div className="pl-20 max-sm:pl-0 ">
          <h3 className="text-lg md:text-xl text-white dark:text-blue-500 font-bold mb-2">Contact</h3>
          <div className="text-sm space-y-3 "> 
         <div><p className="max-md:hidden">Email: support@ecef.ng</p> <MailCheck aria-labelledby="Email" className="w-6 cursor-pointer h-6 inline-block text-yellow-500 md:hidden" /></div> 
          <div><p className="max-md:hidden">Phone: +234 800 000 0000 </p><Phone aria-label="Phone" className="w-6 cursor-pointer h-6 inline-block text-green-500 md:hidden" /></div>
          <div><p className="max-md:hidden">Address: 123 Faith Avenue, Port Harcourt, Nigeria</p><MapPinHouse aria-label="Address" className="w-6 cursor-pointer h-6 inline-block md:hidden text-red-500" /></div>

          </div>
         
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ECEF. All rights reserved.</p>
      </div>
    </footer>
  );
}