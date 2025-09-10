<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Storage;
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
        'status',
        'avatar',
        'bio',
        'location',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = [
        'avatar_url',
        'default_avatar',
    ];

    /**
     * ✅ RELATION - Articles écrits par l'utilisateur (si admin)
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
     * ✅ ACCESSEUR - URL complète de l'avatar avec vérification d'existence
     */
    public function getAvatarUrlAttribute(): string
    {
        // Vérifier si l'avatar existe dans le stockage
        if ($this->avatar && Storage::disk('public')->exists($this->avatar)) {
            return asset('storage/' . $this->avatar);
        }

        // Retourner l'avatar par défaut
        return $this->getDefaultAvatarAttribute();
    }

    /**
     * ✅ ACCESSEUR - Avatar par défaut avec initiales (UI Avatars)
     */
    public function getDefaultAvatarAttribute(): string
    {
        return "https://ui-avatars.com/api/" . http_build_query([
            'name' => $this->name,
            'color' => '7c3aed',
            'background' => 'ede9fe',
            'size' => '300',
            'font-size' => '0.33',
            'rounded' => 'true',
            'bold' => 'true',
        ]);
    }

    /**
     * ✅ ACCESSEUR - Initiales pour les avatars
     */
    public function getInitialsAttribute(): string
    {
        $words = explode(' ', trim($this->name));
        if (count($words) >= 2) {
            return strtoupper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
        }
        return strtoupper(substr($this->name, 0, 2));
    }

    /**
     * ✅ Accès au panel Filament (admins uniquement)
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->is_admin ?? false;
    }

    /**
     * ✅ Vérifier si l'utilisateur est administrateur
     */
    public function isAdmin(): bool
    {
        return $this->is_admin === true;
    }
}
