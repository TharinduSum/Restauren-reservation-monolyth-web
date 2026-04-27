<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservation_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        DB::table('reservation_statuses')->insert([
            ['name' => 'Pending', 'slug' => 'pending', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Confirmed', 'slug' => 'confirmed', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cancelled', 'slug' => 'cancelled', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Completed', 'slug' => 'completed', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_statuses');
    }
};
