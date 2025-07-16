<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Inertia\Inertia;

class TrainingCatalogController extends Controller
{
    /* Liste paginée -------------------------------------------------------*/
    public function index()
    {
        $trainings = Training::active()                          // scope dans le modèle
            ->select(['id','title','slug','description','price','image','level','subject'])
            ->latest()
            ->paginate(12)
            ->through(fn ($t) => $t->append('image_url'));

        return Inertia::render('Formations', [
            'trainings' => $trainings,
        ]);
    }

    /* Détail --------------------------------------------------------------*/
    public function show(string $slug)
    {
        $training = Training::active()
            ->where('slug', $slug)
            ->firstOrFail()
            ->append('image_url');

        return Inertia::render('FormationDetail', [
            'training' => $training,
        ]);
    }
}
