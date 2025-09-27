<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// database/migrations/2025_06_12_184800_add_profile_fields_to_users_table.php
return new class extends Migration {
    public function up(): void {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable();
            }
            if (! Schema::hasColumn('users', 'bio')) {
                $table->text('bio')->nullable();
            }
            if (! Schema::hasColumn('users', 'location')) {
                $table->string('location')->nullable();
            }
            if (! Schema::hasColumn('users', 'profile_picture')) {
                $table->string('profile_picture')->nullable()->after('email');
            }
            if (! Schema::hasColumn('users', 'is_admin')) {
                $table->boolean('is_admin')->default(false)->after('profile_picture');
            }
            if (! Schema::hasColumn('users', 'status')) {
                $table->enum('status', ['active','banned'])->default('active')->after('is_admin');
            }
        });
    }

    public function down(): void {
        Schema::table('users', function (Blueprint $table) {
            foreach (['profile_picture','is_admin','status','avatar','bio','location'] as $col) {
                if (Schema::hasColumn('users', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
