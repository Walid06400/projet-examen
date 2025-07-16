<?php
// app/Models/Training.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Training extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'price',
        'level',
        'subject',
        'duration',
        'image',
        'badge',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'duration' => 'integer',
    ];

    // ✅ L'accesseur utilisé pour afficher l'image
    public function getImageUrlAttribute(): string
    {
        return $this->image
            ? Storage::url($this->image)
            : '/images/default-training.jpg';
    }

    // ✅ Génération automatique du slug (si vide)
    protected static function booted()
    {
        static::creating(function ($training) {
            if (!$training->slug) {
                $training->slug = Str::slug($training->title);
            }
        });
    }

    // ✅ 🔧 Ajoute enfin ce scope :
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
