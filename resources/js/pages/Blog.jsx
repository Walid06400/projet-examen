// resources/js/pages/Blog.jsx
import { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ArticleCard from "@/components/blog/ArticleCard";

export default function Blog() {
    // Récupération des données depuis le backend via Inertia
    const { articles, categories } = usePage().props;
    
    // État pour le filtre de catégorie
    const [selectedCategory, setSelectedCategory] = useState("all");
    
    // Filtrage des articles selon la catégorie sélectionnée
    const filteredArticles = selectedCategory === "all" 
        ? articles 
        : articles.filter((article) => article.category.slug === selectedCategory);

    return (
        <AppLayout>
            <Head title="Blog MAOlogie" />
            
            <div className="container mx-auto py-16 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Blog MAOlogie
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Découvrez nos derniers articles sur la production musicale
                    </p>
                </div>

                {/* Filtres par catégorie */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        className={`px-4 py-2 rounded-full ${
                            selectedCategory === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedCategory("all")}
                    >
                        Tous
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full ${
                                selectedCategory === category.slug
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            onClick={() => setSelectedCategory(category.slug)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Liste d'articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
