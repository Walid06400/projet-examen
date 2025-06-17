<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ForumTopic;
use App\Models\ForumPost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ForumController extends Controller
{
    use AuthorizesRequests;
    /**
     * Afficher tous les sujets du forum
     */
    public function index(): JsonResponse
    {
        $topics = ForumTopic::with(['user', 'posts'])
            ->withCount('posts')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $topics
        ]);
    }

    /**
     * Afficher un sujet avec ses posts
     */
    public function show(ForumTopic $topic): JsonResponse
    {
        $topic->load([
            'user',
            'posts.user',
            'posts.reactions'
        ]);

        return response()->json([
            'success' => true,
            'data' => $topic
        ]);
    }

    /**
     * Créer un nouveau sujet
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $topic = ForumTopic::create([
            'user_id' => auth()->id(),
            'title' => $validated['title']
        ]);

        // Créer le premier post
        ForumPost::create([
            'topic_id' => $topic->id,
            'user_id' => auth()->id(),
            'content' => $validated['content']
        ]);

        $topic->load(['user', 'posts.user']);

        return response()->json([
            'success' => true,
            'data' => $topic
        ], 201);
    }

    /**
     * Ajouter un post à un sujet
     */
    public function addPost(Request $request, ForumTopic $topic): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string'
        ]);

        $post = ForumPost::create([
            'topic_id' => $topic->id,
            'user_id' => auth()->id(),
            'content' => $validated['content']
        ]);

        $post->load('user');

        return response()->json([
            'success' => true,
            'data' => $post
        ], 201);
    }

    /**
     * Marquer un post comme solution
     */
    public function markAsSolution(ForumPost $post): JsonResponse
    {
        $this->authorize('markAsSolution', $post);

        // Retirer la solution précédente
        ForumPost::where('topic_id', $post->topic_id)
            ->update(['is_solution' => false]);

        // Marquer ce post comme solution
        $post->update(['is_solution' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Post marqué comme solution'
        ]);
    }
}
