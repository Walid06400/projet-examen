// resources/js/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useCart } from "../../contexts/CartContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { cart } = useCart();
  const { component } = usePage(); // Détection de la page actuelle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détecter si on est sur la page d'accueil
  const isHomePage = component === 'welcome';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Forum", href: "/forum" },
    { name: "Formations", href: "/formations" },
    { name: "Contact", href: "/contact" },
  ];

  // Classes conditionnelles selon la page et le scroll
  const getNavbarClasses = () => {
    if (isHomePage) {
      return scrolled 
        ? "fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 py-2"
        : "fixed w-full z-50 bg-transparent py-4 transition-all duration-300";
    } else {
      return "fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-md py-2 border-b border-purple-100";
    }
  };

  const getLinkClasses = () => {
    if (isHomePage && !scrolled) {
      return "text-white hover:text-purple-200 transition-colors duration-200";
    }
    return "text-gray-700 hover:text-purple-600 transition-colors duration-200";
  };

  const getLogoClasses = () => {
    if (isHomePage && !scrolled) {
      return "text-white";
    }
    return "text-purple-600";
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/images/Logo.png" 
              alt="MAOlogie" 
              className="h-10 w-auto" 
            />
            <span className={`text-xl font-bold transition-colors ${getLogoClasses()}`}>
              MAOlogie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium ${getLinkClasses()}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Panier avec Animation */}
            <Link href="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-colors ${
                  isHomePage && !scrolled 
                    ? "text-white hover:bg-white/10" 
                    : "text-gray-700 hover:bg-purple-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                
                {/* Badge avec animation de pulsation */}
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                    style={{
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)"
                    }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {cart.length}
                    </motion.span>
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Boutons de connexion */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className={`font-medium ${getLinkClasses()}`}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Inscription
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 ${
                isHomePage && !scrolled ? "text-white" : "text-gray-700"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-sm border-t border-purple-100 shadow-lg"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              href="/cart"
              className="block py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              Panier
              {cart.length > 0 && (
                <span className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="block bg-gradient-to-r from-purple-600 to-pink-800 text-white px-4 py-2 rounded-lg text-center font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
