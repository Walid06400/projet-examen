<?php

namespace Database\Seeders;

// database/seeders/TrainingSeeder.php
use App\Models\Training;
use App\Models\Category;
use Illuminate\Database\Seeder;

class TrainingSeeder extends Seeder
{
    public function run()
    {
        Training::factory()
            ->count(5)
            ->create([
                'category_id' => Category::where('type', 'training')->first()->id,
                'price' => rand(49, 199)
            ]);
    }
}
