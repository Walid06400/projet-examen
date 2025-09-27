<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'image',
        'status',
        'published_at',
        'is_featured'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // SCOPE pour les articles publiés
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    // SCOPE pour les articles à la une
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // RELATIONS SÉCURISÉES
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    // ACCESSEUR SÉCURISÉ pour l'URL de l'image
    public function getImageUrlAttribute(): string
    {
        if ($this->image && Storage::disk('public')->exists($this->image)) {
            return Storage::url($this->image);
        }
        return '/images/default-article.jpg';
    }

    // ACCESSEUR pour compter les commentaires
    public function getCommentsCountAttribute(): int
    {
        return $this->comments()->count();
    }

    // ACCESSEUR pour l'extrait automatique
    public function getExcerptAttribute($value): string
    {
        if ($value) {
            return $value;
        }
        return Str::limit(strip_tags($this->content ?? ''), 200);
    }

    // MUTATEUR pour générer le slug automatiquement
    public function setTitleAttribute($value): void
    {
        $this->attributes['title'] = $value;
        if (empty($this->attributes['slug'])) {
            $this->attributes['slug'] = Str::slug($value);
        }
    }

    // MUTATEUR pour le slug
    public function setSlugAttribute($value): void
    {
        $this->attributes['slug'] = Str::slug($value);
    }

    // ACCESSEUR pour l'URL de l'article
    public function getUrlAttribute(): string
    {
        return route('blog.show', $this->slug);
    }

    // ACCESSEUR pour la description courte
    public function getShortDescriptionAttribute(): string
    {
        return Str::limit(strip_tags($this->content ?? ''), 100);
    }
}
