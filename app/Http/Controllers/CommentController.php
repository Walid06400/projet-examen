<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CommentController extends Controller
{
    /**
     * ✅ Créer un nouveau commentaire
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'article_id' => 'required|exists:articles,id',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        $comment = Comment::create([
            'content' => $validated['content'],
            'article_id' => $validated['article_id'],
            'parent_id' => $validated['parent_id'] ?? null,
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', 'Commentaire ajouté avec succès !');
    }

    /**
     * ✅ Supprimer un commentaire
     */
    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== Auth::id() && !Auth::user()->is_admin) {
            abort(403, 'Action non autorisée');
        }

        $comment->delete();

        return back()->with('success', 'Commentaire supprimé avec succès !');
    }

    /**
     * ✅ Ajouter/modifier/supprimer une réaction sur un commentaire
     */
    public function react(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'type' => ['required', Rule::in([Reaction::TYPE_LIKE, Reaction::TYPE_DISLIKE])]
        ]);

        $userId = Auth::id();
        $type = $validated['type'];

        // Vérifier si l'utilisateur a déjà une réaction sur ce commentaire
        $existingReaction = $comment->reactions()
            ->where('user_id', $userId)
            ->first();

        if ($existingReaction) {
            if ($existingReaction->type === $type) {
                // Même type de réaction : la supprimer (toggle)
                $existingReaction->delete();
                $action = 'removed';
            } else {
                // Type différent : la modifier
                $existingReaction->update(['type' => $type]);
                $action = 'updated';
            }
        } else {
            // Pas de réaction existante : en créer une nouvelle
            Reaction::create([
                'user_id' => $userId,
                'reactable_id' => $comment->id,
                'reactable_type' => Comment::class,
                'type' => $type
            ]);
            $action = 'added';
        }

        // ✅ Recharger les relations pour avoir les compteurs à jour
        $comment->load('reactions');

        // Retourner les nouveaux compteurs
        return response()->json([
            'success' => true,
            'action' => $action,
            'likes_count' => $comment->likesCount(),
            'dislikes_count' => $comment->dislikesCount(),
            'user_reaction' => $comment->getUserReaction($userId)?->type
        ]);
    }
}
