import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react"; // adapte selon ton routage

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Forum", href: "/forum" },
    { name: "Formations", href: "/formations" },
    { name: "Contact", href: "/contact" },
    { name: "Panier", href: "/cart" },
  ];

  // Toujours visibles pour tests/Filament
  const userLinks = [
    { name: "Profil", href: "/profil" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="select-none">
              <img
                src="/images/logo.png"
                alt="Logo MAOlogie"
                className="h-16 w-auto mr-8"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Connexion/Inscription + User links desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-full font-semibold text-indigo-700 border border-indigo-600 bg-white hover:bg-indigo-50 transition cursor-pointer"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer"
            >
              Inscription
            </Link>
            {userLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium cursor-pointer transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer"
            >
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-inner border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-300 my-2" />
            <Link
              href="/login"
              className="block px-3 py-2 rounded-full font-semibold text-indigo-700 border border-indigo-600 bg-white hover:bg-indigo-50 transition cursor-pointer text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inscription
            </Link>
            {userLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
