<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TrainingController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ReactionController;
use App\Http\Controllers\API\AuthController;

// Routes d'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes publiques (sans authentification)
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);
Route::get('/trainings', [TrainingController::class, 'index']);
Route::get('/trainings/{slug}', [TrainingController::class, 'show']);
Route::get('/forum/topics', [ForumController::class, 'index']);
Route::get('/forum/topics/{topic}', [ForumController::class, 'show']);

// Routes protégées (authentification requise)
Route::middleware('auth:sanctum')->group(function () {
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user']);
    
    // Panier
    Route::get('/cart', [CartController::class, 'show']);
    Route::post('/cart/add/{training}', [CartController::class, 'add']);
    Route::delete('/cart/remove/{training}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    
    // Forum (actions utilisateur)
    Route::post('/forum/topics', [ForumController::class, 'store']);
    Route::post('/forum/topics/{topic}/posts', [ForumController::class, 'addPost']);
    Route::patch('/forum/posts/{post}/solution', [ForumController::class, 'markAsSolution']);
    
    // Réactions
    Route::post('/reactions/toggle', [ReactionController::class, 'toggle']);
    
    // Routes admin (gestion de contenu)
    Route::middleware('admin')->group(function () {
        Route::apiResource('articles', ArticleController::class)->except(['index', 'show']);
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('trainings', TrainingController::class)->except(['index', 'show']);
    });
});
