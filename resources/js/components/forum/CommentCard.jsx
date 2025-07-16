import React from "react";

export default function CommentCard({ author, content, date, solution, onMarkSolution }) {
  return (
    <div className={`p-6 border rounded-xl mb-4 ${solution ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"} relative`}>
      {solution && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          ✔ Résolu
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900">{author}</span>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
      <div className="text-gray-900">{content}</div>
      {onMarkSolution && !solution && (
        <button
          onClick={onMarkSolution}
          className="mt-4 text-sm text-green-700 hover:underline font-semibold"
        >
          Marquer comme résolu
        </button>
      )}
    </div>
  );
}
