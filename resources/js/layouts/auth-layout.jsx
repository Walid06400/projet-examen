import AuthLayoutTemplate from './auth/auth-simple-layout.jsx';

import React from "react";

export default function AuthLayout({ title, description, children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        {/* Logo cliquable vers l'accueil (optionnel) */}
        <a href="/" className="flex justify-center mb-6">
          <img 
            src="/images/Logo.png" 
            alt="Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg transition-all"
            style={{ maxWidth: "180px", maxHeight: "180px" }} // Sécurité pour éviter les débordements
            draggable={false} />
        </a>
        <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
        {description && <p className="mb-6 text-gray-500 text-center">{description}</p>}
        {children}
      </div>
      {/* Footer minimal (optionnel) */}
      <footer className="mt-6 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Blog-MAOlogie. Tous droits réservés.
      </footer>
    </div>
  );
}


