<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'James Chen', 'email' => 'james.chen@email.com', 'phone' => '+1 (555) 123-4567', 'notes' => 'Regular customer, prefers window seating'],
            ['name' => 'Sarah Williams', 'email' => 'sarah.williams@email.com', 'phone' => '+1 (555) 234-5678', 'notes' => 'Vegetarian preferences'],
            ['name' => 'Michael Park', 'email' => 'michael.park@email.com', 'phone' => '+1 (555) 345-6789', 'notes' => 'Gluten-free requirements'],
            ['name' => 'Emily Johnson', 'email' => 'emily.johnson@email.com', 'phone' => '+1 (555) 456-7890', 'notes' => 'Celebrating anniversary'],
            ['name' => 'David Lee', 'email' => 'david.lee@email.com', 'phone' => '+1 (555) 567-8901', 'notes' => null],
            ['name' => 'Lisa Wang', 'email' => 'lisa.wang@email.com', 'phone' => '+1 (555) 678-9012', 'notes' => 'Birthday party planning'],
            ['name' => 'Robert Kim', 'email' => 'robert.kim@email.com', 'phone' => '+1 (555) 789-0123', 'notes' => null],
            ['name' => 'Jennifer Martinez', 'email' => 'jennifer.martinez@email.com', 'phone' => '+1 (555) 890-1234', 'notes' => 'First-time visitor'],
        ];

        foreach ($customers as $customer) {
            DB::table('customers')->insert(array_merge($customer, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
