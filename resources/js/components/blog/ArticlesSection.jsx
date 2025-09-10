// resources/js/components/blog/ArticlesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import ArticleCard from "./ArticleCard";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
        },
    },
};

export default function ArticlesSection({ articles = [] }) {  // ✅ Valeur par défaut
    // ✅ Vérification sécurisée
    if (!articles || !Array.isArray(articles)) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Articles récents</h2>
                    <p className="text-gray-600">Aucun article disponible pour le moment</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Articles récents
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Restez à jour avec nos derniers articles, tutoriels et conseils sur la production musicale.
                    </motion.p>
                </div>

                {articles.length > 0 ? (
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">Aucun article disponible pour le moment</p>
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Voir tous les articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
