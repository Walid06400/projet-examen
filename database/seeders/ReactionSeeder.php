<?php

namespace Database\Seeders;

use App\Models\Reaction;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReactionSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $comments = Comment::all();

        if ($users->isEmpty() || $comments->isEmpty()) {
            $this->command->warn('⚠️ Aucun utilisateur ou commentaire trouvé.');
            return;
        }

        // Ajouter des réactions aléatoirement sur 70% des commentaires
        $comments->shuffle()->take(intval($comments->count() * 0.7))->each(function ($comment) use ($users) {
            // Chaque commentaire reçoit entre 1 et 5 réactions
            $reactionCount = rand(1, 5);
            $usersForReactions = $users->shuffle()->take($reactionCount);

            foreach ($usersForReactions as $user) {
                // 80% de chance pour un like, 20% pour un dislike
                $type = (rand(1, 10) <= 8) ? Reaction::TYPE_LIKE : Reaction::TYPE_DISLIKE;

                // ✅ Éviter les doublons avec les colonnes polymorphes
                Reaction::firstOrCreate([
                    'user_id' => $user->id,
                    'reactable_id' => $comment->id,
                    'reactable_type' => Comment::class,
                ], [
                    'type' => $type
                ]);
            }
        });

        $this->command->info('✅ Réactions ajoutées aux commentaires avec succès !');
        $this->command->info('📊 Total des réactions créées : ' . Reaction::count());
    }
}
