<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// routes/web.php
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\TrainingCatalogController;
use App\Http\Controllers\ForumController;


// Remplacer la route existante par :
Route::get('/', [WelcomeController::class, 'index'])->name('home');

// Authentification
Route::get('/login', fn() => Inertia::render('auth/Login'))->name('login');
Route::get('/register', fn() => Inertia::render('auth/Register'))->name('register');

// Liste du blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog');

// Liste d'articles par catégorie
Route::get('/blog/categorie/{slug}', [BlogController::class, 'byCategory'])->name('blog.category');

// Article individuel
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.article');




//Route::get('/formations', [FormationController::class, 'index'])->name('formations');
//Route::get('/formations/{slug}', [FormationController::class, 'show'])->name('formations.detail');
/* Catalogue formations */
Route::get('/formations',        [TrainingCatalogController::class, 'index'])
     ->name('formations');

Route::get('/formations/{slug}', [TrainingCatalogController::class, 'show'])
     ->name('formations.detail');

//Forum
Route::get('/forum', function () {
    return Inertia::render('Forum');
})->name('forum');
// Création d'un sujet (doit être AVANT la route dynamique)
Route::get('/forum/new', fn() => Inertia::render('NewTopic'))->name('forum.new');
// Détail d'un sujet
Route::get('/forum/{id}', function ($id) {
    return Inertia::render('ForumTopic', ['id' => $id]);
})->name('forum.detail');

// Panier
Route::get('/cart',function () {
    return Inertia::render('Cart');
})->name('cart');
// Paiement fictif (checkout)
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');
// Succès du paiement
Route::get('/checkout/success', function () {
    return Inertia::render('CheckoutSuccess');
})->name('checkout.success');

// Contact
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
// Pages légales
Route::get('/cgu', function () {
    return Inertia::render('CGU');
})->name('cgu');
// Politique de confidentialité
Route::get('/legal', function () {
    return Inertia::render('Legal');
})->name('legal');
// Politique de confidentialité (alternative)
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

// Routes protégées par middleware
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profil', function () {
        return Inertia::render('Profil');
    })->name('profil');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

}); 



// 404 personnalisée (optionnel)
Route::fallback(function () {
    return Inertia::render('NotFound');
});

// Inclusion des routes supplémentaires
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';







