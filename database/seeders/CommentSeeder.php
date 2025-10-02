<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CommentSeeder extends Seeder
{
    public function run()
    {
        $articles = Article::all();
        $users = User::where('is_admin', false)->get();

        if ($articles->isEmpty() || $users->isEmpty()) {
            $this->command->warn('⚠️ Aucun article ou utilisateur trouvé.');
            return;
        }

        $comments = [];
        $commentCount = 0;
        $replyCount = 0;
        $articlesWithComments = 0;

        // Créer des commentaires sur 70% des articles
        $articlesToComment = $articles->shuffle()->take(intval($articles->count() * 0.7));

        foreach ($articlesToComment as $article) {
            $articlesWithComments++;

            // Chaque article reçoit entre 2 et 5 commentaires principaux
            $numComments = rand(2, 5);

            for ($i = 0; $i < $numComments; $i++) {
                $user = $users->random();

                $comment = Comment::create([
                    'article_id' => $article->id,
                    'user_id' => $user->id,
                    'parent_id' => null, // Commentaire principal
                    'content' => $this->getRandomComment(),
                    'created_at' => Carbon::now()->subDays(rand(1, 30))->subHours(rand(0, 23)),
                    'updated_at' => Carbon::now()->subDays(rand(1, 30))->subHours(rand(0, 23)),
                ]);

                $comments[] = $comment;
                $commentCount++;

                // 40% de chance d'avoir une réponse à ce commentaire
                if (rand(1, 10) <= 4) {
                    $replyUser = $users->where('id', '!=', $user->id)->random();

                    Comment::create([
                        'article_id' => $article->id,
                        'user_id' => $replyUser->id,
                        'parent_id' => $comment->id, // Réponse au commentaire
                        'content' => $this->getRandomReply(),
                        'created_at' => $comment->created_at->addMinutes(rand(10, 120)),
                        'updated_at' => $comment->created_at->addMinutes(rand(10, 120)),
                    ]);

                    $replyCount++;
                }
            }
        }

        $this->command->info("✅ {$commentCount} commentaires MAO créés avec succès !");
        $this->command->info("📊 Statistiques interactions :");
        $this->command->info("   • {$articlesWithComments} articles avec commentaires");
        $this->command->info("   • " . $users->count() . " utilisateurs actifs");
        $this->command->info("   • {$replyCount} réponses (conversations)");
        $this->command->info("🎵 Communauté MAOlogie active et engagée !");
    }

    private function getRandomComment(): string
    {
        $comments = [
            "Merci pour ce guide ! Je débute complètement en MAO et c'est exactement ce que je cherchais. Une question : entre FL Studio et Ableton Live, lequel conseillez-vous pour débuter ? J'hésite vraiment entre les deux...",
            "Excellent article ! J'utilise Logic Pro depuis 3 ans et je confirme tout ce que tu dis. Pour les débutants, je recommande vraiment de commencer par les instruments virtuels inclus avant d'acheter des plugins externes.",
            "Super tuto ! Par contre, j'ai un problème avec la latence sur mon interface audio. Même en réglant le buffer, j'ai toujours 20ms de delay. Des conseils ?",
            "Très instructif ! Je fais de la MAO depuis 2 ans et j'apprends encore des choses. La partie sur le mixage est particulièrement bien expliquée. Hate de voir tes prochains articles !",
            "Question technique : quel est ton setup pour l'enregistrement vocal ? Le son dans tes exemples audio est vraiment propre, j'aimerais avoir le même rendu.",
            "Merci pour ces conseils ! Je viens de commencer la composition et c'est vrai que c'est intimidant au début. Ton approche étape par étape aide beaucoup.",
            "Génial ! J'ai testé ta technique de side-chain compression et ça marche parfaitement. Mon kick ressort enfin bien dans le mix. Tu as d'autres astuces du même genre ?",
            "Article très complet ! Une question : tu utilises quoi comme moniteurs de studio ? Je cherche à upgrader mon setup audio et j'hésite entre plusieurs modèles."
        ];

        return $comments[array_rand($comments)];
    }

    private function getRandomReply(): string
    {
        $replies = [
            "Salut ! Pour débuter, je te conseille vraiment Reaper. C'est moins cher et très puissant. FL Studio est top aussi mais plus orienté beats/electronic.",
            "Pour la latence, as-tu testé avec un driver ASIO4ALL ? Ça peut vraiment améliorer les performances sur Windows.",
            "Merci pour ton retour ! Pour les moniteurs, j'utilise des Yamaha HS5. Excellent rapport qualité/prix pour un home studio.",
            "Content que ça t'aide ! N'hésite pas si tu as d'autres questions, la communauté MAO est là pour s'entraider 😊",
            "Exactement ! C'est important de bien maîtriser les bases avant de se lancer dans des plugins compliqués.",
            "De rien ! La MAO demande de la patience mais c'est tellement gratifiant quand on commence à avoir de bons résultats.",
            "Oui ! Teste aussi la compression parallèle sur ta batterie, ça donne un son plus punchy. Je ferai peut-être un tuto là-dessus.",
            "Merci ! Je prépare justement une série d'articles sur l'acoustique et le traitement de studio. Stay tuned !"
        ];

        return $replies[array_rand($replies)];
    }
}
