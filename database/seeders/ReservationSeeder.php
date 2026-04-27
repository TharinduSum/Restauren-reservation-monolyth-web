<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $reservations = [
            [
                'customer_id' => 1,
                'reservation_status_id' => 2,
                'date' => now()->addDays(1)->format('Y-m-d'),
                'time' => '19:00',
                'guest_count' => 2,
                'special_requests' => 'Birthday celebration - please bring cake',
            ],
            [
                'customer_id' => 2,
                'reservation_status_id' => 2,
                'date' => now()->addDays(2)->format('Y-m-d'),
                'time' => '20:00',
                'guest_count' => 4,
                'special_requests' => 'Vegetarian menu required',
            ],
            [
                'customer_id' => 3,
                'reservation_status_id' => 1,
                'date' => now()->addDays(3)->format('Y-m-d'),
                'time' => '19:30',
                'guest_count' => 6,
                'special_requests' => 'Gluten-free options needed',
            ],
            [
                'customer_id' => 4,
                'reservation_status_id' => 2,
                'date' => now()->addDays(5)->format('Y-m-d'),
                'time' => '18:00',
                'guest_count' => 2,
                'special_requests' => 'Anniversary dinner - special decoration',
            ],
            [
                'customer_id' => 5,
                'reservation_status_id' => 3,
                'date' => now()->subDays(2)->format('Y-m-d'),
                'time' => '20:00',
                'guest_count' => 4,
                'special_requests' => null,
            ],
            [
                'customer_id' => 6,
                'reservation_status_id' => 4,
                'date' => now()->subDays(5)->format('Y-m-d'),
                'time' => '19:00',
                'guest_count' => 8,
                'special_requests' => 'Birthday party - need high chair',
            ],
            [
                'customer_id' => 7,
                'reservation_status_id' => 2,
                'date' => now()->addDays(7)->format('Y-m-d'),
                'time' => '21:00',
                'guest_count' => 4,
                'special_requests' => 'Window table preferred',
            ],
        ];

        foreach ($reservations as $reservation) {
            DB::table('reservations')->insert(array_merge($reservation, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        DB::table('reservation_tables')->insert([
            ['reservation_id' => 1, 'restaurant_table_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 2, 'restaurant_table_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 3, 'restaurant_table_id' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 4, 'restaurant_table_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 5, 'restaurant_table_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 6, 'restaurant_table_id' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['reservation_id' => 7, 'restaurant_table_id' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
