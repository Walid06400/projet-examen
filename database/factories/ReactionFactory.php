<?php

namespace Database\Factories;

use App\Models\ForumPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReactionFactory extends Factory
{
    public function definition()
    {
        return [
            'post_id' => ForumPost::factory(),
            'user_id' => User::factory(),
            'type' => $this->faker->randomElement(['like', 'dislike']),
        ];
    }
}
