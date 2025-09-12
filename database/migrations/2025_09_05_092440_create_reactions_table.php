<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
public function up()
{
Schema::create('reactions', function (Blueprint $table) {
$table->id();
$table->foreignId('user_id')->constrained()->onDelete('cascade');
$table->morphs('reactable'); // article_id/comment_id + reactable_type
$table->enum('type', ['like', 'dislike', 'love', 'laugh', 'wow', 'sad', 'angry']);
$table->timestamps();

// Un utilisateur ne peut réagir qu'une fois par élément
$table->unique(['user_id', 'reactable_id', 'reactable_type']);
});
}
public function down()
{
Schema::dropIfExists('reactions');
}
};
