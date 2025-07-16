<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        // Récupérer tous les articles avec leurs catégories
        $articles = Article::with('category')
            ->latest()
            ->get()
            ->makeHidden(['content'])
            ->append('image_url');
            
        // Récupérer toutes les catégories pour le filtre
        $categories = Category::where('type', 'blog')
            ->orWhere('type', 'all')
            ->get();
            
        // Rendre la page Blog avec les données
        return Inertia::render('Blog', [
            'articles' => $articles,
            'categories' => $categories
        ]);
    }
    
    public function show($slug)
    {
        // Récupérer l'article spécifique par son slug
        $article = Article::where('slug', $slug)
            ->with('category')
            ->firstOrFail();
            
        // Articles similaires (même catégorie)
        $relatedArticles = Article::where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->take(3)
            ->get();
            
        return Inertia::render('BlogArticle', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }
    
    public function byCategory($slug)
    {
        // Trouver la catégorie par son slug
        $category = Category::where('slug', $slug)->firstOrFail();
        
        // Récupérer les articles de cette catégorie
        $articles = Article::where('category_id', $category->id)
            ->with('category')
            ->latest()
            ->get();
            
        // Toutes les catégories pour le filtre
        $categories = Category::where('type', 'blog')
            ->orWhere('type', 'all')
            ->get();
            
        return Inertia::render('BlogCategory', [
            'category' => $category,
            'articles' => $articles,
            'categories' => $categories
        ]);
    }
}
