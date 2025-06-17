<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
Schema::create('cart_training', function (Blueprint $table) {
 $table->foreignId('cart_id')->constrained();
 $table->foreignId('training_id')->constrained();
    $table->primary(['cart_id', 'training_id']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_training');
    }
};
