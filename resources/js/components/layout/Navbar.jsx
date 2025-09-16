import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo et navigation principale */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-purple-600">
                            MAOlogie
                        </Link>

                        {/* Navigation desktop */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Actions utilisateur */}
                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            // Utilisateur connecté
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1 hover:bg-gray-50 transition-colors"
                                >
                                    {/* ✅ AVATAR CORRIGÉ AVEC FALLBACK INITIALES */}
                                    {auth.user.avatar ? (
                                        <img
                                            className="h-8 w-8 rounded-full object-cover border-2 border-purple-200"
                                            src={`/storage/${auth.user.avatar}`}
                                            alt={auth.user.name}
                                            onError={(e) => {
                                                // Fallback si l'image ne charge pas
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}

                                    {/* Fallback initiales si pas d'avatar */}
                                    <div
                                        className={`h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center border-2 border-purple-200 ${auth.user.avatar ? 'hidden' : 'flex'}`}
                                        style={{ display: auth.user.avatar ? 'none' : 'flex' }}
                                    >
                                        <span className="text-sm font-semibold text-purple-600">
                                            {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>

                                    <span className="hidden sm:block font-medium text-gray-700">
                                        {auth.user.name}
                                    </span>
                                </button>

                                {/* Menu déroulant utilisateur */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center space-x-3">
                                                {auth.user.avatar ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={`/storage/${auth.user.avatar}`}
                                                        alt={auth.user.name}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <span className="text-lg font-semibold text-purple-600">
                                                            {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-900">{auth.user.name}</p>
                                                    <p className="text-sm text-gray-500 truncate">{auth.user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4 mr-3" />
                                                Mon Dashboard
                                            </Link>

                                            <div className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3" />
                                                    Déconnexion
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Utilisateur non connecté
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Inscription
                                </Link>
                            </div>
                        )}

                        {/* Menu mobile */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-700 hover:text-purple-600 p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                {isOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>

                            {auth?.user ? (
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex items-center px-3 py-2 mb-2">
                                        {auth.user.avatar ? (
                                            <img
                                                className="h-8 w-8 rounded-full object-cover mr-3"
                                                src={`/storage/${auth.user.avatar}`}
                                                alt={auth.user.name}
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                <span className="text-sm font-semibold text-purple-600">
                                                    {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
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
                                    <Link
                                        href="/login"
                                        className="block text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 text-sm font-medium rounded-md mx-3"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Inscription
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
