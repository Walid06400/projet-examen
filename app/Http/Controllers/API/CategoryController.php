<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CategoryController extends Controller
{
    use AuthorizesRequests;
    /**
     * Afficher toutes les catégories
     */
    public function index(): JsonResponse
    {
        $categories = Category::withCount(['articles'])
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Afficher une catégorie avec ses articles
     */
    public function show(string $slug): JsonResponse
    {
        $category = Category::where('slug', $slug)
            ->with(['articles' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * Créer une nouvelle catégorie
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Category::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'type' => 'required|in:blog,training,all'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'data' => $category
        ], 201);
    }

    /**
     * Mettre à jour une catégorie
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        $this->authorize('update', $category);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:categories,name,' . $category->id,
            'type' => 'sometimes|in:blog,training,all'
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    /**
     * Supprimer une catégorie
     */
    public function destroy(Category $category): JsonResponse
    {
        $this->authorize('delete', $category);

        if ($category->articles()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Impossible de supprimer une catégorie contenant des articles'
            ], 422);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Catégorie supprimée avec succès'
        ]);
    }
}