<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Intervention\Image\ImageManagerStatic as Image;  // ✔️ Import correct v3
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'bio'      => 'nullable|string|max:1000',
                'location' => 'nullable|string|max:255',
            ]);

            /** @var User $user */
            $user = Auth::user();
            $user->fill($validated);  // ✔️ fill() existe
            $user->save();           // ✔️ save() existe

            return back()->with('success', 'Profil mis à jour.');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->with('error','Erreur de validation.');
        } catch (\Exception $e) {
            Log::error('Profil update error: '.$e->getMessage());
            return back()->with('error','Erreur lors de la mise à jour.');
        }
    }

    public function updateAvatar(Request $request): RedirectResponse
    {
        try {
            $request->validate(['avatar'=>'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120']);

            $user = Auth::user();
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $file     = $request->file('avatar');
            $filename = time().'_'.$user->id.'.jpg';
            $path     = 'avatars/'.$filename;

            $image = Image::make($file->getRealPath())
                ->fit(300,300,fn($c)=>$c->upsize())
                ->encode('jpg',80);

            Storage::disk('public')->put($path, $image->stream());

            $user->avatar = $path;
            $user->save();

            return back()->with('success','Avatar mis à jour !');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->with('error','Fichier invalide.');
        } catch (\Exception $e) {
            Log::error('Avatar upload error: '.$e->getMessage());
            return back()->with('error','Erreur upload avatar.');
        }
    }

    public function destroy(Request $request): RedirectResponse
    {
        try {
            $request->validate(['password'=>'required|current_password']);
            $user = $request->user();
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            Auth::logout();
            $user->delete();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/')->with('success','Compte supprimé.');
        } catch (\Exception $e) {
            Log::error('Account delete error: '.$e->getMessage());
            return back()->with('error','Erreur suppression compte.');
        }
    }
}
