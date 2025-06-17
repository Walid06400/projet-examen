<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TrainingController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ReactionController;

// Routes publiques (sans authentification)
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/trainings', [TrainingController::class, 'index']);
Route::get('/trainings/{slug}', [TrainingController::class, 'show']);
Route::get('/forum/topics', [ForumController::class, 'index']);
Route::get('/forum/topics/{id}', [ForumController::class, 'show']);

// Routes protégées (avec authentification)
Route::middleware('auth:sanctum')->group(function () {
    // Panier
    Route::get('/cart', [CartController::class, 'show']);
    Route::post('/cart/add/{training}', [CartController::class, 'add']);
    Route::delete('/cart/remove/{training}', [CartController::class, 'remove']);
    
    // Forum (actions utilisateur)
    Route::post('/forum/topics', [ForumController::class, 'store']);
    Route::post('/forum/topics/{topic}/posts', [ForumController::class, 'addPost']);
    
    // Réactions (likes/dislikes)
    Route::post('/reactions/toggle', [ReactionController::class, 'toggle']);
});
