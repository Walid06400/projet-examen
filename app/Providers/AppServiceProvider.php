<?php
// app/Providers/AppServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Auto-discovery gère les packages automatiquement
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configuration Inertia pour partager les données utilisateur
        Inertia::share([
            'auth' => [
                'user' => function () {
                    $user = Auth::user();
                    return $user ? [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'is_admin' => $user->is_admin ?? false,
                        'avatar_url' => $user->avatar_url ?? null,
                    ] : null;
                },
            ],
        ]);
    }
}
