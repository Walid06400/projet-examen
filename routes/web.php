<?php

use App\Http\Controllers\{
    WelcomeController,
    BlogController,
    CommentController,
    DashboardController
};
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Routes publiques
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/category/{slug}', [BlogController::class, 'category'])->name('blog.category');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::middleware('auth')->group(function () {
    // Commentaires
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::post('/comments/{comment}/react', [CommentController::class, 'react'])->name('comments.react');
    // Pages statiques
    Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
    Route::get('/legal', fn() => Inertia::render('Legal'))->name('legal');
    Route::get('/cgu', fn() => Inertia::render('CGU'))->name('cgu');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ✅ CORRECTION : Routes profil cohérentes
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

Route::fallback(fn() => Inertia::render('NotFound'));

require __DIR__.'/auth.php';
