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

export default function ArticlesSection({ articles }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Articles récents
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Restez à jour avec nos derniers articles, tutoriels et conseils sur la production musicale.
          </p>
        </div>

        {articles.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Aucun article disponible pour le moment
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href={route('blog')}
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
}
