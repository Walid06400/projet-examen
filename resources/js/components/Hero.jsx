import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button"; // Assurez-vous que le chemin est correct

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// const pulseButton = {
//   animate: {
//     scale: [1, 1.15, 1],
//     transition: {
//       duration: 1.5,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

const Hero = () => {
  return (
    <section className="relative h-[150vh] md:h-[150vh] lg:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <img
        src="/images/Maologie-.webp"
        alt="Fond Hero"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

    
{/* Texte d'accroche + bouton animé */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 drop-shadow-lg">
          Rejoignez notre communauté dès aujourd’hui !
        </h2>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button
            className=" hover:opacity-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out px-10 py-4"
            type="button"
            onClick={() => (window.location.href = "/register")}
          >
            Inscription
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
