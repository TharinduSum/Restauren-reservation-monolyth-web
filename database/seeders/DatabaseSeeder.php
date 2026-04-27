<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,
            RestaurantTableSeeder::class,
            ReservationSeeder::class,
            MenuCategorySeeder::class,
            MenuItemSeeder::class,
            ReviewSeeder::class,
            OpeningHourSeeder::class,
        ]);
    }
}
