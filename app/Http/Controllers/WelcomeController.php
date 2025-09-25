<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function index(): Response
    {
        $featuredArticles = Article::with(['category', 'user'])
            ->published()
            ->featured()
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'image' => $article->image_url,
                'is_featured' => $article->is_featured,
                'category' => [
                    'id'   => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author' => [
                    'name'   => $article->user?->name ?? 'Auteur anonyme',
                    'avatar' => $article->user?->avatar_url ?? null,
                ],
                'published_at' => $article->published_at?->format('d M Y'),
                'read_time'    => $this->calculateReadTime($article->content),
            ]);

        $featuredIds = $featuredArticles->pluck('id')->toArray();

        $recentArticles = Article::with(['category', 'user'])
            ->published()
            ->whereNotIn('id', $featuredIds)
            ->latest('published_at')
            ->take(6)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'image' => $article->image_url,
                'is_featured' => $article->is_featured,
                'category' => [
                    'id'   => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author' => [
                    'name'   => $article->user?->name ?? 'Auteur anonyme',
                    'avatar' => $article->user?->avatar_url ?? null,
                ],
                'published_at' => $article->published_at?->format('d M Y'),
                'read_time'    => $this->calculateReadTime($article->content),
            ]);

        $stats = [
            'total_articles'   => Article::published()->count(),
            'total_categories' => \App\Models\Category::where('type', 'article')->count(),
            'total_users'      => \App\Models\User::count(),
        ];

        return Inertia::render('Welcome', [
            'featuredArticles' => $featuredArticles,
            'recentArticles'   => $recentArticles,
            'stats'            => $stats,
            'meta'             => [
                'title'       => 'MAOlogie - Communauté MAO',
                'description' => "Découvrez la communauté MAOlogie dédiée à la Musique Assistée par Ordinateur. Tutoriels, guides et partage d'expériences pour tous les niveaux.",
                'keywords'    => 'MAO, production musicale, tutoriels, communauté, musique',
            ],
        ]);
    }

    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes   = ceil($wordCount / 200);
        return $minutes < 1 ? '< 1 min de lecture' : $minutes . ' min de lecture';
    }
}
