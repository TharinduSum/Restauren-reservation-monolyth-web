<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Starters', 'slug' => 'starters', 'description' => 'Begin your culinary journey', 'sort_order' => 1],
            ['name' => 'Main Course', 'slug' => 'main-course', 'description' => 'Signature dishes crafted to perfection', 'sort_order' => 2],
            ['name' => 'Desserts', 'slug' => 'desserts', 'description' => 'Sweet endings to your meal', 'sort_order' => 3],
            ['name' => 'Drinks', 'slug' => 'drinks', 'description' => 'Fine wines, cocktails, and beverages', 'sort_order' => 4],
        ];

        foreach ($categories as $category) {
            DB::table('menu_categories')->insert(array_merge($category, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
