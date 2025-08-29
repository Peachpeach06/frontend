"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // ตรวจสอบ token ใน localStorage
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    
    // เรียกใช้เมื่อ component mount
    checkAuthStatus();

    // เพิ่ม event listener สำหรับการ scroll
    window.addEventListener("scroll", handleScroll);

    // เพิ่ม event listener สำหรับการเปลี่ยนแปลง localStorage
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    closeMobileMenu();
    router.push("/");
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white shadow-lg border-b border-gray-100/50 sm:bg-white/90 sm:backdrop-blur-xl"
          : "bg-white sm:bg-white/95 sm:backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              PEACH
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons and mobile menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button className="p-2.5 text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-full transition-all duration-300 group">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Shopping Bag Icon */}
            <button className="p-2.5 text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-full transition-all duration-300 group relative">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
                />
              </svg>
              {/* Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </button>

            {/* Login & Register / Logout Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-xl transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-full transition-all duration-300"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-100 opacity-100 bg-white border-t border-gray-100/50 sm:bg-white/95 sm:backdrop-blur-xl"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`block px-4 py-3 text-lg font-medium text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-xl transition-all duration-300 transform ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {item.name}
            </Link>
          ))}

          {/* Login & Register / Logout (Mobile Menu) */}
          <div className="pt-3 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-black hover:bg-gray-100/50 rounded-xl transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-lg font-medium text-white bg-black hover:bg-gray-800 rounded-xl transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 sm:backdrop-blur-sm"
          style={{ top: "80px" }}
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
