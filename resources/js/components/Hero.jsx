import React from "react";
import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

const Hero = () => (
  <section
    className="relative min-h-[55vh] flex items-center justify-center"
    style={{
      backgroundImage: `url('/images/Maologie-.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-900/30 via-pink-800/20 to-blue-900/30"></div>
    <motion.div
      className="relative z-10 mx-auto max-w-3xl w-full rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/40"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={heroVariants}
    >
      <div
        className="rounded-2xl p-4 md:p-6"
        style={{
          background: "rgba(30,34,90,0.33)",
          boxShadow: "0 4px 32px 0 rgba(31, 38, 135, 0.17)",
        }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-center drop-shadow-lg">
           Bienvenue dans le monde merveilleux du Blog MAOlogie
           
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white font-medium text-center drop-shadow">
          La MAO, c'est un peu comme la cuisine : il faut les bons ingrédients, un soupçon de créativité et une bonne dose de patience (et parfois un peu de vin pour se détendre). Que tu sois un pro du mixage ou un novice qui galère avec son premier synthétiseur, ici, on est tous là pour apprendre et partager notre passion pour la musique assistée par ordinateur.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"> */}
          <a
            href="/register"
            className="rounded-full bg-indigo-600 px-10 py-3 text-base font-semibold shadow-md hover:bg-indigo-500 transition text-white"
          >
            Inscription
          </a>
        {/* </div>
      </div>
    </motion.div> */}
  </section>
);

export default Hero;
