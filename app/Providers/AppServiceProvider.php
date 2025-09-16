<?php
// app/Providers/AppServiceProvider.php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Auto-découverte gère tout
    }

    public function boot(): void
    {
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
