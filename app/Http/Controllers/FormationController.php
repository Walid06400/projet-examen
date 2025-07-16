<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Inertia\Inertia;

class FormationController extends Controller
{
    public function index()
    {
        $formations = Training::select(['id','title','slug','description','image','price','badge','level','subject'])
            ->latest()
            ->get()
            ->each->append('image_url');

        return Inertia::render('Formations', [
            'formations' => $formations,
        ]);
    }

    public function show($slug)
    {
        $formation = Training::where('slug', $slug)
            ->select(['id','title','slug','description','content','image','price','badge','level','subject'])
            ->firstOrFail();

        $formation->image_url = $formation->image_url;

        return Inertia::render('FormationDetail', [
            'formation' => $formation,
        ]);
    }
}
