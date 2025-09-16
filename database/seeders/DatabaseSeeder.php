<?php
// database/seeders/DatabaseSeeder.php - VERSION FINALE MAOlogie DWWM

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🎵 MAOlogie - Démarrage du seeding de données...');
        $this->command->newLine();

        $this->call([
            // 👑 ÉTAPE 1 : Utilisateurs (admin + communauté MAO)
            UserSeeder::class,        // ✅ Maintenant ça existe !

            // 🏷️ ÉTAPE 2 : Catégories MAO spécialisées
            CategorySeeder::class,

            // 📝 ÉTAPE 3 : Articles MAO avec contenu technique détaillé
            ArticleSeeder::class,

            // 💬 ÉTAPE 4 : Commentaires communautaires authentiques
            CommentSeeder::class,
        ]);

        $this->command->newLine();
        $this->command->info('✅ MAOlogie - Seeding terminé avec succès !');
        $this->command->warn('🎧 Plateforme MAO prête avec :');
        $this->command->info('   • Communauté active (8 utilisateurs)');
        $this->command->info('   • 6 catégories MAO spécialisées');
        $this->command->info('   • 7 articles techniques détaillés');
        $this->command->info('   • 22 commentaires d\'interactions');
        $this->command->newLine();
        $this->command->warn('🔑 Connexion admin : admin@maologie.fr / password123');
        $this->command->info('🌐 Back-office : http://localhost:8000/admin');
    }
}
