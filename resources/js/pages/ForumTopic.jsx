import { useState } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CommentCard from "../components/forum/CommentCard";
import ReplyForm from "../components/forum/ReplyForm";

export default function ForumTopic() {
  const [topic, setTopic] = useState({
    title: "Quel DAW choisir ?",
    author: "Alice",
    posts: [
      { id: 1, author: "Alice", content: "Je débute, que me conseillez-vous ?", date: "2025-05-19", solution: false },
      { id: 2, author: "Bob", content: "Ableton est top pour débuter !", date: "2025-05-20", solution: false },
    ],
  });

  // Marquer une réponse comme solution
  const markAsSolution = (id) => {
    setTopic(prev => ({
      ...prev,
      posts: prev.posts.map(post =>
        post.id === id
          ? { ...post, solution: true }
          : { ...post, solution: false }
      ),
    }));
  };

  // Ajouter une nouvelle réponse
  const addReply = (replyContent) => {
    setTopic(prev => ({
      ...prev,
      posts: [
        ...prev.posts,
        {
          id: prev.posts.length + 1,
          author: "Vous",
          content: replyContent,
          date: new Date().toLocaleDateString(),
          solution: false,
        },
      ],
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
            <div className="text-gray-500 mb-8">Créé par {topic.author}</div>
            {/* Liste des réponses */}
            <div className="space-y-6 mb-8">
              {topic.posts.map((post) => (
                <CommentCard
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  date={post.date}
                  solution={post.solution}
                  onMarkSolution={
                    post.solution
                      ? undefined
                      : () => markAsSolution(post.id)
                  }
                />
              ))}
            </div>
            {/* Formulaire de réponse */}
            <ReplyForm onReply={addReply} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
