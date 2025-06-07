<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page d'accueil
Route::get('/', fn ()=> Inertia::render('welcome'))->name('home');

// Authentification
Route::get('/login', fn ()=> Inertia::render('/auth/login'))->name('login');

Route::get('/register', fn()=> Inertia::render('/auth/register'))->name('register');

// Liste du blog
Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');


// Liste d'articles par catégorie
Route::get('/blog/categorie/{slug}', function ($slug) {
    return Inertia::render('BlogCategory', ['slug' => $slug]);
})->name('blog.category');


// Article individuel
Route::get('/blog/{slug}', function ($slug) {
    return Inertia::render('BlogArticle', ['slug' => $slug]);
})->name('blog.article');



// Formations (liste)
Route::get('/formations', function (){
    return Inertia::render('Formations');
})->name('formations');

// Détail d'une formation
Route::get('/formations/{slug}', function ($slug) {
    return Inertia::render('FormationDetail', ['slug' => $slug]);
})->name('formations.detail');


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

Route::get('/checkout/success', function () {
    return Inertia::render('CheckoutSuccess');
})->name('checkout.success');

// Contact
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Routes protégées par middleware
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profil', function () {
        return Inertia::render('Profil');
    })->name('profil');
});

// Dashboard admin ou utilisateur
Route::get('/dashboard', function () {
    // Tu peux ici ajouter une vérification du rôle si nécessaire
    return Inertia::render('Admin');
})->name('dashboard');

// Pages légales
Route::get('/cgu', function () {
    return Inertia::render('CGU');
})->name('cgu');

Route::get('/legal', function () {
    return Inertia::render('Legal');
})->name('legal');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

// 404 personnalisée (optionnel)
Route::fallback(function () {
    return Inertia::render('NotFound');
});

// Inclusion des routes supplémentaires
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';







