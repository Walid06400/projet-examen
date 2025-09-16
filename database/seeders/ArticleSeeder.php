<?php
// database/seeders/ArticleSeeder.php - VERSION FINALE MAOlogie DWWM

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        // 🎯 RESET COMPLET - Suppression articles existants
        Article::truncate();

        // Récupération des catégories et users
        $categories = Category::where('type', 'article')->pluck('id', 'slug')->toArray();
        $users      = User::pluck('id', 'name')->toArray();

        $articles = [
            // 🎵 PRODUCTION MUSICALE
            [
                'title'        => 'Guide complet pour débuter en production MAO',
                'slug'         => 'guide-debuter-production-mao',
                'excerpt'      => 'Tout ce qu\'il faut savoir pour commencer la production musicale assistée par ordinateur : logiciels, matériel, techniques de base.',
                'content'      => '<h2>Introduction à la MAO</h2>
<p>La <strong>Musique Assistée par Ordinateur</strong> (MAO) a démocratisé la création musicale...</p>',
                'category_id'  => $categories['production-musicale']   ?? reset($categories),
                'user_id'      => $users['DJ ProducerMax']             ?? reset($users),
                'status'       => 'published',
                'is_featured'  => true,
                'published_at' => now()->subDays(7),
                'created_at'   => now()->subDays(7),
                'updated_at'   => now()->subDays(7),
            ],
            [
                'title'        => 'Créer ses premiers beats trap et hip-hop',
                'slug'         => 'creer-beats-trap-hip-hop',
                'excerpt'      => 'Techniques et astuces pour produire des beats trap et hip-hop modernes...',
                'content'      => '<h2>L\'univers trap et hip-hop</h2><p>Le trap et le hip-hop dominent les charts mondiaux...</p>',
                'category_id'  => $categories['production-musicale']   ?? reset($categories),
                'user_id'      => $users['BeatMaker Sarah']           ?? reset($users),
                'status'       => 'published',
                'is_featured'  => true,
                'published_at' => now()->subDays(14),
                'created_at'   => now()->subDays(14),
                'updated_at'   => now()->subDays(14),
            ],
            // 🎚️ MIXAGE AUDIO
            [
                'title'        => 'Les fondamentaux du mixage moderne',
                'slug'         => 'fondamentaux-mixage-moderne',
                'excerpt'      => 'Maîtrisez les bases du mixage : égalisation, compression, réverbération...',
                'content'      => '<h2>Les bases du mixage moderne</h2><p>Le mixage est l\'art de combiner tous les éléments...</p>',
                'category_id'  => $categories['mixage-audio']         ?? reset($categories),
                'user_id'      => $users['Alex Mixmaster']           ?? reset($users),
                'status'       => 'published',
                'is_featured'  => true,
                'published_at' => now()->subDays(10),
                'created_at'   => now()->subDays(10),
                'updated_at'   => now()->subDays(10),
            ],
            // 🎛️ MASTERING
            [
                'title'        => 'Mastering pour le streaming : Spotify, Apple Music',
                'slug'         => 'mastering-streaming-spotify-apple-music',
                'excerpt'      => 'Adaptez vos masters aux plateformes de streaming : LUFS, dynamic range...',
                'content'      => '<h2>Mastering pour le streaming</h2><p>Le mastering moderne doit s\'adapter...</p>',
                'category_id'  => $categories['mastering']            ?? reset($categories),
                'user_id'      => $users['Studio Mastering Pro']      ?? reset($users),
                'status'       => 'published',
                'is_featured'  => true,
                'published_at' => now()->subDays(5),
                'created_at'   => now()->subDays(5),
                'updated_at'   => now()->subDays(5),
            ],
            // 🔧 MATÉRIEL & HARDWARE
            [
                'title'        => 'Test : Native Instruments Maschine MK3',
                'slug'         => 'test-native-instruments-maschine-mk3',
                'excerpt'      => 'Review complète de la groovebox Maschine MK3 : interface, sons, workflow...',
                'content'      => '<h2>Test : Native Instruments Maschine MK3</h2><p>La Maschine MK3 de Native Instruments s\'impose...</p>',
                'category_id'  => $categories['materiel-hardware']    ?? reset($categories),
                'user_id'      => $users['GearReviewer']              ?? reset($users),
                'status'       => 'published',
                'is_featured'  => false,
                'published_at' => now()->subDays(8),
                'created_at'   => now()->subDays(8),
                'updated_at'   => now()->subDays(8),
            ],
            // 🖥️ PLUGINS & SOFTWARE
            [
                'title'        => 'Ableton Live 12 : nouveautés et workflow',
                'slug'         => 'ableton-live-12-nouveautes-workflow',
                'excerpt'      => 'Découvrez les nouveautés d\'Ableton Live 12 : nouveaux instruments, effets...',
                'content'      => '<h2>Ableton Live 12 : révolution ou évolution ?</h2><p>Ableton vient de dévoiler...</p>',
                'category_id'  => $categories['plugins-software']      ?? reset($categories),
                'user_id'      => $users['DJ ProducerMax']            ?? reset($users),
                'status'       => 'published',
                'is_featured'  => true,
                'published_at' => now()->subDays(3),
                'created_at'   => now()->subDays(3),
                'updated_at'   => now()->subDays(3),
            ],
            // 📰 ACTUALITÉS MAO
            [
                'title'        => 'NAMM 2024 : les annonces qui marquent',
                'slug'         => 'namm-2024-annonces-marquantes',
                'excerpt'      => 'Résumé des principales annonces du NAMM Show 2024 : nouveaux synthés...',
                'content'      => '<h2>NAMM 2024 : le récap des annonces phares</h2><p>Le NAMM Show 2024...</p>',
                'category_id'  => $categories['actualites-mao']       ?? reset($categories),
                'user_id'      => $users['Admin MAOlogie']           ?? reset($users),
                'status'       => 'published',
                'is_featured'  => false,
                'published_at' => now()->subDays(1),
                'created_at'   => now()->subDays(1),
                'updated_at'   => now()->subDays(1),
            ],
        ];

        foreach ($articles as $articleData) {
            Article::create($articleData);
        }

        $this->command->info('✅ ' . count($articles) . ' articles MAO créés avec succès !');
        $featuredCount = collect($articles)->where('is_featured', true)->count();
        $this->command->info("📌 {$featuredCount} articles mis en avant sur la page d'accueil");
    }
}
