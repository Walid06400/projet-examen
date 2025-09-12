// resources/js/components/blog/ArticleCard.jsx
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ArticleCard({ article }) {
    return (
        <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            whileHover={{ y: -5 }}
        >
            <Link href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={article.image_url}  // Utilisation de l'accesseur
                        alt={article.title}
                             className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-xs font-semibold text-white bg-purple-600 px-2 py-1 rounded">
                            {article.category?.name || 'Non catégorisé'}
                        </span>
                    </div>
                </div>
            </Link>
            
            <div className="p-6">
                <Link href={`/blog/${article.slug}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-purple-600 transition-colors">
                        {article.title}
                    </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                    <Link 
                        href={`/blog/${article.slug}`}
                        className="text-purple-600 font-medium hover:text-purple-800 flex items-center"
                    >
                        Lire l'article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
