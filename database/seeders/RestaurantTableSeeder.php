<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantTableSeeder extends Seeder
{
    public function run(): void
    {
        $tables = [
            ['name' => 'Table 1', 'capacity' => 2, 'location' => 'window', 'description' => 'Romantic window table for two'],
            ['name' => 'Table 2', 'capacity' => 2, 'location' => 'window', 'description' => 'Cozy window seating'],
            ['name' => 'Table 3', 'capacity' => 4, 'location' => 'indoor', 'description' => 'Center table in main dining area'],
            ['name' => 'Table 4', 'capacity' => 4, 'location' => 'indoor', 'description' => 'Near the garden view'],
            ['name' => 'Table 5', 'capacity' => 4, 'location' => 'indoor', 'description' => 'Quiet corner table'],
            ['name' => 'Table 6', 'capacity' => 6, 'location' => 'indoor', 'description' => 'Large party table'],
            ['name' => 'Table 7', 'capacity' => 2, 'location' => 'outdoor', 'description' => 'Patio seating'],
            ['name' => 'Table 8', 'capacity' => 4, 'location' => 'outdoor', 'description' => 'Garden terrace table'],
            ['name' => 'Table 9', 'capacity' => 8, 'location' => 'private_room', 'description' => 'Private dining room'],
            ['name' => 'Table 10', 'capacity' => 10, 'location' => 'private_room', 'description' => 'Executive private room'],
            ['name' => 'Bar 1', 'capacity' => 2, 'location' => 'bar', 'description' => 'Bar seating near mixology station'],
            ['name' => 'Bar 2', 'capacity' => 2, 'location' => 'bar', 'description' => 'Bar seating near sake display'],
        ];

        foreach ($tables as $table) {
            DB::table('restaurant_tables')->insert(array_merge($table, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
