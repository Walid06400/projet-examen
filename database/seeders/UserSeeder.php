<?php
// database/seeders/UserSeeder.php - VERSION FINALE CORRIGÉE

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 🎯 RESET - Suppression utilisateurs existants
        User::truncate();

        $users = [
            // 👑 ADMIN PRINCIPAL
            [
                'name' => 'Admin MAOlogie',
                'email' => 'admin@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => true,
                'status' => 'active',
                'bio' => 'Administrateur de la plateforme MAOlogie - Communauté des passionnés de production musicale',
                'location' => 'France',
                'website' => 'https://maologie.fr',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            // 🎧 PRODUCTEURS ET BEATMAKERS
            [
                'name' => 'DJ ProducerMax',
                'email' => 'producermax@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Producteur électro depuis 12 ans. Spécialisé en techno et house progressive. Resident DJ au Rex Club Paris.',
                'location' => 'Paris, France',
                'website' => 'https://soundcloud.com/producermax',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            [
                'name' => 'BeatMaker Sarah',
                'email' => 'sarah.beats@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Beatmaker hip-hop et trap. Passionnée par les samples vintage et les 808 sub. Produit pour des rappeurs indépendants.',
                'location' => 'Lyon, France',
                'website' => 'https://instagram.com/sarahbeats',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            // 🎚️ INGÉNIEURS DU SON
            [
                'name' => 'Alex Mixmaster',
                'email' => 'alex.mix@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Ingénieur son freelance. 18 ans d\'expérience en mixage et mastering. Spécialisé rock, métal et musiques amplifiées.',
                'location' => 'Marseille, France',
                'website' => 'https://alexmixmaster.studio',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            [
                'name' => 'Studio Mastering Pro',
                'email' => 'mastering@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Studio de mastering professionnel. Spécialisé mastering pour streaming, vinyle et formats haute résolution. Clients majors.',
                'location' => 'Toulouse, France',
                'website' => 'https://masteringpro.studio',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            // 🎵 COMMUNAUTÉ PASSIONNÉE
            [
                'name' => 'Thomas Newbie',
                'email' => 'thomas.newbie@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Débutant passionné en MAO. J\'apprends Ableton Live et Logic Pro. Cherche conseils pour progresser en production !',
                'location' => 'Bordeaux, France',
                'website' => null,
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            [
                'name' => 'Marie Synthwave',
                'email' => 'marie.synthwave@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Passionnée de synthwave et retrowave. Collectionneuse de synthés vintage : Juno-106, DX7, Prophet-5. #SynthLife',
                'location' => 'Nantes, France',
                'website' => 'https://youtube.com/mariesynthwave',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],

            [
                'name' => 'GearReviewer',
                'email' => 'gear@maologie.fr',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'bio' => 'Testeur de matériel audio indépendant. Reviews objectives d\'interfaces, monitors, contrôleurs. Collabore avec Audiofanzine.',
                'location' => 'Lille, France',
                'website' => 'https://gear-reviews.fr',
                'profile_picture' => null,
                'avatar' => null,
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }

        $this->command->info('✅ ' . count($users) . ' utilisateurs MAO créés avec succès !');
        $this->command->warn('🔑 Login admin : admin@maologie.fr / password123');
    }
}
