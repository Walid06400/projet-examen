import React from 'react';
import ArticleCard from './ArticleCard';

export default function ArticlesSection({ articles }) {
    // Gestion des cas d'absence d'articles
    if (!articles || articles.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-gray-400 mb-6">
                    <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun article disponible
                </h3>
                <p className="text-gray-500 mb-6">
                    Les articles seront bientôt disponibles. Revenez plus tard !
                </p>
                <a
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                >
                    Découvrir le blog
                </a>
            </div>
        );
    }

    return (
        <>
            {/* Grille d'articles responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <div
                        key={article.id}
                        className={`${index === 0 && articles.length >= 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <ArticleCard article={article} />
                    </div>
                ))}
            </div>

            {/* Information sur le nombre d'articles */}
            {articles.length > 0 && (
                <div className="text-center mt-8 text-sm text-gray-500">
                    {articles.length === 1 ? (
                        '1 article affiché'
                    ) : (
                        `${articles.length} articles affichés`
                    )}
                </div>
            )}
        </>
    );
}
