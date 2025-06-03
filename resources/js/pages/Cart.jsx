import React from "react";
import { Link } from "@inertiajs/react";

export default function Cart() {
  // Simuler le panier
  const cart = [
    { id: 1, title: "Production musicale", price: 24.99 },
    { id: 2, title: "Mixage audio", price: 29.99 },
  ];
  const total = cart.reduce((sum, f) => sum + f.price, 0);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
            <span>{item.title}</span>
            <span className="font-semibold">{item.price} €</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
      <Link href="/checkout" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition">
        Procéder au paiement
      </Link>
    </div>
  );
}
