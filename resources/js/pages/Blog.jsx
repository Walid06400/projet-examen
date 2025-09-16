import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ArticleCard from '@/components/blog/ArticleCard';

export default function Blog({ articles = [], categories = [], currentCategory = null }) {
    return (
        <>
            <Head title={currentCategory ? `${currentCategory.name} - MAOlogie` : "Blog - MAOlogie"} />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {currentCategory ? currentCategory.name : 'Blog MAOlogie'}
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {currentCategory
                                ? `Articles sur ${currentCategory.name}`
                                : 'Découvrez nos tutoriels et guides sur la MAO'
                            }
                        </p>
                    </div>

                    {/* Filtres par catégorie */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Link
                            href="/blog"
                            className={`px-6 py-2 rounded-full transition-colors ${
                                !currentCategory
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-purple-100'
                            }`}
                        >
                            Tous les articles
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`/blog/category/${category.slug}`}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    currentCategory?.id === category.id
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-purple-100'
                                }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Articles */}
                    {articles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map(article => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                Aucun article trouvé dans cette catégorie.
                            </p>
                            <Link
                                href="/blog"
                                className="text-purple-600 hover:underline mt-4 inline-block"
                            >
                                Voir tous les articles
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
