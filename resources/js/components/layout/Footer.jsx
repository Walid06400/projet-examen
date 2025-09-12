import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo et description */}
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                            <span className="text-xl font-bold">MAOlogie</span>
                        </Link>
                        <p className="text-gray-300 text-sm max-w-md">
                            Votre plateforme d'apprentissage dédiée à la Musique Assistée par Ordinateur. 
                            Apprenez, partagez et créez avec notre communauté passionnée.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors duration-200">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Légal</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal" className="hover:text-white transition-colors duration-200">
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Séparateur */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © {currentYear} MAOlogie. Tous droits réservés.
                        </p>
                        <p className="text-sm text-gray-400 mt-2 md:mt-0">
                            Développé avec ❤️ pour la communauté MAO
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
