<?php
// database/seeders/CategorySeeder.php - VERSION FINALE MAOlogie DWWM

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // 🎯 RESET COMPLET - Suppression de toutes les catégories existantes
        Category::truncate();

        // 🎵 CATÉGORIES MAO SPÉCIALISÉES (suppression totale des formations)
        $categories = [
            [
                'name' => 'Production Musicale',
                'slug' => 'production-musicale',
                'type' => 'article', // UNIQUEMENT article, plus de training
                'description' => 'Techniques de composition, arrangement et création musicale assistée par ordinateur',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mixage Audio',
                'slug' => 'mixage-audio',
                'type' => 'article',
                'description' => 'Art du mixage : balance, spatialisation, effets et traitement sonore professionnel',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mastering',
                'slug' => 'mastering',
                'type' => 'article',
                'description' => 'Finalisation audio : égalisation, compression, limitation et standards de diffusion',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Matériel & Hardware',
                'slug' => 'materiel-hardware',
                'type' => 'article',
                'description' => 'Reviews, guides d\'achat et tests de matériel audio professionnel et home studio',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Plugins & Software',
                'slug' => 'plugins-software',
                'type' => 'article',
                'description' => 'Tests et tutoriels des logiciels, DAW, plugins VST et outils de production musicale',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Actualités MAO',
                'slug' => 'actualites-mao',
                'type' => 'article',
                'description' => 'News, sorties et tendances de l\'industrie musicale et de la production audio',
                'image' => '/images/articles/guide-debuter-mao.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Création des catégories
        foreach ($categories as $category) {
            Category::create($category);
        }

        $this->command->info('✅ ' . count($categories) . ' catégories MAO créées avec succès !');
        $this->command->warn('🚫 Toutes les références aux formations ont été supprimées');
    }
}
