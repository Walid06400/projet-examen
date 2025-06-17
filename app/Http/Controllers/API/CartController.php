<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Afficher le panier de l'utilisateur
     */
    public function show(): JsonResponse
    {
        $cart = auth()->user()->cart()->with('trainings')->first();

        if (!$cart) {
            $cart = Cart::create(['user_id' => auth()->id()]);
            $cart->load('trainings');
        }

        $total = $cart->trainings->sum('price');

        return response()->json([
            'success' => true,
            'data' => [
                'cart' => $cart,
                'total' => $total,
                'count' => $cart->trainings->count()
            ]
        ]);
    }

    /**
     * Ajouter une formation au panier
     */
    public function add(Training $training): JsonResponse
    {
        $cart = auth()->user()->cart;

        if (!$cart) {
            $cart = Cart::create(['user_id' => auth()->id()]);
        }

        if ($cart->trainings()->where('training_id', $training->id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cette formation est déjà dans votre panier'
            ], 422);
        }

        $cart->trainings()->attach($training->id);

        $cart->load('trainings');
        $total = $cart->trainings->sum('price');

        return response()->json([
            'success' => true,
            'message' => 'Formation ajoutée au panier',
            'data' => [
                'cart' => $cart,
                'total' => $total,
                'count' => $cart->trainings->count()
            ]
        ]);
    }

    /**
     * Retirer une formation du panier
     */
    public function remove(Training $training): JsonResponse
    {
        $cart = auth()->user()->cart;

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Panier introuvable'
            ], 404);
        }

        $cart->trainings()->detach($training->id);

        $cart->load('trainings');
        $total = $cart->trainings->sum('price');

        return response()->json([
            'success' => true,
            'message' => 'Formation retirée du panier',
            'data' => [
                'cart' => $cart,
                'total' => $total,
                'count' => $cart->trainings->count()
            ]
        ]);
    }

    /**
     * Vider le panier
     */
    public function clear(): JsonResponse
    {
        $cart = auth()->user()->cart;

        if ($cart) {
            $cart->trainings()->detach();
        }

        return response()->json([
            'success' => true,
            'message' => 'Panier vidé avec succès'
        ]);
    }
}
