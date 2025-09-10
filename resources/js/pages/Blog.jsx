// resources/js/pages/Blog.jsx
import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ArticleCard from "@/components/blog/ArticleCard";

export default function Blog() {
    // ✅ CORRIGÉ : Récupération sécurisée des données
    const { articles: articlesData, categories } = usePage().props;
    
    // ✅ CORRIGÉ : Extraire le tableau depuis l'objet paginé
    const articlesArray = articlesData?.data || [];
    const paginationLinks = articlesData?.links || [];
    
    // ✅ DEBUG : Vérifier la structure des données
    console.log('Articles data:', articlesData);
    console.log('Articles array:', articlesArray);
    console.log('Categories:', categories);

    // État pour le filtre de catégorie
    const [selectedCategory, setSelectedCategory] = useState("all");

    // ✅ CORRIGÉ : Filtrage sur le tableau, pas l'objet paginé
    const filteredArticles = selectedCategory === "all"
        ? articlesArray
        : articlesArray.filter((article) => 
            article.category && article.category.slug === selectedCategory
          );

    return (
        <AppLayout>
            <Head title="Blog MAOlogie - Articles de production musicale" />

            <div className="container mx-auto py-12 px-4">
                {/* En-tête */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Blog MAOlogie
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Découvrez nos derniers articles sur la production musicale, 
                        les techniques de mixage, le mastering et bien plus encore.
                    </p>
                </div>

                {/* Filtres de catégories */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                selectedCategory === "all"
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Tous les articles
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.slug)}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    selectedCategory === category.slug
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Liste des articles */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-500 text-lg">
                                {selectedCategory === "all" 
                                    ? "Aucun article disponible pour le moment."
                                    : `Aucun article dans la catégorie sélectionnée.`
                                }
                            </div>
                            {selectedCategory !== "all" && (
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className="mt-4 text-purple-600 hover:text-purple-800 underline"
                                >
                                    Voir tous les articles
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination (si pas de filtre actif) */}
                {selectedCategory === "all" && paginationLinks.length > 3 && (
                    <div className="flex justify-center items-center space-x-2">
                        {paginationLinks.map((link, index) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={index}
                                        className="px-3 py-2 text-gray-400"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }

                            return (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 rounded-md transition-colors ${
                                        link.active
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
