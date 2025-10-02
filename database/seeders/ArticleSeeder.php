<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer les utilisateurs et catégories existants
        $users = User::all();
        $categories = Category::where('type', 'article')->get();

        // Vérifier qu'on a des données de base
        if ($users->isEmpty() || $categories->isEmpty()) {
            $this->command->error('Veuillez d\'abord exécuter UserSeeder et CategorySeeder');
            return;
        }

        // Articles pour le blog MAOlogie
        $articles = [
            [
                'title' => 'Guide complet : Débuter en MAO avec un budget limité',
                'excerpt' => 'Découvrez comment commencer la production musicale sans vous ruiner. Tous les outils essentiels pour débuter.',
                'content' => '<h2>Introduction à la MAO</h2><p>La Musique Assistée par Ordinateur (MAO) est devenue accessible à tous. Dans ce guide, nous allons voir comment débuter avec un budget serré.</p><h3>Matériel essentiel</h3><p>Un ordinateur portable récent, une interface audio USB et un casque de qualité suffisent pour commencer. Privilégiez la qualité à la quantité.</p><h3>Logiciels recommandés</h3><p>Reaper, FL Studio ou Logic Pro X sont d\'excellents choix pour débuter. Chacun a ses avantages selon votre style musical.</p>',
                'category' => 'guides-mao',
                'image' => '/images/articles/guide-debuter-mao.jpg'
            ],
            [
                'title' => 'Les 10 plugins indispensables pour le mixage',
                'excerpt' => 'Une sélection des plugins essentiels qui transformeront vos mixages, du gratuit au professionnel.',
                'content' => '<h2>Plugins gratuits incontournables</h2><p>Commençons par les outils gratuits qui rivalisent avec les solutions payantes.</p><h3>1. TDR Nova - EQ dynamique</h3><p>Un égaliseur dynamique exceptionnellement puissant et totalement gratuit.</p><h3>2. Valhalla Supermassive</h3><p>Des reverbs et delays spatiaux impressionnants pour créer de la profondeur.</p>',
                'category' => 'plugins-software',
                'image' => '/images/articles/plugins-mixage.jpg'
            ],
            [
                'title' => 'Maîtriser les bases du mastering en home studio',
                'excerpt' => 'Apprenez les techniques fondamentales du mastering pour donner une finition professionnelle à vos productions.',
                'content' => '<h2>Qu\'est-ce que le mastering ?</h2><p>Le mastering est la dernière étape de production qui donne cohérence et puissance à votre musique.</p><h3>La chaîne de mastering type</h3><p>EQ correctif → Compression → EQ musical → Limiteur → Mesures</p><p>Chaque étape a son importance et doit être abordée avec précision.</p>',
                'category' => 'mastering',
                'image' => '/images/articles/mastering-home-studio.jpg'
            ],
            [
                'title' => 'Choisir son interface audio : guide d\'achat 2024',
                'excerpt' => 'Comparatif des meilleures interfaces audio pour tous budgets. Focusrite, PreSonus, RME et plus encore.',
                'content' => '<h2>Critères de choix</h2><p>Le nombre d\'entrées, la qualité des préamplis et la latence sont les critères principaux.</p><h3>Budget entrée de gamme (100-200€)</h3><p>Focusrite Scarlett Solo ou 2i2, PreSonus AudioBox USB 96</p><h3>Budget intermédiaire (200-500€)</h3><p>Focusrite Scarlett 4i4, PreSonus Studio 24c, Zoom PodTrak P4</p>',
                'category' => 'materiel-hardware',
                'image' => '/images/articles/interface-audio-guide.jpg'
            ],
            [
                'title' => 'Les tendances de production musicale en 2024',
                'excerpt' => 'Découvrez les nouvelles tendances qui marquent la production musicale cette année.',
                'content' => '<h2>L\'IA dans la production</h2><p>Les outils d\'intelligence artificielle révolutionnent la création musicale.</p><h3>Spatial Audio et Dolby Atmos</h3><p>Le son 3D devient la norme sur les plateformes de streaming.</p><h3>Lo-Fi et production minimaliste</h3><p>Retour aux sources avec des productions épurées et chaleureuses.</p>',
                'category' => 'actualites-mao',
                'image' => '/images/articles/tendances-2024.jpg'
            ],
            [
                'title' => 'Créer des beats trap modernes : techniques avancées',
                'excerpt' => 'Plongez dans l\'univers de la trap avec des techniques de production utilisées par les professionnels.',
                'content' => '<h2>Les éléments clés de la trap</h2><p>808 percutantes, hi-hats rapides et mélodies sombres caractérisent ce style.</p><h3>Programmation des 808</h3><p>Utilisez la distorsion et la saturation pour donner du caractère à vos basses.</p><h3>Pattern de hi-hats</h3><p>Les rolls et les variations rythmiques créent l\'énergie du morceau.</p>',
                'category' => 'production-musicale',
                'image' => '/images/articles/beats-trap.jpg'
            ],
            [
                'title' => 'Optimiser son home studio : acoustique et traitement',
                'excerpt' => 'Améliorez l\'acoustique de votre espace de travail sans vous ruiner. Conseils pratiques et solutions DIY.',
                'content' => '<h2>Analyse de votre pièce</h2><p>Chaque pièce a ses défauts acoustiques qu\'il faut identifier avant de traiter.</p><h3>Solutions budget</h3><p>Couvertures, tapis et meubles peuvent considérablement améliorer votre acoustique.</p><h3>Traitements professionnels</h3><p>Panneaux absorbants, bass traps et diffuseurs pour un résultat optimal.</p>',
                'category' => 'home-studio',
                'image' => '/images/articles/acoustique-studio.jpg'
            ],
            [
                'title' => 'Les secrets du mixage vocal professionnel',
                'excerpt' => 'Techniques et astuces pour obtenir des voix claires, présentes et émotionnelles dans vos mixages.',
                'content' => '<h2>Préparation de la prise</h2><p>Un bon mixage commence par une bonne prise. Micro, préampli et environnement sont cruciaux.</p><h3>Chaîne de traitement vocal</h3><p>EQ → De-esser → Compresseur → EQ → Reverb → Delay</p><h3>Automation et rides</h3><p>L\'automation est la clé pour donner vie et émotion à vos voix.</p>',
                'category' => 'mixage-audio',
                'image' => '/images/articles/mixage-vocal.jpg'
            ]
        ];

        // Créer les articles
        foreach ($articles as $articleData) {
            // Trouver la catégorie
            $category = $categories->where('slug', $articleData['category'])->first();
            if (!$category) {
                $category = $categories->first(); // Fallback
            }

            Article::create([
                'title' => $articleData['title'],
                'slug' => Str::slug($articleData['title']),
                'excerpt' => $articleData['excerpt'],
                'content' => $articleData['content'],
                'image' => $articleData['image'],
                'status' => 'published',
                'category_id' => $category->id,
                'user_id' => $users->random()->id,
                'published_at' => Carbon::now()->subDays(fake()->numberBetween(1, 30)),
                'created_at' => Carbon::now()->subDays(fake()->numberBetween(1, 60)),
                'updated_at' => Carbon::now()->subDays(fake()->numberBetween(0, 10)),
            ]);
        }

        // Créer quelques articles supplémentaires aléatoires
        $additionalTitles = [
            'Sampling créatif : transformer vos échantillons',
            'Les erreurs communes en production electronic',
            'Monétiser sa musique : streaming vs ventes',
            'Histoire des synthétiseurs analogiques',
            'Collaboration musicale à distance : outils et méthodes'
        ];

        foreach ($additionalTitles as $title) {
            Article::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'content' => '<p>Contenu détaillé de l\'article ' . $title . '</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
                'image' => '/images/articles/default-' . Str::slug($title) . '.jpg',
                'status' => fake()->randomElement(['published', 'draft']),
                'category_id' => $categories->random()->id,
                'user_id' => $users->random()->id,
                'published_at' => fake()->dateTimeBetween('-2 months', 'now'),
                'created_at' => fake()->dateTimeBetween('-3 months', '-1 month'),
                'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
            ]);
        }

        $this->command->info('Articles créés avec succès !');
        $this->command->info('Total : ' . Article::count() . ' articles');
        $this->command->info('Publiés : ' . Article::where('status', 'published')->count() . ' articles');
    }
}
