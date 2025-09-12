<?php
// database/seeders/ArticleSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        // Créer des catégories si elles n'existent pas
        $categories = [
            ['name' => 'Production MAO', 'slug' => 'production-mao', 'type' => 'article'],
            ['name' => 'Mixage', 'slug' => 'mixage', 'type' => 'article'],
            ['name' => 'Mastering', 'slug' => 'mastering', 'type' => 'article'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }

        // Récupérer un utilisateur admin ou créer
        $user = User::first() ?? User::factory()->create([
            'name' => 'Admin MAOlogie',
            'email' => 'admin@maologie.com',
            'is_admin' => true,
        ]);

        // Créer des articles
        $articles = [
            [
                'title' => 'Débuter en production MAO',
                'slug' => 'debuter-en-production-mao',
                'content' => '<p>La production MAO (Musique Assistée par Ordinateur) est devenue accessible à tous. Dans cet article, nous vous guidons pour commencer votre aventure musicale.</p><p>Découvrez les logiciels essentiels, le matériel de base et les premières techniques à maîtriser pour créer vos premières compositions.</p>',
                'excerpt' => 'Guide complet pour débuter en production musicale assistée par ordinateur',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'is_featured' => true,
                'category_id' => Category::where('slug', 'production-mao')->first()->id,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Techniques de mixage avancées',
                'slug' => 'techniques-mixage-avancees',
                'content' => '<p>Le mixage est un art qui demande technique et créativité. Apprenez les techniques professionnelles pour donner vie à vos productions.</p><p>EQ, compression, reverb, delay... Maîtrisez tous les outils pour un mixage professionnel.</p>',
                'excerpt' => 'Maîtrisez les techniques de mixage pour des productions professionnelles',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'is_featured' => false,
                'category_id' => Category::where('slug', 'mixage')->first()->id,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Le mastering moderne',
                'slug' => 'mastering-moderne',
                'content' => '<p>Le mastering est la dernière étape cruciale de votre production. Découvrez les secrets du mastering moderne.</p><p>Loudness, dynamique, equalisation... Tous les aspects du mastering professionnel.</p>',
                'excerpt' => 'Les secrets du mastering professionnel pour finaliser vos productions',
                'status' => 'published',
                'published_at' => now(),
                'is_featured' => true,
                'category_id' => Category::where('slug', 'mastering')->first()->id,
                'user_id' => $user->id,
            ],
        ];

        foreach ($articles as $articleData) {
            Article::firstOrCreate(['slug' => $articleData['slug']], $articleData);
        }
    }
}
