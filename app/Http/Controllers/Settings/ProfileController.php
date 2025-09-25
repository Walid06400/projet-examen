<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Afficher la page d'édition du profil
     */
    public function edit(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Settings/Profile', [
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
        ]);
    }

    /**
     * ✅ CORRECTION : Méthode update cohérente
     */
    public function update(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'bio' => 'nullable|string|max:1000',
                'location' => 'nullable|string|max:255',
                'website' => 'nullable|url|max:255',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            ]);

            $user = $request->user();

            // Mise à jour des champs texte
            $user->fill([
                'name' => $validated['name'],
                'bio' => $validated['bio'] ?? null,
                'location' => $validated['location'] ?? null,
                'website' => $validated['website'] ?? null,
            ]);

            // Gestion de l'avatar
            if ($request->hasFile('avatar')) {
                if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $path = $request->file('avatar')->store('avatars', 'public');
                $user->avatar = $path;
            }

            $user->save();

            // ✅ CORRECTION : Redirection vers le dashboard pour rafraîchir
            return redirect()->route('dashboard')
                ->with('success', 'Profil mis à jour avec succès !');

        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->with('error', 'Erreur de validation.');
        } catch (\Exception $e) {
            Log::error('Profile update error: ' . $e->getMessage());
            return back()
                ->with('error', 'Erreur lors de la mise à jour du profil.');
        }
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => 'required|current_password']);

        $user = $request->user();
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Compte supprimé.');
    }
}
