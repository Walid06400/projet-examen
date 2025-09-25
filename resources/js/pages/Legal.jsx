import React from "react";
import { Head, Link } from "@inertiajs/react";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MentionsLegales() {
  return (
    <>
      <Head title="Mentions légales" />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* NavBar top */}
        <NavBar />

        {/* Contenu principal */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6">
              Mentions légales
            </h1>

            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                Conformément aux dispositions des Articles 6-III et 19 de la Loi
                n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie
                numérique, dite L.C.E.N., il est porté à la connaissance des
                utilisateurs du site MAO Academy les présentes mentions légales.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Éditeur du site</h2>
              <p>
                Nom : MAO Academy <br />
                Adresse : 123 rue des producteurs, Paris, France <br />
                Email : contact@maoacademy.fr
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Hébergement</h2>
              <p>
                OVH - 2 rue Kellermann, 59100 Roubaix, France
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Propriété intellectuelle</h2>
              <p>
                Toute reproduction ou représentation du contenu sans
                autorisation est interdite. Merci de respecter notre travail
                pour maintenir l’équilibre dans la Force ⚖️.
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

        {/* Footer bottom */}
        <Footer />
      </div>
    </>
  );
}
