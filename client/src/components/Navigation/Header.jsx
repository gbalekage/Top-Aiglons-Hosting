import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";
import DefaultAvatar from "../../assets/avatar.png";
import useAuthStore from "@/store/authStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsDropdownOpen(false);
  };

  const userAvatar = user?.avatar
    ? `http://localhost:5000/uploads/${user.avatar}`
    : DefaultAvatar;

  const navLinks = [
    { to: "/about", label: "Apropos" },
    { to: "/hosting", label: "Hosting" },
    { to: "/domains", label: "Domaines" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contacts" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 m-2">
      <div className="text-black rounded-full backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" aria-label="Home">
          <img src={Logo} alt="Logo" width={120} height={24} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              className="text-gray-600 hover:text-black transition-all duration-300"
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <div className="relative">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                <img
                  className="w-10 border border-secondary shadow-sm rounded-full"
                  src={userAvatar}
                  alt="User Avatar"
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 bg-white p-4 rounded-lg shadow-md w-48">
                  <Link
                    to="/dashboard"
                    className="block text-sm text-black hover:text-primary duration-300 mb-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-sm text-black hover:text-primary w-full text-left duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="bg-black rounded-full text-white dark:hover:bg-white/60 dark:bg-white dark:text-black transition duration-300 px-9 py-2 text-sm"
              to="/login"
            >
              Connection
            </Link>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <X className="text-black" />
            ) : (
              <Menu className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="p-6 rounded-lg w-4/5 max-w-sm">
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  className="text-2xl text-white hover:text-primary transition-all duration-300"
                  to={link.to}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="text-2xl text-white bg-black py-3 rounded-full hover:text-primary transition-all duration-300"
                to="/login"
                onClick={toggleMenu}
              >
                Connection
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
