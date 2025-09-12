import React from "react";
import { Head, Link } from "@inertiajs/react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function CGU() {
  return (
    <>
      <Head title="Conditions Générales d’Utilisation" />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* NavBar */}
        <NavBar />

        {/* Contenu principal */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6">
              Conditions Générales d’Utilisation
            </h1>

            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                Les présentes Conditions Générales d’Utilisation (CGU) régissent l’accès et l’utilisation du site MAO Academy.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">1. Acceptation des CGU</h2>
              <p>
                En accédant à la plateforme, l’utilisateur accepte sans réserve les présentes CGU.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">2. Services proposés</h2>
              <p>
                MAO Academy propose des formations en ligne, un blog, un forum et un espace membre. Certains services sont payants.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">3. Compte utilisateur</h2>
              <p>
                L’utilisateur s’engage à fournir des informations exactes et à ne pas usurper l’identité d’un tiers. Il est responsable de la sécurité de son compte.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">4. Propriété intellectuelle</h2>
              <p>
                Tous les contenus (textes, vidéos, images, etc.) sont protégés par le droit d’auteur et restent la propriété de MAO Academy ou de ses partenaires.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">5. Responsabilités</h2>
              <p>
                MAO Academy ne saurait être tenue responsable des éventuels dommages liés à l’utilisation du site ou à des contenus externes.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">6. Modifications des CGU</h2>
              <p>
                MAO Academy se réserve le droit de modifier les CGU à tout moment. L’utilisateur sera informé en cas de changement significatif.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">7. Contact</h2>
              <p>
                Pour toute question relative aux CGU :{" "}
                <a
                  href="mailto:walidrachdi@laplateforme.io"
                  className="text-indigo-600 hover:underline"
                >
                  walidrachdi@laplateforme.io
                </a>
              </p>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-flex items-center text-indigo-600 hover:underline font-medium transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
