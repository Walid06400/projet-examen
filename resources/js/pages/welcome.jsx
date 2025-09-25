import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/components/Hero';
import ArticlesSection from '@/components/blog/ArticlesSection';

export default function Welcome({ featuredArticles, recentArticles }) {
    return (
        <>
            <Head title="Accueil - MAOlogie" />

            {/* Hero Section avec animations */}
            <Hero />

            {/* Articles à la une */}
            {featuredArticles?.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Articles à la une
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Découvrez nos derniers guides et tutoriels sur la production musicale
                            </p>
                        </div>
                        <ArticlesSection articles={featuredArticles} />
                    </div>
                </section>
            )}

            {/* Articles récents */}
            {recentArticles?.length > 0 && (
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Derniers articles
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Restez à jour avec les dernières tendances MAO
                            </p>
                        </div>
                        <ArticlesSection articles={recentArticles} />

                        <div className="text-center mt-12">
                            <Link
                                href="/blog"
                                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Voir tous les articles
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Section statistiques */}
            <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                            <div className="text-gray-600">Tutoriels MAO</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                            <div className="text-gray-600">Membres actifs</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support communauté</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Prêt à maîtriser la MAO ?
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Rejoignez la communauté MAOlogie et commencez votre voyage musical aujourd'hui.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
                        >
                            Créer un compte
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-purple-600 transition-colors"
                        >
                            Explorer le blog
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
