import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react"; // ou "react-router-dom"

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
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.93 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const FormationCard = ({ title, description, image, price, period, link, badge }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      scale: 1.055,
      boxShadow: "0 12px 40px 0 rgba(60, 30, 160, 0.18)",
      transition: { duration: 0.25 },
    }}
    className="group relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-50 via-white to-pink-100 border-2 border-indigo-100 flex flex-col min-h-[380px] transition"
    style={{ flex: 1 }}
  >
    <Link href={link} className="flex flex-col h-full w-full no-underline">
      <div
        className="w-full h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {badge && (
          <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between p-8">
        <h3 className="text-2xl font-extrabold text-indigo-800 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
            {price} €  {period}
          </span>
          <span className="ml-4 inline-block rounded-full bg-white/90 border border-indigo-600 text-indigo-700 font-bold px-6 py-2 shadow hover:bg-indigo-600 hover:text-white transition">
            Acheter le pack
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const FormationsSection = () => (
  <section className="w-full px-2 sm:px-0 py-8">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Formations à la une</h2>
    <motion.div
      className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {formations.map((f, i) => (
        <FormationCard key={i} {...f} />
      ))}
    </motion.div>
  </section>
);

export default FormationsSection;
