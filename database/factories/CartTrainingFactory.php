<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartTrainingFactory extends Factory
{
    public function definition()
    {
        return [
            'cart_id' => Cart::factory(),
            'training_id' => Training::factory(),
        ];
    }
}
