// resources/js/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/cardstudio.png" 
          alt="Studio MAO" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Devenez un expert en production musicale
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90">
              Formations, tutoriels et ressources pour maîtriser la musique assistée par ordinateur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={route('formations')} 
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center"
              >
                Découvrir nos formations
              </Link>
              
              <Link 
                href={route('blog')} 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg transition-colors duration-200 text-center"
              >
                Lire le blog
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
