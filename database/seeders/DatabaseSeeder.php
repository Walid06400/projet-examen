<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,    // 1. Créer les utilisateurs d'abord
            CategorySeeder::class,     // 2. Créer les catégories
            ArticleSeeder::class,      // 3. Créer les articles (dépend des catégories)
            TrainingSeeder::class,     // 4. Créer les formations
            ForumSeeder::class,        // 5. Créer les sujets et posts du forum
            CartSeeder::class,         // 6. Créer les paniers avec formations
        ]);
    }
}
