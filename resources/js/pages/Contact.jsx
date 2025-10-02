import React from "react";
import { Head, Link } from "@inertiajs/react";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLayout from "@/layouts/app-layout";

export default function Contact() {
  return (
    <AppLayout>
      <Head title="Contact" />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* NavBar */}


        {/* Contenu principal */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Contact</h1>

            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                Une question ? Un problème ? Une demande de partenariat ? Notre équipe est à votre écoute.
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Par email</h2>
              <p>
                📧 <a href="mailto:walidrachdi@laplateforme.io" className="text-indigo-600 hover:underline">
                  walidrachdi@laplateforme.io
                </a>
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Par téléphone</h2>
              <p>
                📞 123 456 7890
              </p>

              <h2 className="text-lg font-semibold text-indigo-600">Adresse postale</h2>
              <p>
                MAO Academy<br />
                123 rue des producteurs<br />
                75000 Paris, France
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

      </div>
    </AppLayout>
  );
}
