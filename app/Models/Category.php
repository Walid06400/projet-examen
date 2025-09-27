<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'image'
        // SUPPRIMÉ : 'color' - plus de champ color
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // RELATION avec les articles
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }

    // SCOPE pour les catégories d'articles
    public function scopeArticleType($query)
    {
        return $query->where('type', 'article');
    }

    // SCOPE pour les catégories avec articles publiés
    public function scopeWithPublishedArticles($query)
    {
        return $query->whereHas('articles', function ($q) {
            $q->where('status', 'published');
        });
    }

    // ACCESSEUR pour l'image de la catégorie
    public function getImageUrlAttribute(): string
    {
        if ($this->image && Storage::disk('public')->exists($this->image)) {
            return Storage::url($this->image);
        }

        // Image par défaut basée sur le nom de la catégorie
        $name = urlencode($this->name ?? 'Catégorie');
        return "https://ui-avatars.com/api/?name={$name}&color=7c3aed&background=ede9fe&size=400";
    }

    // MUTATEUR pour générer le slug automatiquement
    public function setNameAttribute($value): void
    {
        $this->attributes['name'] = $value;
        if (empty($this->attributes['slug'])) {
            $this->attributes['slug'] = Str::slug($value);
        }
    }

    // MUTATEUR pour le slug
    public function setSlugAttribute($value): void
    {
        $this->attributes['slug'] = Str::slug($value);
    }

    // ACCESSEUR pour l'URL de la catégorie
    public function getUrlAttribute(): string
    {
        return route('blog.category', $this->slug);
    }

    // ACCESSEUR pour le nombre d'articles publiés
    public function getPublishedArticlesCountAttribute(): int
    {
        return $this->articles()->where('status', 'published')->count();
    }
}
