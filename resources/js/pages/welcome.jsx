import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Hero from '@/components/Hero';
import ArticlesSection from '@/components/blog/ArticlesSection';
import AppLayout from '@/layouts/app-layout';

export default function Welcome({ featuredArticles, recentArticles }) {
  return (
    <AppLayout>
      <Head title="Accueil - MAOlogie" />

      {/* Hero Section - SANS navbar intégrée */}
      <Hero />


        {/* Articles à la une */}
        {featuredArticles?.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Articles à la une
                </h2>
                <p className="text-xl text-gray-600">
                  Découvrez nos derniers guides et tutoriels sur la production musicale
                </p>
              </div>
              <ArticlesSection articles={featuredArticles} />
            </div>
          </section>
        )}

        {/* Articles récents */}
        {recentArticles?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Derniers articles
                </h2>
                <p className="text-xl text-gray-600">
                  Restez à jour avec les dernières tendances MAO
                </p>
              </div>
              <ArticlesSection articles={recentArticles} />
              <div className="text-center mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Voir tous les articles
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Section statistiques */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-xl">Tutoriels MAO</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-xl">Membres actifs</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-xl">Support communauté</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à maîtriser la MAO ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez la communauté MAOlogie et commencez votre voyage musical aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Créer un compte
              </Link>
              <Link
                href="/blog"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Explorer le blog
              </Link>
            </div>
          </div>
        </section>

    </AppLayout>
  );
}
