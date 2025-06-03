import React, { useState } from "react";

export default function Checkout() {
  const [status, setStatus] = useState("pending");

  const handlePayment = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
    }, 2000); // Simule le paiement
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Paiement</h1>
      {status === "pending" && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="font-semibold mb-2">Total à payer : <span className="text-indigo-600">54.98 €</span></div>
            <div className="mb-4">Simulation de paiement Stripe ou Paypal (fictif)</div>
            <button onClick={handlePayment} className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition">
              Payer avec Stripe
            </button>
          </div>
        </>
      )}
      {status === "processing" && (
        <div className="text-indigo-600 font-bold">Traitement du paiement...</div>
      )}
      {status === "success" && (
        <div className="text-green-600 font-bold">Paiement réussi ! Merci pour votre achat.</div>
      )}
    </div>
  );
}
