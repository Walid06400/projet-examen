<?php

namespace Database\Seeders;
// database/seeders/CategorySeeder.php
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class CategorySeeder extends Seeder
{
    public function run()
{
    $categories = [
        [
            'name' => 'Mixage', 
            'type' => 'training',
            'slug' => Str::slug('Mixage') // Génère "mixage"
        ],
        [
            'name' => 'Mastering', 
            'type' => 'training',
            'slug' => Str::slug('Mastering') // Génère "mastering"
        ],
        [
            'name' => 'Sound Design', 
            'type' => 'blog',
            'slug' => Str::slug('Sound Design') // Génère "sound-design"
        ]
    ];

    foreach ($categories as $category) {
        Category::create($category);
    }
}
}