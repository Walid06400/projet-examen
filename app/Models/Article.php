<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Article extends Model
{
    use HasFactory; //SoftDeletes;

  //  protected $dates = ['deleted_at'];
    protected $fillable = [
        'category_id', 
        'title', 
        'slug', 
        'content', 
        'image'
    ];
 public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

