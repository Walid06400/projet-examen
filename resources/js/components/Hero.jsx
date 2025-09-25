import React from 'react';
import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
            {/* Image de fond - conservée de ton fichier original */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/cardstudio.png"
                    alt="Studio MAO"
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    onError={(e) => {
                        // Si l'image n'existe pas, cacher l'élément
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
                <div className="max-w-3xl">
                    {/* Animation CSS pure au lieu de framer-motion */}
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Devenez un expert en
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                {' '}production musicale
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl">
                            Découvrez les secrets de la MAO avec notre communauté passionnée.
                            Tutoriels, guides pratiques et partage d'expériences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* Bouton principal */}
                            <Link
                                href="/blog"
                                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center"
                            >
                                Lire le blog
                            </Link>

                            {/* Bouton secondaire */}
                            <Link
                                href="/register"
                                className="inline-block bg-white bg-opacity-10 border-2 border-transparent hover:bg-opacity-20 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center"
                            >
                                Rejoindre la communauté
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Éléments décoratifs avec CSS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>
        </section>
    );
}
