import React from 'react';
import { Link } from '@inertiajs/react';

export default function ArticleCard({ article }) {
    // Protection contre les articles undefined
    if (!article) {
        return null;
    }

    return (
        <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
            {/* Image de l'article avec overlay au hover */}
            <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
                <Link href={`/blog/${article.slug}`}>
                    <img
                        src={article.image || '/images/default-article.jpg'}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = '/images/default-article.jpg';
                        }}
                    />
                    {/* Overlay gradient au hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Bouton "Lire l'article" sur l'image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            Lire l'article
                        </span>
                    </div>
                </Link>
            </div>

            {/* Contenu de la card */}
            <div className="p-6">
                {/* Catégorie et date */}
                <div className="flex items-center justify-between mb-3">
                    {article.category && article.category.slug ? (
                        <Link
                            href={`/blog?category=${article.category.slug}`}
                            className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-purple-200 transition-colors duration-200"
                        >
                            {article.category.name || 'Non catégorisé'}
                        </Link>
                    ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                            Non catégorisé
                        </span>
                    )}
                    <time className="text-sm text-gray-500 font-medium">
                        {article.published_at}
                    </time>
                </div>

                {/* Titre avec effet hover */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
                    <Link
                        href={`/blog/${article.slug}`}
                        className="hover:underline"
                    >
                        {article.title}
                    </Link>
                </h3>

                {/* Extrait */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                </p>

                {/* Footer de la card */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Auteur */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white font-semibold text-sm">
                                {article.author?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                            {article.author?.name || 'Auteur anonyme'}
                        </span>
                    </div>

                    {/* Temps de lecture */}
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{article.read_time || '5 min de lecture'}</span>
                    </div>
                </div>

                {/* Call-to-action button */}
                <div className="mt-4">
                    <Link
                        href={`/blog/${article.slug}`}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm group-hover:underline transition-all duration-200"
                    >
                        Lire la suite
                        <svg className="ml-2 w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
