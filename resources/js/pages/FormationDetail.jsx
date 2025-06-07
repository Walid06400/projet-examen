import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";

// Données mockées (à remplacer par appel API quand le backend sera prêt)
const formations = [
  {
    slug: "production-debutant",
    title: "Production Débutant",
    image: "/images/formations/formationprod.png",
    price: 49.99,
    fullDescription: `
      <h2 class="text-2xl font-bold mb-4">Ce que vous allez apprendre</h2>
      <ul class="list-disc pl-6 mb-6">
        <li>Les bases de la MAO avec Ableton Live</li>
        <li>Enregistrer et éditer des pistes audio/MIDI</li>
        <li>Utiliser les effets essentiels (EQ, compression, reverb)</li>
        <li>Créer votre premier beat complet</li>
      </ul>
      <h2 class="text-2xl font-bold mb-4">Programme détaillé</h2>
      <div class="space-y-4">
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="font-semibold">Module 1 : Prise en main du DAW</h3>
          <p class="text-gray-600">3h de vidéo · 5 exercices pratiques</p>
        </div>
        <!-- Ajouter d'autres modules -->
      </div>
    `,
    includes: [
      "Accès à vie",
      "10h de vidéo HD",
      "20 exercices corrigés",
      "Certificat de réussite",
    ],
  },
  {
    slug: "mixage-confirme",
    title: "Mixage en MAO",
    image: "/images/formations/maoformation.png",
    price: 69.99,
    fullDescription: `
      <h2 class="text-2xl font-bold mb-4">Ce que vous allez apprendre</h2>
      <ul class="list-disc pl-6 mb-6">
        <li>Les principes fondamentaux du mixage audio</li>
        <li>Utiliser les outils comme EQ, compression, reverb, delay</li>
        <li>Créer un mix équilibré, propre et professionnel</li>
        <li>Préparer vos morceaux pour le mastering</li>
      </ul>
      <h2 class="text-2xl font-bold mb-4">Programme détaillé</h2>
      <div class="space-y-4">
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="font-semibold">Module 1 : Introduction au Mixage</h3>
          <p class="text-gray-600">2h de vidéo · 4 sessions de mix</p>
        </div>
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="font-semibold">Module 2 : Traitement de la Voix</h3>
          <p class="text-gray-600">3h de vidéo · 6 cas pratiques</p>
        </div>
      </div>
    `,
    includes: [
      "Accès à vie",
      "12h de vidéo HD",
      "Fichiers audio fournis",
      "Certificat de réussite",
    ],
  },
  {
    slug: "programmation-vst-pro",
    title: "Création de VST/VSTi",
    image: "/images/formations/formationvst.png",
    price: 99.99,
    fullDescription: `
      <h2 class="text-2xl font-bold mb-4">Ce que vous allez apprendre</h2>
      <ul class="list-disc pl-6 mb-6">
        <li>Les bases de la programmation audio (C++, JUCE)</li>
        <li>Créer des plugins VST et VSTi personnalisés</li>
        <li>Comprendre le traitement du signal en temps réel</li>
        <li>Exporter vos plugins pour Windows et macOS</li>
      </ul>
      <h2 class="text-2xl font-bold mb-4">Programme détaillé</h2>
      <div class="space-y-4">
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="font-semibold">Module 1 : Environnement de Développement</h3>
          <p class="text-gray-600">2h de vidéo · Setup pas à pas</p>
        </div>
        <div class="border-l-4 border-indigo-600 pl-4">
          <h3 class="font-semibold">Module 2 : Création d’un Synthétiseur Simple</h3>
          <p class="text-gray-600">4h de vidéo · 1 projet complet</p>
        </div>
      </div>
    `,
    includes: [
      "Accès à vie",
      "15h de vidéo HD",
      "Code source complet",
      "Certificat de réussite",
    ],
  }
  // Ajouter d'autres formations ici
];

export default function FormationDetail({ slug }) {
  const formation = formations.find(f => f.slug === slug);
  const { addToCart } = useCart();

  if (!formation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Formation introuvable</h1>
          <Link 
            href="/formations" 
            className="text-indigo-600 hover:underline font-semibold"
          >
            ← Retour aux formations
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-12 px-4">
        <Link 
          href="/formations" 
          className="inline-block mb-6 text-indigo-600 hover:underline font-semibold"
        >
          ← Retour aux formations
        </Link>
        
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* En-tête */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <img 
              src={formation.image} 
              alt={formation.title} 
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                  {formation.title}
                </h1>
                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  {formation.price} €
                </div>
              </div>
              <button
                onClick={() => addToCart(formation)}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition text-lg"
              >
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* Contenu détaillé */}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: formation.fullDescription }} />
            
            <h2 className="text-2xl font-bold mt-12 mb-6">Cette formation comprend</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {formation.includes.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-xl">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
