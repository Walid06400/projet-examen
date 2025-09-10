<?php
// app/Http/Controllers/WelcomeController.php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function index(): Response
    {
        // ✅ VRAIES DONNÉES depuis la BDD
        $featuredArticles = Article::with(['category', 'user'])
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
                    'excerpt' => $article->excerpt,
                    'image' => $article->image_url, // ✅ Utilise l'accesseur
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
                ];
            });

        $recentArticles = Article::with(['category', 'user'])
            ->published()
            ->latest('published_at')
            ->take(6)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'slug' => $article->slug,
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
                ];
            });

        return Inertia::render('Welcome', [
            'featuredArticles' => $featuredArticles,
            'recentArticles' => $recentArticles,
        ]);
    }

    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes = ceil($wordCount / 200); // 200 mots par minute
        return $minutes . ' min de lecture';
    }
}
