import React from 'react';
import { Link } from '@inertiajs/react';

export default function ArticleCard({ article }) {
    return (
        <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            {/* Image avec gestion d'erreur */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={article.image || article.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.title)}&background=ede9fe&color=7c3aed&size=400`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(article.title)}&background=ede9fe&color=7c3aed&size=400`;
                    }}
                />

                {/* Badge catégorie */}
                {article.category && (
                    <div className="absolute top-4 left-4">
                        <Link
                            href={`/blog?category=${article.category.slug}`}
                            className="px-3 py-1 text-xs font-medium bg-white bg-opacity-90 text-purple-800 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-sm"
                        >
                            {article.category.name}
                        </Link>
                    </div>
                )}

                {/* Badge "À la une" si featured */}
                {article.is_featured && (
                    <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 text-xs font-bold bg-yellow-400 text-yellow-900 rounded-full shadow-sm">
                            ⭐ À la une
                        </span>
                    </div>
                )}
            </div>

            {/* Contenu */}
            <div className="p-6">
                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    <Link
                        href={`/blog/${article.slug}`}
                        className="hover:text-purple-600 transition-colors"
                    >
                        {article.title}
                    </Link>
                </h3>

                {/* Extrait */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {article.excerpt}
                </p>

                {/* Métadonnées */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="font-medium">{article.author?.name || 'Auteur'}</span>
                        <span>•</span>
                        <span>{article.published_at}</span>
                    </div>
                    {article.read_time && (
                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {article.read_time}
                        </span>
                    )}
                </div>

                {/* Bouton Lire la suite */}
                <div className="border-t border-gray-100 pt-4">
                    <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors group"
                    >
                        Lire l'article complet
                        <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
