<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Afficher la liste des articles du blog
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->get('category', 'all');

        // Construire la requête avec relations optimisées
        $query = Article::with(['category', 'user'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at');

        // Filtrage par catégorie si spécifiée
        if ($categorySlug && $categorySlug !== 'all') {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        // Paginer et transformer les données
        $articles = $query->paginate(12)->through(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'excerpt' => $article->excerpt,
                'image' => $article->image_url,
                'category' => [
                    'id'   => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author' => [
                    'name' => $article->user?->name ?? 'Auteur anonyme',
                ],
                'published_at' => $article->published_at?->format('d M Y'),
                'read_time'    => $this->calculateReadTime($article->content),
            ];
        });

        // Récupérer toutes les catégories avec comptage
        $categories = Category::where('type', 'article')
            ->withCount(['articles' => function ($query) {
                $query->where('status', 'published');
            }])
            ->orderBy('name')
            ->get()
            ->map(function ($category) {
                return [
                    'id'             => $category->id,
                    'name'           => $category->name,
                    'slug'           => $category->slug,
                    'articles_count' => $category->articles_count,
                ];
            });

        // Log pour debug
        Log::info('Blog Controller Debug', [
            'total_articles'    => Article::where('status', 'published')->count(),
            'articles_in_page'  => $articles->count(),
            'selected_category' => $categorySlug,
            'categories_count'  => $categories->count(),
        ]);

        return Inertia::render('Blog', [
            'articles'         => $articles,
            'categories'       => $categories,
            'selectedCategory' => $categorySlug,
        ]);
    }

    /**
     * Afficher un article individuel
     */
    public function show(string $slug): Response
    {
        $article = Article::with(['category', 'user', 'comments.user'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Charger les commentaires principaux et leurs réactions et réponses
        $comments = Comment::with(['user', 'reactions'])
            ->where('article_id', $article->id)
            ->whereNull('parent_id') // Commentaires principaux uniquement
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($comment) {
                return [
                    'id'              => $comment->id,
                    'content'         => $comment->content,
                    'created_at'      => $comment->created_at->format('d/m/Y H:i'),
                    'user'            => [
                        'id'     => $comment->user->id,
                        'name'   => $comment->user->name,
                        'avatar' => $comment->user->avatar,
                    ],
                    'likes_count'     => $comment->likesCount(),
                    'dislikes_count'  => $comment->dislikesCount(),
                    'user_reaction'   => Auth::check() ? $comment->getUserReaction(Auth::id())?->type : null,
                    'can_delete'      => auth::check() && (auth::id() === $comment->user_id || auth::user()->is_admin),
                    'replies'         => $comment->replies()->with(['user', 'reactions'])->get()->map(function ($reply) {
                        return [
                            'id'             => $reply->id,
                            'content'        => $reply->content,
                            'created_at'     => $reply->created_at->format('d/m/Y H:i'),
                            'user'           => [
                                'id'     => $reply->user->id,
                                'name'   => $reply->user->name,
                                'avatar' => $reply->user->avatar,
                            ],
                            'likes_count'    => $reply->likesCount(),
                            'dislikes_count' => $reply->dislikesCount(),
                            'user_reaction'  => auth::check() ? $reply->getUserReaction(auth::id())?->type : null,
                            'can_delete'     => auth::check() && (auth::id() === $reply->user_id || auth::user()->is_admin),
                        ];
                    }),
                ];
            });

        // Articles similaires (même catégorie)
        $relatedArticles = Article::with('category')
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($relatedArticle) {
                return [
                    'id'           => $relatedArticle->id,
                    'title'        => $relatedArticle->title,
                    'slug'         => $relatedArticle->slug,
                    'excerpt'      => $relatedArticle->excerpt,
                    'image'        => $relatedArticle->image_url,
                    'category'     => [
                        'name' => $relatedArticle->category?->name ?? 'Non catégorisé',
                        'slug' => $relatedArticle->category?->slug ?? 'general',
                    ],
                    'published_at' => $relatedArticle->published_at?->format('d M Y'),
                ];
            });

        return Inertia::render('BlogArticle', [
            'article'         => [
                'id'             => $article->id,
                'title'          => $article->title,
                'slug'           => $article->slug,
                'content'        => $article->content,
                'excerpt'        => $article->excerpt,
                'image'          => $article->image_url,
                'category'       => [
                    'id'   => $article->category?->id,
                    'name' => $article->category?->name ?? 'Non catégorisé',
                    'slug' => $article->category?->slug ?? 'general',
                ],
                'author'         => [
                    'name' => $article->user?->name ?? 'Auteur anonyme',
                ],
                'published_at'   => $article->published_at?->format('d M Y'),
                'read_time'      => $this->calculateReadTime($article->content),
                'comments_count' => $article->comments->count(),
            ],
            'comments'        => $comments,
            'relatedArticles' => $relatedArticles,
            'canComment'      => Auth::check(),
        ]);
    }

    /**
     * Afficher les articles d'une catégorie spécifique
     */
    public function category(string $slug): Response
    {
        $request = request();
        $request->merge(['category' => $slug]);
        return $this->index($request);
    }

    /**
     * Calculer le temps de lecture estimé
     */
    private function calculateReadTime(string $content): string
    {
        $wordCount = str_word_count(strip_tags($content));
        $minutes   = ceil($wordCount / 200); // 200 mots par minute
        return $minutes . ' min de lecture';
    }
}
