<?php
// app/Models/User.php - Version optimisée MAOlogie

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
        'location',
        'website',
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

    // 🎯 Rendre avatar_url disponible automatiquement
    protected $appends = [
        'avatar_url',
    ];

    /**
     * 📄 Relation : articles rédigés
     */
    public function articles(): HasMany
    {
        return $this->hasMany(\App\Models\Article::class);
    }

    /**
     * 💬 Relation : commentaires postés
     */
    public function comments(): HasMany
    {
        return $this->hasMany(\App\Models\Comment::class);
    }

    /**
     * 🖼️ Accessor : URL complète de l'avatar ou fallback
     */
   public function getAvatarUrlAttribute(): string
{
    if ($this->avatar && Storage::exists($this->avatar)) {
        return Storage::url($this->avatar);
    }

    // Fallback initiales
    return $this->getDefaultAvatarAttribute();
}


    /**
     * 🎨 Accessor : avatar par défaut (initiales via ui-avatars.com)
     */
    public function getDefaultAvatarAttribute(): string
    {
        $name = urlencode($this->name ?? 'U');
        return "https://ui-avatars.com/api/?name={$name}"
             . "&color=7c3aed&background=ede9fe&size=300";
    }

    /**
     * 🔐 Autorisation Filament
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return (bool) $this->is_admin;
    }
}
