import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart');
    window.location.href = "/checkout/success";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Paiement</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nom complet</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Carte bancaire</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Payer maintenant
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
