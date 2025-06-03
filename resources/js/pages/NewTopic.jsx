import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NewTopic() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    content: "",
    isProblem: false,
  });

  const [allTags] = useState([
    "Trap", "Mixage", "808", "FL Studio", "Ableton", "Sidechain", "Sampling", "Compression", "Reverb", "Sound Design",
  ]);

  const [suggestedTopics, setSuggestedTopics] = useState([]);

  useEffect(() => {
    // Simulation : Suggestions automatiques de sujets similaires
    const mockTopics = [
      { id: 1, title: "Problème de latence sur FL Studio" },
      { id: 2, title: "Comment utiliser la compression parallèle ?" },
      { id: 3, title: "Vos astuces pour un meilleur mixage ?" },
    ];
    if (formData.title.length > 3) {
      setSuggestedTopics(mockTopics.filter(t => t.title.toLowerCase().includes(formData.title.toLowerCase())));
    } else {
      setSuggestedTopics([]);
    }
  }, [formData.title]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    // Ici, envoie les données au backend via Inertia.post ou axios
    alert("Sujet créé (simulation) !");
    window.location.href = "/forum";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            <Link href="/forum" className="text-indigo-600 hover:underline font-semibold">← Retour au forum</Link>
            <h1 className="text-3xl font-extrabold text-gray-900 my-6 text-center">Créer un nouveau sujet</h1>

            {/* Suggestions automatiques */}
            {suggestedTopics.length > 0 && (
              <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Avez-vous consulté ces sujets ?</h2>
                <ul className="list-disc list-inside space-y-1">
                  {suggestedTopics.map((t) => (
                    <li key={t.id}>
                      <Link href={`/forum/${t.id}`} className="text-indigo-600 hover:underline">{t.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Titre du sujet</label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Ex: Problème de latence"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Catégorie</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 text-black"
                  required
                >
                  <option value="">Choisir une catégorie</option>
                  <option value="Composition">Composition</option>
                  <option value="Mixage">Mixage</option>
                  <option value="Beatmaking">Beatmaking</option>
                  <option value="Sound Design">Sound Design</option>
                  <option value="Matériel">Matériel</option>
                  <option value="DAW et Plugins">DAW et Plugins</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagChange(tag)}
                      className={`px-3 py-1 rounded-full border ${
                        formData.tags.includes(tag)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300"
                      } text-sm font-semibold hover:bg-indigo-100 transition`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Contenu détaillé</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Décrivez votre sujet en détail..."
                  rows={8}
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isProblem"
                  checked={formData.isProblem}
                  onChange={handleChange}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-gray-700 font-medium">Cochez si c'est un problème à résoudre</label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Publier le sujet
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
