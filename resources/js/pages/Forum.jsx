// Forum.jsx mis à jour

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Forum() {
  const [topics,] = useState([
    { id: 1, title: "Quel DAW choisir ?", author: "Alice", replies: 8, category: "Logiciels", lastActivity: "2h", resolved: false, likes: 4 },
    { id: 2, title: "Votre setup home studio ?", author: "Bob", replies: 12, category: "Matériel", lastActivity: "5h", resolved: true, likes: 10 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto py-12 px-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900">Forum MAO</h1>
              <Link 
                href="/forum/new" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition shadow-lg"
              >
                Nouveau sujet
              </Link>
            </div>
            <div className="space-y-4">
              {topics.map((topic) => (
                <Link key={topic.id} href={`/forum/${topic.id}`} className="block group">
                  <div className="p-6 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg transition">
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700">
                          {topic.title}
                        </h3>
                        <div className="mt-2 flex items-center space-x-4 text-sm">
                          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">{topic.category}</span>
                          {topic.resolved && (
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">✅ Résolu</span>
                          )}
                          <span className="text-gray-500">Par {topic.author}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <span className="text-indigo-600 font-bold">{topic.replies} réponses</span>
                        <div className="text-sm text-gray-500">{topic.likes} 👍</div>
                        <div className="text-sm text-gray-500">Dernière activité : {topic.lastActivity}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
