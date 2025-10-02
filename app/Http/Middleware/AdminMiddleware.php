<?php
// app/Http/Middleware/AdminMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminMiddleware
{
    /**
     * ✅ CORRECTION : Middleware unifié avec debug intégré
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Vérification admin existante
            if (!Auth::check() || !Auth::user()->is_admin) {
                Log::warning('Tentative d\'accès admin non autorisé', [
                    'user_id' => Auth::id(),
                    'ip' => $request->ip(),
                    'url' => $request->fullUrl(),
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Accès non autorisé'
                ], 403);
            }

            return $next($request);

        } catch (\Exception $e) {
            // ✅ AJOUT : Debug intégré pour les erreurs admin/Filament
            Log::error('AdminMiddleware Error: ' . $e->getMessage(), [
                'url' => $request->fullUrl(),
                'user_id' => Auth::id(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
