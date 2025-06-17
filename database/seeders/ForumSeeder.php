<?php

namespace Database\Seeders;

use App\Models\ForumTopic;
use App\Models\ForumPost;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ForumSeeder extends Seeder
{
    public function run()
    {
        $admin = User::where('is_admin', true)->first();
        
        // Créer un utilisateur test s'il n'existe pas
        $testUser = User::where('email', 'test@example.com')->first();
        if (!$testUser) {
            $testUser = User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password123'),
                'is_admin' => false,
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
        }

        // Créer 8 sujets de forum
        ForumTopic::factory()
            ->count(8)
            ->create(['user_id' => $admin->id])
            ->each(function ($topic) use ($admin, $testUser) {
                // Chaque sujet a entre 3 et 10 posts
                ForumPost::factory()
                    ->count(rand(3, 10))
                    ->create([
                        'topic_id' => $topic->id,
                        'user_id' => rand(0, 1) ? $admin->id : $testUser->id
                    ]);
            });
    }
}
