<?php
// app/Models/User.php - Version optimisée

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'avatar',
        'bio',
        'location'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
    ];

    // 🎯 IMPORTANT : Ajouter avatar_url aux attributs automatiquement disponibles
    protected $appends = [
        'avatar_url',
    ];

    /**
     * ✅ RELATION - Articles écrits par l'utilisateur
     */
    public function articles(): HasMany
    {
        return $this->hasMany(\App\Models\Article::class);
    }

    /**
     * ✅ RELATION - Commentaires postés par l'utilisateur
     */
    public function comments(): HasMany
    {
        return $this->hasMany(\App\Models\Comment::class);
    }

    /**
     * ✅ ACCESSEUR pour URL complet de l'avatar
     * EXPLICATION : Un accesseur Laravel transforme automatiquement les données
     * Ici, on convertit le chemin de fichier en URL complète accessible par le navigateur
     */
    public function getAvatarUrlAttribute(): string
    {
        // Si l'utilisateur a un avatar uploadé ET que le fichier existe
        if ($this->avatar && Storage::disk('public')->exists($this->avatar)) {
            return asset('storage/' . $this->avatar);
        }

        // Sinon, retourner l'avatar par défaut avec initiales
        return $this->getDefaultAvatarAttribute();
    }

    /**
     * ✅ ACCESSEUR pour avatar par défaut avec initiales
     * EXPLICATION : Utilise un service externe (ui-avatars.com) pour générer
     * un avatar avec les initiales si pas d'image uploadée
     */
    public function getDefaultAvatarAttribute(): string
    {
        return "https://ui-avatars.com/api/?name=" . urlencode($this->name) .
            "&color=7c3aed&background=ede9fe&size=300";
    }

    /**
     * Accès admin Filament
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->is_admin ?? false;
    }
}
