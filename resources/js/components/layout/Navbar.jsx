import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, User, LogOut, Settings, MessageSquare } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('logout');
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo et navigation principale */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                            <span className="text-xl font-bold text-gray-900">MAOlogie</span>
                        </Link>

                        {/* Navigation desktop */}
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Blog
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
                                    className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1"
                                >
                                    <img
                                        src={auth.user.avatar_url} 
                                        alt={auth.user.name}
                                         className="w-32 h-32 rounded-full object-cover"
                                    />
                                    <span className="hidden md:block text-gray-700 font-medium">
                                        {auth.user.name}
                                    </span>
                                </button>

                                {/* Menu déroulant utilisateur */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="py-1">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm text-gray-900 font-medium">{auth.user.name}</p>
                                                <p className="text-sm text-gray-500">{auth.user.email}</p>
                                            </div>
                                            
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4 mr-3" />
                                                Mon Dashboard
                                            </Link>
                                            
                                            <div className="border-t border-gray-100">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
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
                            <div className="hidden md:flex md:items-center md:space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Inscription
                                </Link>
                            </div>
                        )}

                        {/* Menu mobile */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 hover:text-purple-600 p-2"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/blog"
                            className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                        >
                            Blog
                        </Link>

                        {auth?.user ? (
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center px-3 py-2">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover"
                                        src={auth.user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&color=7c3aed&background=f3f4f6`}
                                        alt={auth.user.name}
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs text-gray-500">{auth.user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 text-red-700 hover:text-red-900 hover:bg-red-50 rounded-md"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <div className="border-t border-gray-200 pt-4">
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-3 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                                >
                                    Inscription
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
