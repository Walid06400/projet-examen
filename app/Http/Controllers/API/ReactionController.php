<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ForumPost;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReactionController extends Controller
{
    /**
     * Basculer une réaction (like/dislike)
     */
    public function toggle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'post_id' => 'required|exists:forum_posts,id',
            'type' => 'required|in:like,dislike'
        ]);

        $post = ForumPost::findOrFail($validated['post_id']);
        $userId = $request->user()->id;

        // Vérifier si l'utilisateur a déjà réagi
        $existingReaction = Reaction::where([
            'post_id' => $post->id,
            'user_id' => $userId
        ])->first();

        if ($existingReaction) {
            if ($existingReaction->type === $validated['type']) {
                // Supprimer la réaction si c'est la même
                $existingReaction->delete();
                $action = 'removed';
            } else {
                // Changer le type de réaction
                $existingReaction->update(['type' => $validated['type']]);
                $action = 'updated';
            }
        } else {
            // Créer une nouvelle réaction
            Reaction::create([
                'post_id' => $post->id,
                'user_id' => $userId,
                'type' => $validated['type']
            ]);
            $action = 'added';
        }

        // Compter les réactions
        $likesCount = Reaction::where('post_id', $post->id)
            ->where('type', 'like')->count();
        $dislikesCount = Reaction::where('post_id', $post->id)
            ->where('type', 'dislike')->count();

        return response()->json([
            'success' => true,
            'action' => $action,
            'data' => [
                'likes_count' => $likesCount,
                'dislikes_count' => $dislikesCount
            ]
        ]);
    }
}