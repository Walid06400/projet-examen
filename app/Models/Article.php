<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    

   
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'content',
        'image',
    ];

    // Relation avec la catégorie
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    
    // app/Models/Article.php
    public function getImageUrlAttribute()
    {
             return $this->image
            ? Storage::url($this->image)           // => /storage/articles/xyz.webp
            : '/images/default-article.jpg';
    }
        
        // Accesseur pour l'extrait
        public function getExcerptAttribute()
        {
            return Str::limit(strip_tags($this->content), 150);
        }
    }




