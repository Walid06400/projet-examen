<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Supprime la table comments puis la recrée proprement
        Schema::dropIfExists('comments');

        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            // Clés étrangères
            $table->foreignId('article_id')
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Pour gérer les réponses imbriquées
            $table->foreignId('parent_id')
                  ->nullable()
                  ->constrained('comments')
                  ->nullOnDelete();

            // Contenu et timestamps
            $table->text('content');
            $table->timestamps();

            // Index pour optimiser les requêtes les plus fréquentes
            $table->index(['article_id', 'parent_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
