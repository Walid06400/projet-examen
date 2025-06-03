import React from "react";
import { Link } from "@inertiajs/react";

export default function Formations() {
  const formations = [
    { id: 1, title: "Production musicale", price: 24.99, image: "/images/formation-prod.jpg" },
    { id: 2, title: "Mixage audio", price: 29.99, image: "/images/formation-mix.jpg" },
    { id: 3, title: "Programmation VST", price: 34.99, image: "/images/formation-vst.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Formations MAO</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {formations.map((f) => (
          <div key={f.id} className="rounded-xl shadow-lg bg-white overflow-hidden hover:scale-105 transition">
            <img src={f.image} alt={f.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{f.title}</h2>
              <div className="text-indigo-600 font-semibold mb-2">{f.price} € / mois</div>
              <Link href={`/formations/${f.id}`} className="text-indigo-700 underline font-semibold">Voir la formation</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
