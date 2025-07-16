<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use App\Models\Training;

class WelcomeController extends Controller
{
    public function index()
    {
        $recentArticles = Article::with('category')
            ->select(['id','title','slug','image','created_at','category_id']) // on filtre AVANT get()
            ->latest()
            ->take(3)
            ->get()                          // ← on ne rappelle plus get() derrière
            ->map(function ($article) {
            // Force l'inclusion de l'accesseur image_url dans le tableau envoyé à Inertia
            $article->image_url = $article->image_url;
            return $article;
        });
              $featuredTrainings = Training::select(['id','title','slug','image','price'])
            ->latest()
            ->take(3)
            ->get()
            ->each(function ($article) {
                $article->image_url = $article->image_url; // Force l'inclusion de l'accesseur image_url
        });

         $formations = Training::active()
        ->select(['id','title','slug','description','price','image'])
        ->featured()          // si tu veux vraiment « à la une », sinon ->latest()->take(3)
        ->take(3)
        ->get()
        ->each->append('image_url');

         return Inertia::render('welcome', [
        'formations'     => $formations,
        'recentArticles' => $recentArticles,

        ]);
    }
}
