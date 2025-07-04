import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-500  dark:bg-slate-700 text-white dark:text-gray-300 py-10 px-6">
      <div className="max-w-7xl  mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        {/* About */}
        <div className="pl-9 max-sm:pl-0">
          <h3 className="text-lg md:text-2xl font-bold text-blue-600 mb-3">ECEF</h3>
          <p className="font-sans text-sm">
            Esocs Centenary Endowment Funds is dedicated to <br />
            supporting church growth,
            missions, and <br /> community impact through generous giving.
          </p>
        </div>

        {/* Quick Links */}
        <div className="pl-20 max-sm:pl-0">
          <h3 className="text-lg font-bold md:text-xl mb-2 text-blue-600">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="pl-20 max-sm:pl-0">
          <h3 className="text-lg md:text-xl text-blue-600 font-bold mb-2">Contact</h3>
          <div className="text-sm space-y-3"> 
          <p>Email: support@ecef.ng</p>
          <p>Phone: +234 800 000 0000</p>
          <p>Address: 123 Faith Avenue, Port Harcourt, Nigeria</p>

          </div>
         
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ECEF. All rights reserved.</p>
      </div>
    </footer>
  );
}