// resources/js/components/BlogCategory.jsx
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function BlogCategory({ categories, selectedCategory }) {
    const CategoryCard = ({ category }) => {
        const [imageLoaded, setImageLoaded] = useState(false);
        const [imageError, setImageError] = useState(false);

        // 🔧 FIX CLIGNOTEMENT : État de chargement géré proprement
        const handleImageLoad = () => {
            setImageLoaded(true);
        };

        const handleImageError = () => {
            setImageError(true);
            setImageLoaded(true);
        };

        return (
            <Link
                href={route('blog.category', category.slug)}
                className={`group block p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                    selectedCategory === category.slug
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                }`}
            >
                <div className="flex flex-col items-center text-center space-y-3">
                    {/* 🖼️ CONTAINER IMAGE AVEC PLACEHOLDER */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {category.image_url && !imageError ? (
                            <>
                                {/* Image réelle */}
                                <img
                                    src={category.image_url}
                                    alt={category.name}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />

                                {/* Skeleton loader pendant le chargement */}
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
                                )}
                            </>
                        ) : (
                            /* Fallback : Initiales de la catégorie */
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center rounded-full">
                                <span className="text-white font-bold text-lg">
                                    {category.name?.charAt(0) || '?'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 📝 TITRE ET DESCRIPTION */}
                    <div>
                        <h3 className={`font-semibold text-sm transition-colors ${
                            selectedCategory === category.slug
                                ? 'text-purple-700'
                                : 'text-gray-900 group-hover:text-purple-600'
                        }`}>
                            {category.name}
                        </h3>

                        {category.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {/* 📊 COMPTEUR D'ARTICLES */}
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedCategory === category.slug
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-600'
                    }`}>
                        {category.articles_count || 0} article{(category.articles_count || 0) !== 1 ? 's' : ''}
                    </div>
                </div>
            </Link>
        );
    };

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Aucune catégorie disponible</p>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Parcourir par catégories
            </h2>

            {/* 🏷️ BOUTON "TOUS LES ARTICLES" */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Link
                    href={route('blog')}
                    className={`group block p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                        selectedCategory === 'all' || !selectedCategory
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                    }`}
                >
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                📚
                            </span>
                        </div>
                        <div>
                            <h3 className={`font-semibold text-sm transition-colors ${
                                selectedCategory === 'all' || !selectedCategory
                                    ? 'text-purple-700'
                                    : 'text-gray-900 group-hover:text-purple-600'
                            }`}>
                                Tous les articles
                            </h3>
                        </div>
                    </div>
                </Link>

                {/* 📂 LISTE DES CATÉGORIES */}
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}
