import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Même liste d'articles que dans Blog.jsx
const allArticles = [
  // ...
];

export default function BlogCategory({ slug }) {
  // Mappe le slug vers le nom de la catégorie
  const categoryMap = {
    production: "Production",
    programmation: "Programmation",
    mixage: "Mixage",
    fondamentaux: "Fondamentaux",
    logiciels: "Logiciels",
  };
  const category = categoryMap[slug] || slug;

  const filteredArticles = allArticles.filter(a => a.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-12 px-4">
        <Link href="/blog" className="inline-block mb-6 text-indigo-600 hover:underline font-semibold">
          ← Retour au blog
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Catégorie : {category}
        </h1>
        <div className="grid gap-10 md:grid-cols-3">
          {filteredArticles.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 italic">
              Aucun article dans cette catégorie.
            </div>
          ) : (
            filteredArticles.map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`} className="group">
                <div className="rounded-2xl shadow-xl bg-white overflow-hidden border border-gray-200 hover:scale-105 hover:shadow-2xl transition flex flex-col h-full">
                  <div
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-indigo-600 text-xs font-bold uppercase mb-2">
                      {article.category}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 mb-4 flex-1">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
