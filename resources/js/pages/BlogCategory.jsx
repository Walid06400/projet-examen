// resources/js/pages/BlogCategory.jsx
import { useState } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import ArticleCard from "@/components/blog/ArticleCard";

export default function BlogCategory() {
    const { category, articles, categories } = usePage().props;

    return (
        <AppLayout>
            <Head title={`${category.name} - Blog MAOlogie`} />
            
            <div className="container mx-auto py-16 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Catégorie : {category.name}
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Articles dans la catégorie {category.name}
                    </p>
                </div>

                {/* Fil d'Ariane */}
                <div className="flex justify-center items-center text-sm text-gray-500 mb-8">
                    <Link href={route('blog')} className="hover:text-purple-600">
                        Blog
                    </Link>
                    <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{category.name}</span>
                </div>

                {/* Liste des catégories */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <Link
                        href={route('blog')}
                        className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                        Tous
                    </Link>
                    
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={route('blog.category', cat.slug)}
                            className={`px-4 py-2 rounded-full ${
                                cat.id === category.id
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Liste d'articles */}
                {articles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            Aucun article dans cette catégorie.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
