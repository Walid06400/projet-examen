<?php
// app/Models/Category.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'slug',
        'description',
        'image',
        'color',
    ];

    protected $appends = ['image_url'];

    /**
     * ✅ CORRECTION : Accesseur sécurisé pour l'image
     */
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return $this->getDefaultImageAttribute();
        }

        // Vérifier si le fichier existe
        if (Storage::disk('public')->exists($this->image)) {
            return asset('storage/' . $this->image);
        }

        // Fallback vers image par défaut
        return $this->getDefaultImageAttribute();
    }

    /**
     * Image par défaut pour les catégories
     */
    public function getDefaultImageAttribute(): string
    {
        return "https://ui-avatars.com/api/?name=" . urlencode($this->name ?? 'Category') . "&color=7c3aed&background=ede9fe&size=400";
    }

    /**
     * Relations
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    /**
     * Mutateur pour générer le slug automatiquement
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }
}
