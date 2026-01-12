import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-r ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Food App</h3>
            <p className=" text-sm leading-relaxed">
              Delicious food delivered to your door.  
              Fresh, hygienic & tasty meals every day 🍽️
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className=" hover:text-black transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" hover:text-black transition"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className=" hover:text-black transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className=" hover:text-black transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className=" text-sm">Email: info@foodapp.com</p>
            <p className=" text-sm mt-2">
              Phone: +91 12345 67890
            </p>
          </div>

          {/* NEWSLETTER */}
          <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-5 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Subscribe Newsletter
            </h3>
            <p className="text-sm text-white/90 mb-4">
              Get latest offers & updates
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button className="py-2 rounded-lg font-semibold bg-linear-to-r from-orange-500 to-red-500 hover:scale-105 transition shadow-md cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/30 mt-10 pt-6 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Food App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
