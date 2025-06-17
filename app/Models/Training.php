<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Training extends Model
{
    use HasFactory; // SoftDeletes;

   // protected $dates = ['deleted_at'];

     protected $fillable = [
        'title', 
        'slug', 
        'description', 
        'price', 
        'image'
    ];

    public function carts()
{
    return $this->belongsToMany(Cart::class, 'cart_training');
}

}

