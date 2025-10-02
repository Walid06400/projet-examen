import React from 'react';
import { Link } from '@inertiajs/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cardstudio.png"
          alt="Production musicale"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            // Si l'image n'existe pas, cacher l'élément
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Titre principal avec animation */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Devenez un expert en
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse">
            production musicale
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Découvrez les secrets de la MAO avec notre communauté passionnée.
          Tutoriels, guides pratiques et partage d'expériences.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Bouton principal */}
          <Link
            href="/blog"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Lire le blog
          </Link>

          {/* Bouton secondaire */}
          <Link
            href="/register"
            className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            Rejoindre la communauté
          </Link>
        </div>
      </div>

      {/* Éléments décoratifs avec CSS */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
    </section>
  );
}
