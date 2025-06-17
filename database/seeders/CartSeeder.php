<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use App\Models\Training;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        
        foreach ($users as $user) {
            // Créer un panier pour chaque utilisateur
            $cart = Cart::create(['user_id' => $user->id]);
            
            // Ajouter 1 à 3 formations aléatoires
            $trainings = Training::inRandomOrder()->take(rand(1, 3))->get();
            
            // Utiliser la relation Eloquent au lieu de DB::table
            $cart->trainings()->attach($trainings->pluck('id'));
        }
    }
}
