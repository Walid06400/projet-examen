<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    use AuthorizesRequests;
    /**
     * Afficher tous les articles avec pagination
     */
    public function index(): JsonResponse
    {
        $articles = Article::with('category')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    /**
     * Afficher un article spécifique par slug
     */
    public function show(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)
            ->with('category')
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    /**
     * Créer un nouvel article (admin uniquement)
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Article::class);

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('articles', 'public');
        }

        $article = Article::create($validated);
        $article->load('category');

        return response()->json([
            'success' => true,
            'data' => $article
        ], 201);
    }

    /**
     * Mettre à jour un article
     */
    public function update(Request $request, Article $article): JsonResponse
    {
        $this->authorize('update', $article);

        $validated = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image' => 'nullable|image|max:2048'
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('articles', 'public');
        }

        $article->update($validated);
        $article->load('category');

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function featured()
{
    return Article::with('category')
        ->orderBy('created_at', 'desc')
        ->take(3)
        ->get();
}


    /**
     * Supprimer un article
     */
    public function destroy(Article $article): JsonResponse
    {
        $this->authorize('delete', $article);

        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
    }
}
