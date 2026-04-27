<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OpeningHourSeeder extends Seeder
{
    public function run(): void
    {
        $hours = [
            ['day_of_week' => 'monday', 'open_time' => '17:00', 'close_time' => '22:00', 'is_closed' => false],
            ['day_of_week' => 'tuesday', 'open_time' => '17:00', 'close_time' => '22:00', 'is_closed' => false],
            ['day_of_week' => 'wednesday', 'open_time' => '17:00', 'close_time' => '22:00', 'is_closed' => false],
            ['day_of_week' => 'thursday', 'open_time' => '17:00', 'close_time' => '22:00', 'is_closed' => false],
            ['day_of_week' => 'friday', 'open_time' => '17:00', 'close_time' => '23:00', 'is_closed' => false],
            ['day_of_week' => 'saturday', 'open_time' => '16:00', 'close_time' => '23:00', 'is_closed' => false],
            ['day_of_week' => 'sunday', 'open_time' => '16:00', 'close_time' => '21:00', 'is_closed' => false],
        ];

        foreach ($hours as $hour) {
            DB::table('opening_hours')->insert(array_merge($hour, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
