<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Afficher le dashboard utilisateur
     */
    public function index(): Response
    {
        try {
            // Charger l'utilisateur connecté avec stats et relations
            $user = User::withCount([
                    'comments as total_comments',
                    'comments as articles_commented' => function ($q) {
                        $q->distinct('article_id');
                    },
                ])
                ->with(['comments' => function ($q) {
                    $q->with('article.category:id,name,title,slug')
                      ->latest()
                      ->take(5);
                }])
                ->findOrFail(Auth::id());

            // Préparer activité récente
            $recentActivity = $user->comments->map(fn($comment) => [
                'type'         => 'comment',
                'article_title'=> $comment->article->title ?? '—',
                'article_slug' => $comment->article->slug ?? '#',
                'content'      => Str::limit($comment->content, 100),
                'created_at'   => $comment->created_at->format('d/m/Y H:i'),
            ]);

            // Statistiques du blog
            $blogStats = [
                'total_comments'     => $user->total_comments,
                'articles_commented' => $user->articles_commented,
                'last_comment'       => optional($user->comments->first())->created_at?->format('d/m/Y H:i'),
                'favorite_category'  => $this->getFavoriteCategory($user),
            ];

            return Inertia::render('Dashboard', [
                 'auth' => [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar_url' => $user->avatar_url,
                        'bio' => $user->bio,
                        'location' => $user->location,
                        'website' => $user->website,
                        'is_admin' => $user->is_admin,
                    ],
                ],
                'blogStats'     => $blogStats,
                'recentActivity'=> $recentActivity,
                'flash'         => session()->get('success'),
            ]);
        } catch (\Exception $e) {
            Log::error('Dashboard error: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'trace'   => $e->getTraceAsString(),
            ]);
             $currentUser = Auth::user();
            return Inertia::render('Dashboard', [
               'auth' => [
                    'user' => [
                        'id' => $currentUser->id,
                        'name' => $currentUser->name,
                        'email' => $currentUser->email,
                        'avatar_url' => $currentUser->avatar_url,
                        'bio' => $currentUser->bio,
                        'location' => $currentUser->location,
                        'website' => $currentUser->website,
                        'is_admin' => $currentUser->is_admin,
                    ],
                ],
                'blogStats' => [
                    'total_comments'     => 0,
                    'articles_commented' => 0,
                    'last_comment'       => null,
                    'favorite_category'  => 'Aucune',
                ],
                'recentActivity' => [],
                'error'          => 'Une erreur est survenue lors du chargement du dashboard.',
                'flash'          => session()->get('success'),
            ]);
        }
    }

    /**
     * Déterminer la catégorie favorite
     */
    private function getFavoriteCategory(User $user): string
    {
        try {
             $userComments = $user->comments()
                ->with('article.category:id,name')
                ->get();

            if ($userComments->isEmpty()) {
                return 'Aucune';
            }

            $categoryStats = $userComments
                ->filter(fn($comment) => $comment->article && $comment->article->category)
                ->groupBy(fn($comment) => $comment->article->category->name)
                ->map(fn($group) => $group->count())
                ->sortDesc();

                 return $categoryStats->keys()->first() ?? 'Aucune';
        } catch (\Exception $e) {
            Log::error('getFavoriteCategory error: '.$e->getMessage());
            return 'Aucune';
        }
    }
}
