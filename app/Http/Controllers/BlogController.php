<?php
// app/Http/Controllers/BlogController.php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->get('category');
        
        // ✅ VRAIES DONNÉES depuis la BDD
        $query = Article::with(['category', 'user'])
            ->published()
            ->latest('published_at');

        // Filtrage par catégorie
        if ($categorySlug && $categorySlug !== 'all') {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $articles = $query->paginate(12)->through(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'image' => $article->image_url, // ✅ Accesseur pour l'URL complète
                'category' => [
                    'id' => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                    'color' => $this->getCategoryColor($article->category?->slug),
                ],
                'author' => [
                    'name' => $article->user?->name ?? 'Auteur anonyme',
                ],
                'published_at' => $article->published_at?->format('d M Y'),
                'read_time' => $this->calculateReadTime($article->content),
            ];
        });

        // Récupérer toutes les catégories pour le filtre
        $categories = Category::where('type', 'article')
            ->withCount(['articles' => function ($query) {
                $query->published();
            }])
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'articles_count' => $category->articles_count,
                ];
            });

        return Inertia::render('Blog', [
            'articles' => $articles,
            'categories' => $categories,
            'selectedCategory' => $categorySlug ?? 'all',
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::with(['category', 'user', 'comments.user'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        // Articles similaires
        $relatedArticles = Article::with(['category'])
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->published()
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'excerpt' => $article->excerpt,
                    'image' => $article->image_url,
                    'category' => [
                        'name' => $article->category?->name ?? 'Non catégorisé',
                        'slug' => $article->category?->slug ?? 'general',
                    ],
                    'published_at' => $article->published_at?->format('d M Y'),
                ];
            });

        return Inertia::render('BlogArticle', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'content' => $article->content,
                'excerpt' => $article->excerpt,
                'image' => $article->image_url,
                'category' => [
                    'id' => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author' => [
                    'name' => $article->user?->name ?? 'Auteur anonyme',
                ],
                'published_at' => $article->published_at?->format('d M Y'),
                'read_time' => $this->calculateReadTime($article->content),
                'comments_count' => $article->comments->count(),
            ],
            'relatedArticles' => $relatedArticles,
        ]);
    }

    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes = ceil($wordCount / 200);
        return $minutes . ' min de lecture';
    }

    private function getCategoryColor(?string $slug): string
    {
        $colors = [
            'mao' => 'bg-purple-100 text-purple-800',
            'tutoriel' => 'bg-blue-100 text-blue-800',
            'materiel' => 'bg-green-100 text-green-800',
            'actualite' => 'bg-red-100 text-red-800',
            'default' => 'bg-gray-100 text-gray-800',
        ];

        return $colors[$slug] ?? $colors['default'];
    }
}
