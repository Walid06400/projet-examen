<?php

namespace Database\Seeders;

// database/seeders/ArticleSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        Article::factory()
            ->count(10)
            ->create();
    }
}
