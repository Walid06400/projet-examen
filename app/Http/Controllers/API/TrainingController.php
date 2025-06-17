<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Str;

class TrainingController extends Controller
{
use AuthorizesRequests;

/**
 * Afficher toutes les formations
 */
    public function index(): JsonResponse
    {
        $trainings = Training::orderBy('created_at', 'desc')
            ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $trainings
        ]);
    }

    /**
     * Afficher une formation par slug
     */
    public function show(string $slug): JsonResponse
    {
        $training = Training::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $training
        ]);
    }

    /**
     * Créer une nouvelle formation
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Training::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('trainings', 'public');
        }

        $training = Training::create($validated);

        return response()->json([
            'success' => true,
            'data' => $training
        ], 201);
    }

    /**
     * Mettre à jour une formation
     */
    public function update(Request $request, Training $training): JsonResponse
    {
        $this->authorize('update', $training);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'image' => 'nullable|image|max:2048'
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('trainings', 'public');
        }

        $training->update($validated);

        return response()->json([
            'success' => true,
            'data' => $training
        ]);
    }

    /**
     * Supprimer une formation
     */
    public function destroy(Training $training): JsonResponse
    {
        $this->authorize('delete', $training);

        $training->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formation supprimée avec succès'
        ]);
    }
}
