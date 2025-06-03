import React from "react";
import { Link } from "@inertiajs/react";

export default function FormationDetail() {
  const formation = {
    id: 1,
    title: "Production musicale",
    description: "Maîtrisez la production musicale de A à Z.",
    image: "/images/formation-prod.jpg",
    price: 24.99,
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <img src={formation.image} alt={formation.title} className="w-full h-64 object-cover rounded-xl mb-6" />
      <h1 className="text-3xl font-bold mb-2">{formation.title}</h1>
      <div className="text-indigo-600 font-semibold mb-4">{formation.price} € / mois</div>
      <div className="text-gray-700 mb-8">{formation.description}</div>
      <Link href="/cart" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition">
        Ajouter au panier
      </Link>
    </div>
  );
}
