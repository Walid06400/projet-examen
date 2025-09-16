import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import AppLayout from '@/layouts/app-layout';

// Import dynamique de toutes les pages JSX dans ./pages et ses sous-dossiers
// Vite va analyser ces fichiers à la compilation
const pages = import.meta.glob('./pages/**/*.jsx');

createInertiaApp({
  resolve: async (name) => {
    // Inertia fournit le nom de page "auth/Login", on le transforme en chemin relatif Vite
    const pagePath = `./pages/${name}.jsx`;

    const importPage = pages[pagePath];

    if (!importPage) {
      // Message clair pour debugging
      throw new Error(`Page "${name}" introuvable dans ./pages/ (cherché ${pagePath})`);
    }

    const module = await importPage();
    const page = module.default;

    // Si la page n’a pas de layout défini, on lui attribue AppLayout
    page.layout ??= (pageContent) => <AppLayout>{pageContent}</AppLayout>;

    return page;
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <App {...props} />
        <Toaster position="top-right" />
      </>
    );
  },
});
