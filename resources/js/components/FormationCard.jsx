import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.93 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function FormationCard({ title, description, image, price, link, badge, level, subject }) {
  return (
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
          className="w-full h-56 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${image})` }}
        >
          {badge && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">
              {badge}
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold text-xs">{subject}</span>
            <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-bold text-xs">{level}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-indigo-800 mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
              {price} €
            </span>
            <span className="ml-4 inline-block rounded-full bg-white/90 border border-indigo-600 text-indigo-700 font-bold px-6 py-2 shadow hover:bg-indigo-600 hover:text-white transition">
              Acheter le pack
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
