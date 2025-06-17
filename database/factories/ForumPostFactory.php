<?php

namespace Database\Factories;

use App\Models\ForumTopic;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ForumPostFactory extends Factory
{
    public function definition()
    {
        return [
            'topic_id' => ForumTopic::factory(),
            'user_id' => User::factory(),
            'content' => $this->faker->paragraphs(2, true),
            'is_solution' => $this->faker->boolean(10), // 10% de chance d'être une solution
        ];
    }
}
