import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = React.useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  const removeItem = (slug) => {
    const updatedCart = cartItems.filter(item => item.slug !== slug);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Mon Panier</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Votre panier est vide.</p>
            <Link href="/formations" className="text-indigo-600 hover:underline">
              ← Retour aux formations
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-indigo-600 font-bold">{item.price} €</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.slug)}
                  className="text-red-600 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            ))}
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-xl font-bold text-right mb-4">
                Total : {total.toFixed(2)} €
              </div>
              <Link 
                href="/checkout" 
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition text-center block"
              >
                Passer la commande
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
