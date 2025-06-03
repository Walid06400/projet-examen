import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const allArticles = [
  {
    title: "Comprendre la MAO",
    category: "Fondamentaux",
    image: "/images/articles/MAO.png",
    slug: "comprendre-mao",
    excerpt: "Découvrez la base de la Musique Assistée par Ordinateur et ses outils incontournables.",
  },
  {
    title: "Mixage : astuces pro",
    category: "Mixage",
    image: "/images/articles/Mixage-astuce.png",
    slug: "mixage-astuces-pro",
    excerpt: "5 techniques pour améliorer vos mix rapidement.",
  },
  {
    title: "Instruments virtuels",
    category: "Logiciels",
    image: "/images/articles/vst-plugins.png",
    slug: "instruments-virtuels",
    excerpt: "Les meilleurs plugins gratuits de 2025.",
  },
  {
    title: "Premiers pas en production",
    category: "Production",
    image: "/images/categories/productionMAO.png",
    slug: "premiers-pas-production",
    excerpt: "Comment débuter une production musicale de zéro.",
  },
  {
    title: "Créer ses propres instruments",
    category: "Programmation",
    image: "/images/categories/crée-vst.jfif",
    slug: "creer-instruments",
    excerpt: "Découvre comment programmer et utiliser tes propres VST.",
  },
];

const categories = [
  "Tous",
  "Fondamentaux",
  "Mixage",
  "Production",
  "Logiciels",
  "Programmation",
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const filteredArticles =
    selectedCategory === "Tous"
      ? allArticles
      : allArticles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Le Blog MAO
        </h1>
        {/* Filtres catégories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition 
                ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-200 text-gray-800 hover:bg-indigo-100"
                }
                cursor-pointer`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Grille d’articles */}
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          initial="hidden"
          animate="visible"
        >
          {filteredArticles.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 italic">
              Aucun article dans cette catégorie.
            </div>
          )}
          {filteredArticles.map((article, i) => (
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
                  <span className="mt-auto inline-block text-indigo-600 font-semibold group-hover:underline">
                    Lire l’article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
