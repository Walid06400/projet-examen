// 🧩 Style global (tailwind, app.css)
import '../css/app.css';

// ⚙️ Outils Inertia + React
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

// 🌙 Gestion du thème clair/sombre
import { initializeTheme } from './hooks/use-appearance';

// 🛒 Fournisseur de contexte pour le panier
import { CartProvider } from './components/CartContext';

// 📛 Nom de l'app depuis .env
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// 🚀 Initialisation de l'app Inertia
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    // ✅ On entoure l'app avec CartProvider pour activer useCart()
    root.render(
      <CartProvider>
        <App {...props} />
      </CartProvider>
    );
  },

  // Barre de progression de page Inertia
  progress: {
    color: '#4B5563',
  },
});

// 🌗 Initialise le thème clair/sombre au chargement
initializeTheme();
