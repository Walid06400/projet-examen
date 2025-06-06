import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

const articles = [
  {
    title: "Comprendre la MAO",
    description: "Découvrez les bases de la musique assistée par ordinateur.",
    image: "/images/articles/MAO.png",
    slug: "comprendre-mao",
  },
  {
    title: "Mixage : astuces pro",
    description: "5 techniques pour améliorer vos mix rapidement.",
    image: "/images/articles/Mixage-astuce.png",
    slug: "mixage-astuces-pro",
  },
  {
    title: "Instruments virtuels",
    description: "Les meilleurs plugins gratuits de 2025.",
    image: "/images/articles/vst-plugins.png",
    slug: "instruments-virtuels",
  },
];



const Card = ({ title, description, image, slug, type }) => (
  <motion.div
    whileHover={{
      scale: 1.045,
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.17)",
      transition: { duration: 0.25 },
    }}
    className="group relative rounded-2xl overflow-hidden shadow-xl bg-white cursor-pointer border border-gray-200 flex flex-col transition w-full max-w-xs mx-auto"
  >
    <Link
      href={
        type === "article"
          ? `/blog/${slug}`
          : `/blog/categorie/${slug}`
      }
      className="flex flex-col h-full w-full no-underline"
    >
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex-1 flex flex-col justify-between p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </Link>
  </motion.div>
);

const ArticlesSection = () => (
  <section className="w-full px-4 sm:px-0 py-8">
    {/* ARTICLES */}
    <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
      Articles du moment
    </h2>
    <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-8 md:space-y-0">
      {articles.map((a, i) => (
        <Card key={i} {...a} type="article" />
      ))}
    </div>
    </section>
    );
    export default ArticlesSection;
    {/* CATEGORIES */}
    {/* <div className="w-full px-0 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Catégories à la une
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 space-y-8 md:space-y-0">
        {categories.map((c, i) => (
          <Card key={i} {...c} type="category" /> */}
        {/* ))} */}
  //</div>
    //</div>

