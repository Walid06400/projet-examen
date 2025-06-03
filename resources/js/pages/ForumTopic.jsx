// ForumTopic.jsx mis à jour

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ForumTopic() {
  const [reply, setReply] = useState("");
  const [topic, setTopic] = useState({
    title: "Quel DAW choisir ?",
    author: "Alice",
    resolved: false,
    posts: [
      { id: 1, author: "Alice", content: "Je débute, que me conseillez-vous ?", date: "2025-05-19", solution: false, likes: 3 },
      { id: 2, author: "Bob", content: "Ableton est top pour débuter !", date: "2025-05-20", solution: false, likes: 5 },
    ],
  });

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setTopic(prev => ({
      ...prev,
      posts: [...prev.posts, { id: prev.posts.length + 1, author: "Vous", content: reply, date: new Date().toLocaleDateString(), solution: false, likes: 0 }]
    }));
    setReply("");
  };

  const markAsSolution = (id) => {
    setTopic(prev => ({
      ...prev,
      resolved: true,
      posts: prev.posts.map(post =>
        post.id === id ? { ...post, solution: true } : { ...post, solution: false }
      )
    }));
  };

  const likePost = (id) => {
    setTopic(prev => ({
      ...prev,
      posts: prev.posts.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
            <Link href="/forum" className="text-indigo-600 hover:underline font-semibold">← Retour au forum</Link>
            <h1 className="text-3xl font-extrabold text-gray-900 my-6">{topic.title}</h1>
            {topic.resolved && <div className="mb-4 text-green-700 font-semibold">✅ Problème résolu</div>}
            <div className="space-y-6 mb-8">
              {topic.posts.map((post) => (
                <div key={post.id} className={`p-6 border rounded-xl ${post.solution ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"} relative`}>
                  {post.solution && (
                    <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ✔ Résolu
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    <span className="text-sm text-gray-400">{post.date}</span>
                  </div>
                  <div className="text-gray-900">{post.content}</div>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <button onClick={() => likePost(post.id)} className="text-indigo-600 hover:underline">👍 {post.likes}</button>
                    {!post.solution && (
                      <button onClick={() => markAsSolution(post.id)} className="text-green-700 hover:underline font-semibold">Marquer comme résolu</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleReply} className="bg-indigo-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ajouter une réponse</h2>
              <textarea
                value={reply}
                onChange={e => setReply(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:ring-2 focus:ring-indigo-500 text-black"
                placeholder="Votre réponse..."
                rows={4}
                required
              />
              <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg">
                Publier la réponse
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
