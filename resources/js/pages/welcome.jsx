import React from 'react';
import { Head } from '@inertiajs/react';
import Hero from '@/components/Hero';
import ArticlesSection from '@/components/blog/ArticlesSection';

export default function Welcome({ featuredArticles = [], recentArticles = [] }) {
    return (
        <>
            <Head title="Accueil - MAOlogie" />

            {/* Hero Section */}
            <Hero />

            {/* Articles à la une */}
            {featuredArticles && featuredArticles.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <ArticlesSection articles={featuredArticles} />
                    </div>
                </section>
            )}

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Prêt à maîtriser la MAO ?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Rejoignez la communauté MAOlogie et commencez votre voyage et partage de savoir musical aujourd'hui.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            Commencer maintenant
                        </a>
                        <a
                            href="/blog"
                            className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-purple-600 transition-colors duration-200"
                        >
                            Explorer le blog
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
