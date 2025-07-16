// resources/js/pages/BlogArticle.jsx
import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { motion } from "framer-motion";

export default function BlogArticle() {
    const { article, relatedArticles } = usePage().props;

    return (
        <AppLayout>
            <Head title={article.title} />
            
            <div className="container mx-auto py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Fil d'Ariane */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link href={route('blog')} className="hover:text-purple-600">
                            Blog
                        </Link>
                        <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link href={route('blog.category', article.category.slug)} className="hover:text-purple-600">
                            {article.category.name}
                        </Link>
                    </div>
                    
                    {/* En-tête de l'article */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {article.title}
                        </h1>
                        
                        <div className="flex items-center text-gray-500 mb-8">
                            <span>
                                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {article.category.name}
                            </span>
                        </div>
                        
                        {/* Image principale */}
                        {article.image_url && (
                            <div className="mb-8 rounded-xl overflow-hidden">
                             // resources/js/components/blog/ArticlesSection.js
                            <img 
                                src={article.image_url}
                                alt={article.title}
                                className="w-full h-auto"
                            />


                            </div>
                        )}
                        
                        {/* Contenu de l'article */}
                        <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </motion.div>
                    
                    {/* Articles similaires */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Articles similaires
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map(relatedArticle => (
                                    <Link 
                                        key={relatedArticle.id}
                                        href={route('blog.article', relatedArticle.slug)}
                                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
                                    >
                                        <h4 className="font-bold text-gray-800 mb-2">
                                            {relatedArticle.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {relatedArticle.excerpt || relatedArticle.content.substring(0, 100)}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
