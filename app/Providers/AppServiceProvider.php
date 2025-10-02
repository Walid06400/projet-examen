<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force le lien symbolique storage pour les avatars
        if ($this->app->environment('local')) {
            URL::forceScheme('http');
        }

        // S'assurer que le lien symbolique storage existe
        if (!file_exists(public_path('storage'))) {
            $this->app->make('files')->link(
                storage_path('app/public'),
                public_path('storage')
            );
        }
    }
}
