<?php
// database/seeders/CommentSeeder.php - VERSION FINALE MAOlogie DWWM

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        // 🎯 RESET COMPLET - Suppression commentaires existants
        Comment::truncate();

        $articles = Article::pluck('id', 'slug')->toArray();
        $users = User::pluck('id', 'name')->toArray();

        $comments = [
            // 💬 COMMENTAIRES ARTICLE : "Guide complet pour débuter en production MAO"
            [
                'article_id' => $articles['guide-debuter-production-mao'] ?? 1,
                'user_id' => $users['Thomas Newbie'] ?? 2,
                'parent_id' => null,
                'content' => 'Merci pour ce guide ! Je débute complètement en MAO et c\'est exactement ce que je cherchais. Une question : entre FL Studio et Ableton Live, lequel conseillez-vous pour débuter ? J\'hésite vraiment entre les deux...',
                'created_at' => now()->subDays(6),
                'updated_at' => now()->subDays(6),
            ],
            [
                'article_id' => $articles['guide-debuter-production-mao'] ?? 1,
                'user_id' => $users['DJ ProducerMax'] ?? 1,
                'parent_id' => 1, // Réponse au commentaire précédent
                'content' => '@Thomas Pour débuter, je recommande FL Studio sans hésiter ! L\'interface est plus intuitive, le workflow est excellent pour l\'électronique, et la communauté française est très active. Ableton est top aussi mais plus complexe au début. Tu feras tes premiers tracks plus rapidement avec FL.',
                'created_at' => now()->subDays(6)->addHours(2),
                'updated_at' => now()->subDays(6)->addHours(2),
            ],
            [
                'article_id' => $articles['guide-debuter-production-mao'] ?? 1,
                'user_id' => $users['BeatMaker Sarah'] ?? 2,
                'parent_id' => 1,
                'content' => 'Perso je suis team Ableton depuis 8 ans ! Oui c\'est plus dur au début, mais une fois maîtrisé, c\'est juste magique. Le mode Session est révolutionnaire pour l\'impro et les performances live. Et les Max for Live devices ouvrent un monde infini de possibilités créatives.',
                'created_at' => now()->subDays(5)->addHours(10),
                'updated_at' => now()->subDays(5)->addHours(10),
            ],

            // 💬 COMMENTAIRES ARTICLE : "Créer ses premiers beats trap et hip-hop"
            [
                'article_id' => $articles['creer-beats-trap-hip-hop'] ?? 2,
                'user_id' => $users['Thomas Newbie'] ?? 2,
                'parent_id' => null,
                'content' => 'Excellent tuto Sarah ! J\'ai suivi tes conseils pour les hi-hats et ça change tout. Par contre j\'ai du mal avec les 808... Ils sonnent toujours étouffés chez moi. Tu as des tips pour qu\'ils claquent bien ?',
                'created_at' => now()->subDays(13),
                'updated_at' => now()->subDays(13),
            ],
            [
                'article_id' => $articles['creer-beats-trap-hip-hop'] ?? 2,
                'user_id' => $users['BeatMaker Sarah'] ?? 2,
                'parent_id' => 4,
                'content' => 'Salut Thomas ! Pour les 808 qui claquent : 1) Vérifie que tu n\'as pas trop de graves ailleurs qui masquent, 2) Ajoute une légère saturation/distortion, 3) Compresse avec un attack lent pour garder le punch initial, 4) EQ : boost léger vers 60Hz et coupe vers 200-400Hz. Et surtout, accorde-les bien !',
                'created_at' => now()->subDays(13)->addHours(3),
                'updated_at' => now()->subDays(13)->addHours(3),
            ],
            [
                'article_id' => $articles['creer-beats-trap-hip-hop'] ?? 2,
                'user_id' => $users['DJ ProducerMax'] ?? 1,
                'parent_id' => null,
                'content' => 'Très bon article ! J\'ajouterais un point sur le sidechain avec les 808. Mettre le kick en sidechain sur la sub permet d\'éviter les conflits de fréquences et donne ce groove si caractéristique du trap moderne. Native Instruments Battery 4 reste mon choix pour les kits de batterie trap.',
                'created_at' => now()->subDays(12),
                'updated_at' => now()->subDays(12),
            ],

            // 💬 COMMENTAIRES ARTICLE : "Les fondamentaux du mixage moderne"
            [
                'article_id' => $articles['fondamentaux-mixage-moderne'] ?? 3,
                'user_id' => $users['Marie Synthwave'] ?? 3,
                'parent_id' => null,
                'content' => 'Article très complet Alex ! En synthwave/retrowave, j\'ai remarqué qu\'il faut vraiment faire attention aux médiums vers 2-5kHz qui peuvent vite devenir agressifs avec les synthés vintages. Tu recommandes quoi comme approche EQ sur cette zone ?',
                'created_at' => now()->subDays(9),
                'updated_at' => now()->subDays(9),
            ],
            [
                'article_id' => $articles['fondamentaux-mixage-moderne'] ?? 3,
                'user_id' => $users['Alex Mixmaster'] ?? 1,
                'parent_id' => 7,
                'content' => 'Excellente question Marie ! Pour la synthwave, j\'utilise souvent des EQ à modélisation vintage (UAD Neve, Waves V-EQ4) avec des courbes douces. Je coupe subtilement autour de 3kHz (-2/-3dB) et je boost légèrement vers 8-10kHz pour l\'air. L\'astuce : utiliser la compression parallèle pour garder le punch sans l\'agressivité.',
                'created_at' => now()->subDays(9)->addHours(5),
                'updated_at' => now()->subDays(9)->addHours(5),
            ],
            [
                'article_id' => $articles['fondamentaux-mixage-moderne'] ?? 3,
                'user_id' => $users['Studio Mastering Pro'] ?? 2,
                'parent_id' => null,
                'content' => 'Très bon papier ! En complément, je préciserais que la compression parallèle est devenue indispensable dans le mixage moderne. Perso j\'utilise toujours un bus de compression heavy (8:1 ratio, attack rapide) blend à 20-30% avec le signal original. Ça donne cette cohésion qu\'on entend sur les prods actuelles.',
                'created_at' => now()->subDays(8),
                'updated_at' => now()->subDays(8),
            ],

            // 💬 COMMENTAIRES ARTICLE : "Mastering pour le streaming"
            [
                'article_id' => $articles['mastering-streaming-spotify-apple-music'] ?? 4,
                'user_id' => $users['DJ ProducerMax'] ?? 1,
                'parent_id' => null,
                'content' => 'Enfin quelqu\'un qui parle des vrais standards LUFS ! J\'en ai marre de voir des "tutos" qui parlent encore de -6dB RMS... Question : vous recommandez quoi comme plugin pour mesurer les LUFS ? J\'utilise encore le Waves WLM mais il commence à dater.',
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(4),
            ],
            [
                'article_id' => $articles['mastering-streaming-spotify-apple-music'] ?? 4,
                'user_id' => $users['Studio Mastering Pro'] ?? 2,
                'parent_id' => 10,
                'content' => 'Pour les LUFS, je recommande vivement le TC Electronic Clarity M ! C\'est devenu mon standard. Sinon le Plugin Alliance ADPTR Metric AB est excellent aussi et moins cher. L\'important c\'est d\'avoir le "short term" et "integrated" bien lisibles. Et surtout : toujours vérifier sur plusieurs plateformes !',
                'created_at' => now()->subDays(4)->addHours(1),
                'updated_at' => now()->subDays(4)->addHours(1),
            ],
            [
                'article_id' => $articles['mastering-streaming-spotify-apple-music'] ?? 4,
                'user_id' => $users['Alex Mixmaster'] ?? 1,
                'parent_id' => null,
                'content' => 'Article capital ! J\'ajouterais que depuis que Spotify a changé son algo de normalisation, il faut vraiment optimiser pour -14 LUFS. J\'ai remarqué qu\'en gardant plus de dynamique (DR supérieur à 8), les morceaux passent mieux sur toutes les plateformes. La loudness war est officiellement terminée !',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],

            // 💬 COMMENTAIRES ARTICLE : "Test Maschine MK3"
            [
                'article_id' => $articles['test-native-instruments-maschine-mk3'] ?? 5,
                'user_id' => $users['BeatMaker Sarah'] ?? 2,
                'parent_id' => null,
                'content' => 'Super test ! J\'hésite entre la Maschine MK3 et l\'Akai MPC Live 2. La Maschine me tente pour l\'intégration Komplete, mais l\'autonomie de la MPC est un gros plus pour moi qui bouge beaucoup. Tu as eu l\'occasion de comparer ?',
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(7),
            ],
            [
                'article_id' => $articles['test-native-instruments-maschine-mk3'] ?? 5,
                'user_id' => $users['GearReviewer'] ?? 1,
                'parent_id' => 13,
                'content' => 'Excellente question Sarah ! J\'ai testé les deux. La MPC Live 2 est imbattable pour la portabilité et l\'autonomie, mais la Maschine reste plus fluide pour l\'intégration studio. Si tu produis principalement chez toi, Maschine sans hésiter. Si tu veux créer en déplacement, MPC. Les deux sont excellentes !',
                'created_at' => now()->subDays(7)->addHours(4),
                'updated_at' => now()->subDays(7)->addHours(4),
            ],
            [
                'article_id' => $articles['test-native-instruments-maschine-mk3'] ?? 5,
                'user_id' => $users['Thomas Newbie'] ?? 2,
                'parent_id' => null,
                'content' => 'Merci pour ce test détaillé ! 1200€ ça reste un gros budget pour débuter... Vous pensez qu\'une Maschine Mikro MK3 peut être suffisante pour commencer ? Ou il vaut mieux économiser pour la version complète ?',
                'created_at' => now()->subDays(6),
                'updated_at' => now()->subDays(6),
            ],

            // 💬 COMMENTAIRES ARTICLE : "Ableton Live 12"
            [
                'article_id' => $articles['ableton-live-12-nouveautes-workflow'] ?? 6,
                'user_id' => $users['Marie Synthwave'] ?? 3,
                'parent_id' => null,
                'content' => 'Enfin l\'instrument Bass ! J\'attendais ça depuis des années. Les presets ont l\'air vraiment quali d\'après les démos. Question : est-ce que l\'upgrade depuis Live 11 Suite est justifiée à 230€ juste pour Bass et les améliorations workflow ?',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'article_id' => $articles['ableton-live-12-nouveautes-workflow'] ?? 6,
                'user_id' => $users['DJ ProducerMax'] ?? 1,
                'parent_id' => 16,
                'content' => '@Marie Perso j\'ai upgradé et je ne regrette pas ! Bass est effectivement excellent, mais c\'est surtout les améliorations de performance qui changent la donne. Les projets lourds (200+ pistes) se chargent 40% plus vite chez moi. Et les Automation Lanes, c\'est un game-changer pour les arrangements complexes.',
                'created_at' => now()->subDays(2)->addHours(6),
                'updated_at' => now()->subDays(2)->addHours(6),
            ],

            // 💬 COMMENTAIRES ARTICLE : "NAMM 2024"
            [
                'article_id' => $articles['namm-2024-annonces-marquantes'] ?? 7,
                'user_id' => $users['Marie Synthwave'] ?? 3,
                'parent_id' => null,
                'content' => 'Le Minimoog Model D Legacy à 6000€... Mon porte-monnaie pleure mais mon cœur de synthé-addict dit OUI ! 😭 Quelqu\'un a réussi à en commander un ? Apparemment ils sont déjà sold-out partout...',
                'created_at' => now()->subHours(20),
                'updated_at' => now()->subHours(20),
            ],
            [
                'article_id' => $articles['namm-2024-annonces-marquantes'] ?? 7,
                'user_id' => $users['GearReviewer'] ?? 1,
                'parent_id' => 18,
                'content' => '@Marie J\'ai pu en tester un sur le stand Moog au NAMM ! Le son est absolument identique aux originaux de 71-75. Mais effectivement, à ce prix, autant investir dans un vrai vintage qui prendra de la valeur. À moins d\'être collectionneur, le Behringer Model D fait 95% du job pour 20 fois moins cher...',
                'created_at' => now()->subHours(18),
                'updated_at' => now()->subHours(18),
            ],
            [
                'article_id' => $articles['namm-2024-annonces-marquantes'] ?? 7,
                'user_id' => $users['Alex Mixmaster'] ?? 1,
                'parent_id' => null,
                'content' => 'L\'Apollo X8P Heritage m\'intéresse beaucoup ! Si les nouveaux processeurs permettent enfin de faire tourner plusieurs instances d\'Ocean Way Studios simultanément, ça va changer ma façon de mixer. UAD reste incontournable pour les émulations vintage, même si les plugins natifs rattrapent.',
                'created_at' => now()->subHours(15),
                'updated_at' => now()->subHours(15),
            ],

            // 💬 COMMENTAIRES GÉNÉRAUX COMMUNAUTÉ
            [
                'article_id' => $articles['guide-debuter-production-mao'] ?? 1,
                'user_id' => $users['Marie Synthwave'] ?? 3,
                'parent_id' => null,
                'content' => 'Super initiative ce blog MAOlogie ! Enfin une communauté française dédiée à la prod. J\'espère qu\'on aura bientôt une section dédiée aux synthés hardware et modulaire. En tout cas, merci pour la qualité des articles ! 🎹✨',
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(4),
            ],
            [
                'article_id' => $articles['fondamentaux-mixage-moderne'] ?? 3,
                'user_id' => $users['Thomas Newbie'] ?? 2,
                'parent_id' => null,
                'content' => 'Grâce à vos articles et conseils, j\'ai enfin terminé mon premier track ! C\'est encore loin d\'être parfait mais je suis fier du résultat. Cette communauté est vraiment bienveillante, continuez comme ça ! Hâte de vous faire écouter ma prod 😊',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
        ];

        foreach ($comments as $commentData) {
            Comment::create($commentData);
        }

        $this->command->info('✅ ' . count($comments) . ' commentaires MAO créés avec succès !');

        // Statistiques détaillées
        $articlesWithComments = Comment::distinct('article_id')->count();
        $users_commenting = Comment::distinct('user_id')->count();
        $replies = Comment::whereNotNull('parent_id')->count();

        $this->command->info("📊 Statistiques interactions :");
        $this->command->info("   • {$articlesWithComments} articles avec commentaires");
        $this->command->info("   • {$users_commenting} utilisateurs actifs");
        $this->command->info("   • {$replies} réponses (conversations)");
        $this->command->warn("🎵 Communauté MAOlogie active et engagée !");
    }
}
