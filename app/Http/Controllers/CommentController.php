<?php
// app/Http/Controllers/CommentController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;  // ✅ Importer Auth Facade

class CommentController extends Controller
{
    /**
     * Ajouter un commentaire
     */
    public function store(Request $request): RedirectResponse
    {
        // Vérifier connexion
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Connexion requise');
        }

        $validated = $request->validate([
            'article_id' => 'required|exists:articles,id',
            'content' => 'required|string|min:5|max:1000',
        ]);

        Comment::create([
            'article_id' => $validated['article_id'],
            'user_id' => Auth::id(),  // ✅ CORRIGÉ : Auth::id() au lieu de auth()->id()
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Commentaire ajouté !');
    }

    /**
     * Supprimer un commentaire
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();  // ✅ CORRIGÉ : récupérer l'utilisateur
        
        // Vérifier autorisation (auteur OU admin)
        if ($user->id !== $comment->user_id && !$user->is_admin) {
            abort(403, 'Non autorisé');
        }

        $comment->delete();
        return back()->with('success', 'Commentaire supprimé');
    }
}
