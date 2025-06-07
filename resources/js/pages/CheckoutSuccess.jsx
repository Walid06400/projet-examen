import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <svg className="w-20 h-20 text-green-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement réussi !</h1>
          <p className="text-gray-600 mb-8">Merci pour votre achat. Vous recevrez un email de confirmation.</p>
          <Link 
            href="/formations" 
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Retour aux formations
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
