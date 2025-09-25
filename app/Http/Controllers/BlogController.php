<?php
// app/Http/Controllers/BlogController.php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * ✅ CORRECTION : Méthode index complète avec catégories
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->get('category');

        // VRAIES DONNÉES depuis la BDD
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
                'image' => $article->image_url, // Accesseur pour l'URL complète
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

        // ✅ CORRECTION : Récupérer toutes les catégories pour le filtre
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

        // ✅ CORRECTION : Catégorie courante si filtrage
        $currentCategory = null;
        if ($categorySlug && $categorySlug !== 'all') {
            $currentCategory = Category::where('slug', $categorySlug)->first();
            if ($currentCategory) {
                $currentCategory = [
                    'id' => $currentCategory->id,
                    'name' => $currentCategory->name,
                    'slug' => $currentCategory->slug,
                ];
            }
        }

        return Inertia::render('Blog', [
            'articles' => $articles,
            'categories' => $categories, // ✅ AJOUTÉ : Passer les catégories
            'currentCategory' => $currentCategory,
        ]);
    }

    /**
     * ✅ MÉTHODE CATEGORY SÉPARÉE
     */
    public function category(string $slug): Response
    {
        // Utiliser la même logique que index() avec filtrage
        $request = request();
        $request->merge(['category' => $slug]);

        return $this->index($request);
    }

   public function show(string $slug): Response
    {
        $article = Article::with(['category', 'user', 'comments.user'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        $relatedArticles = Article::with('category')
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->published()
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(fn($a) => [
                'id'           => $a->id,
                'title'        => $a->title,
                'slug'         => $a->slug,
                'excerpt'      => $a->excerpt,
                'image'        => $a->image_url,
                'category'     => [
                    'name' => $a->category?->name ?? 'Non catégorisé',
                    'slug' => $a->category?->slug ?? 'general',
                ],
                'published_at' => $a->published_at?->format('d M Y'),
            ])
            ->toArray();

        return Inertia::render('BlogArticle', [
            'article'         => [
                'id'            => $article->id,
                'title'         => $article->title,
                'slug'          => $article->slug,
                'content'       => $article->content,
                'excerpt'       => $article->excerpt,
                'image'         => $article->image_url,
                'category'      => [
                    'id'   => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author'        => ['name' => $article->user?->name ?? 'Auteur anonyme'],
                'published_at'  => $article->published_at?->format('d M Y'),
                'read_time'     => $this->calculateReadTime($article->content),
                'comments_count'=> $article->comments->count(),
            ],
            'comments'        => $article->comments->map(fn($c) => [
                'id'         => $c->id,
                'content'    => $c->content,
                'author'     => [
                    'name'   => $c->user?->name ?? 'Utilisateur',
                    'avatar' => $c->user?->avatar_url,
                ],
                'created_at' => $c->created_at?->format('d M Y H:i'),
            ])->toArray(),
            'relatedArticles' => $relatedArticles,           // array validé
            'canComment'      => Auth::check(),              // <— utiliser le Facade
        ]);
    }

    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes   = ceil($wordCount / 200);
        return $minutes . ' min de lecture';
    }




    //private function getCategoryColor(?string $slug): string
    //{
      //  $colors = [
        //    'production-musicale' => 'bg-purple-100 text-purple-800',
          //  'mixage-audio' => 'bg-blue-100 text-blue-800',
            //'mastering' => 'bg-green-100 text-green-800',
        //    'materiel-hardware' => 'bg-yellow-100 text-yellow-800',
          //  'plugins-software' => 'bg-indigo-100 text-indigo-800',
       //     'actualites-mao' => 'bg-red-100 text-red-800',
         //   'default' => 'bg-gray-100 text-gray-800',
        //];

        //return $colors[$slug] ?? $colors['default'];
    //}
}
