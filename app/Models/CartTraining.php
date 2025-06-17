<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartTraining extends Model
{
    use HasFactory;

    protected $table = 'cart_trainings'; // Forcer le nom de table
    protected $fillable = ['cart_id', 'training_id'];
    public $timestamps = false; // Table pivot sans timestamps

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
