
import { Head, Link, usePage } from '@inertiajs/react';
import ArticleCard from '@/components/blog/ArticleCard';

export default function Blog() {
    const { articles, categories, selectedCategory } = usePage().props;

    return (
        <>
            <Head title="Blog MAOlogie" />

            {/* Header du blog - SANS navbar supplémentaire */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Blog MAOlogie
                        </h1>
                        <p className="text-xl text-gray-600">
                            Découvrez nos tutoriels et guides sur la MAO
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filtres de catégories avec effets hover violets */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {/* Bouton "Tous les articles" */}
                        <Link
                            href="/blog"
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                selectedCategory === 'all'
                                    ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-300'
                                    : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:shadow-md border border-gray-200 hover:border-purple-300'
                            }`}
                        >
                            Tous les articles
                        </Link>

                        {/* Boutons des catégories */}
                        {categories && categories.map && categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/blog?category=${category.slug}`}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 group ${
                                    selectedCategory === category.slug
                                        ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-300'
                                        : 'bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:shadow-md border border-gray-200 hover:border-purple-300'
                                }`}
                            >
                                {category.name}
                                {category.articles_count > 0 && (
                                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                        selectedCategory === category.slug
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-200 text-gray-600 group-hover:bg-purple-200 group-hover:text-purple-700'
                                    }`}>
                                        {category.articles_count}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Section des articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles && articles.data && articles.data.length > 0 ? (
                            articles.data.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))
                        ) : (
                            <div className="col-span-full">
                                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                                    <div className="mx-auto h-16 w-16 text-purple-400 mb-6">
                                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        Aucun article trouvé dans cette catégorie
                                    </h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        Essayez de sélectionner une autre catégorie ou consultez tous les articles disponibles.
                                    </p>
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Voir tous les articles
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination améliorée */}
                    {articles && articles.links && articles.links.length > 3 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px bg-white">
                                {articles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
                                            link.active
                                                ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                                : link.url
                                                ? 'bg-white border-gray-300 text-gray-500 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'
                                                : 'bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed'
                                        } ${
                                            index === 0 ? 'rounded-l-lg' : ''
                                        } ${
                                            index === articles.links.length - 1 ? 'rounded-r-lg' : ''
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
