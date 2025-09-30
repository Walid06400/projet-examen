// resources/js/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';

export default function Navbar() {
  const { auth } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    router.post('/logout');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const UserAvatarNavbar = ({ user, size = 'sm' }) => {
    const [imageError, setImageError] = useState(false);
    const sizeClasses = { sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base' };
    const sizeClass = sizeClasses[size] || sizeClasses.sm;
    const url = user?.avatar_url;
    return url && !imageError ? (
      <img
        src={url}
        alt={`Avatar de ${user.name}`}
        className={`${sizeClass} rounded-full object-cover border-2 border-purple-200`}
        onError={() => setImageError(true)}
      />
    ) : (
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold border-2 border-purple-200`}
      >
        {getInitials(user?.name)}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              MAOlogie
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                Accueil
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {auth?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1 hover:bg-gray-50 transition-colors"
                >
                  <UserAvatarNavbar user={auth.user} size="sm" />
                  <span className="hidden md:block font-medium text-gray-700">
                    {auth.user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                      <UserAvatarNavbar user={auth.user} size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {auth.user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {auth.user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 mr-3" />
                      Mon Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-purple-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
              Accueil
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            {auth?.user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <UserAvatarNavbar user={auth.user} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {auth.user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {auth.user.email}
                    </p>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block text-red-600 hover:text-red-700 px-3 py-2 text-sm font-medium w-full text-left"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                  Connexion
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
