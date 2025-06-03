import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


// Liste des articles mock (même slugs que dans Blog.jsx)
const allArticles = [
  {
    title: "Comprendre la MAO",
    slug: "comprendre-mao",
    image: "/images/articles/MAO.png",
    content: `
      <p>La MAO (Musique Assistée par Ordinateur) est l’ensemble des techniques et outils permettant de composer, enregistrer, mixer et produire de la musique à l’aide d’un ordinateur.</p>
      <p>Dans ce blog, tu trouveras des guides, astuces et ressources pour progresser à chaque étape de ton parcours MAO !</p>
    `,
    category: "Fondamentaux",
  },
  {
    title: "Mixage : astuces pro",
    slug: "mixage-astuces-pro",
    image: "/images/articles/Mixage-astuce.png",
    content: `
      <p>Voici 5 techniques pour améliorer vos mix rapidement : ...</p>
    `,
    category: "Mixage",
  },
  {
    title: "Instruments virtuels",
    slug: "instruments-virtuels",
    image: "/images/articles/vst-plugins.png",
    content: `
      <p>Les meilleurs plugins gratuits de 2025 sont ...</p>
    `,
    category: "Logiciels",
  },

  { 
    title: "Premiers pas en production",
    slug: "premiers-pas-production",
    image: "/images/categories/productionMAO.png",
    content: `
      <p>Comment débuter une production musicale de zéro ? Voici les étapes clés : ...</p>
    `,
    category: "Production",
  },

  {
    title: "Créer ses propres instruments",
    slug: "creer-instruments",
    image: "/images/categories/crée-vst.jfif",
    content: `
      <p>Découvre comment programmer et utiliser tes propres VST pour personnaliser ton son !</p>
    `,
    category: "Programmation",
  },
    // Ajoute tous les articles mock ici
];

export default function BlogArticle({ slug }) {
  // Récupère le slug passé par la route Inertia
  // (Si tu utilises usePage() : const { slug } = usePage().props;)
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Article introuvable</h1>
        <Link href="/blog" className="text-indigo-600 hover:underline font-semibold">
          ← Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <Link
          href="/blog"
          className="inline-block mb-6 text-indigo-600 hover:underline font-semibold"
        >
          ← Retour au blog
        </Link>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <span className="text-indigo-600 text-xs uppercase font-bold">{article.category}</span>
        <h1 className="text-3xl font-extrabold my-4 text-gray-900">{article.title}</h1>
        <div
          className="text-gray-700 leading-relaxed prose prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>
      <Footer />
    </div>
  );
}
