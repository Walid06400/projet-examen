import React, { useState } from "react";

export default function ReplyForm({ onReply }) {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    onReply(reply);
    setReply("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-indigo-50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ajouter une réponse</h2>
      <textarea
        value={reply}
        onChange={e => setReply(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:ring-2 focus:ring-indigo-500 text-black"
        placeholder="Votre réponse..."
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg"
      >
        Publier la réponse
      </button>
    </form>
  );
}
