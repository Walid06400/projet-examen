<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
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

    // ✅ MÉTHODE UNIFIÉE – Gère profil + avatar, avec redirection Inertia
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

            // Gestion de l'avatar si fourni
            if ($request->hasFile('avatar')) {
                if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                    Storage::disk('public')->delete($user->avatar);
                }
                $path = $request->file('avatar')->store('avatars', 'public');
                $user->avatar = $path;
            }

            $user->save();

            // Redirection Inertia pour rafraîchir auth.user
            return Inertia::redirectRoute('dashboard')
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

    // Méthode séparée pour l’avatar si besoin
    public function updateAvatar(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            ]);

            /** @var User $user */
            $user = Auth::user();
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
            $user->save();

            return Inertia::redirectRoute('settings.profile.edit')
                ->with('success', 'Avatar mis à jour !');
        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->with('error', 'Fichier invalide.');
        } catch (\Exception $e) {
            Log::error('Avatar upload error: ' . $e->getMessage());
            return back()
                ->with('error', 'Erreur upload avatar.');
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

        return redirect('/')
            ->with('success', 'Compte supprimé.');
    }
}
