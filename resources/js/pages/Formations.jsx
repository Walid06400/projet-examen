import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormationCard from "../components/FormationCard";
import { motion } from "framer-motion";

// Données mockées (à remplacer par tes vraies formations)
const formations = [
  {
    title: "Production Débutant",
    description: "Apprenez les bases de la production musicale.",
    image: "/images/formations/formationprod.png",
    price: 49.99,
    link: "/formations/production-debutant",
    badge: "Populaire",
    level: "Débutant",
    subject: "Production",
  },
  {
    title: "Mixage Confirmé",
    description: "Devenez un expert du mixage moderne.",
    image: "/images/formations/maoformation.png",
    price: 69.99,
    link: "/formations/mixage-confirme",
    badge: "Nouveau",
    level: "Confirmé",
    subject: "Mixage",
  },
  {
    title: "Programmation Pro",
    description: "Créez et programmez vos propres VST.",
    image: "/images/formations/formationvst.png",
    price: 99.99,
    link: "/formations/programmation-vst-pro",
    badge: "",
    level: "Pro",
    subject: "Programmation",
  },
  // Ajoute d'autres packs ici
];

const levels = ["Tous", "Débutant", "Confirmé", "Pro"];
const subjects = ["Tous", "Production", "Mixage", "Programmation"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export default function Formations() {
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [selectedSubject, setSelectedSubject] = useState("Tous");

  const filteredFormations = formations.filter(f =>
    (selectedLevel === "Tous" || f.level === selectedLevel) &&
    (selectedSubject === "Tous" || f.subject === selectedSubject)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Formations MAO par Pack
        </h1>

        {/* Filtres stylisés */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Filtres niveau */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="font-semibold text-indigo-700 mr-2">Niveau :</span>
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-5 py-2 rounded-full font-semibold transition 
                  ${selectedLevel === level
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200"
                  }
                  cursor-pointer`}
                aria-pressed={selectedLevel === level}
              >
                {level}
              </button>
            ))}
          </div>
          {/* Filtres matière */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="font-semibold text-pink-700 mr-2">Matière :</span>
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-5 py-2 rounded-full font-semibold transition 
                  ${selectedSubject === subject
                    ? "bg-pink-600 text-white shadow"
                    : "bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200"
                  }
                  cursor-pointer`}
                aria-pressed={selectedSubject === subject}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Affichage des packs */}
        <motion.div
          className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredFormations.length === 0 ? (
            <div className="w-full text-center text-gray-500 italic">
              Aucune formation trouvée pour ce filtre.
            </div>
          ) : (
            filteredFormations.map((formation, i) => (
              <FormationCard key={i} {...formation} />
            ))
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
