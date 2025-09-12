<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
   // database/seeders/AdminUserSeeder.php
public function run(): void
{
    User::updateOrCreate(
        ['email' => 'admin@maologie.fr'], // Clé de recherche
        [
            'name' => 'Admin MAOlogie',
            'password' => Hash::make('password123'),
            'is_admin' => true,
            'status' => 'active',
            'email_verified_at' => now(),
        ]
    );
}

    }

