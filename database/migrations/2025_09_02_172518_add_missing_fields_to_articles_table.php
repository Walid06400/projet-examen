<?php
// database/migrations/xxx_add_missing_fields_to_articles_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            if (!Schema::hasColumn('articles', 'status')) {
                $table->enum('status', ['draft', 'published'])->default('draft');
            }
            if (!Schema::hasColumn('articles', 'published_at')) {
                $table->timestamp('published_at')->nullable();
            }
            if (!Schema::hasColumn('articles', 'is_featured')) {
                $table->boolean('is_featured')->default(false);
            }
            if (!Schema::hasColumn('articles', 'excerpt')) {
                $table->text('excerpt')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['status', 'published_at', 'is_featured', 'excerpt']);
        });
    }
};
