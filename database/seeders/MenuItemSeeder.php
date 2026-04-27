<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['menu_category_id' => 1, 'name' => 'Crispy Spring Rolls', 'description' => 'Golden fried vegetables with sweet chili sauce', 'price' => 12.00, 'sort_order' => 1],
            ['menu_category_id' => 1, 'name' => 'Thai Coconut Soup', 'description' => 'Creamy coconut broth with lemongrass and galangal', 'price' => 14.00, 'sort_order' => 2],
            ['menu_category_id' => 1, 'name' => 'Vietnamese Fresh Rolls', 'description' => 'Shrimp, herbs, rice vermicelli wrapped in rice paper', 'price' => 15.00, 'sort_order' => 3],
            ['menu_category_id' => 1, 'name' => 'Edamame', 'description' => 'Steamed soybeans with sea salt', 'price' => 9.00, 'sort_order' => 4],
            ['menu_category_id' => 1, 'name' => 'Tuna Tartare', 'description' => 'Fresh tuna with avocado and wasabi mayo', 'price' => 18.00, 'sort_order' => 5],

            ['menu_category_id' => 2, 'name' => 'Truffle Peking Duck', 'description' => 'Crispy duck with truffle hoisin glaze and pancakes', 'price' => 48.00, 'sort_order' => 1],
            ['menu_category_id' => 2, 'name' => 'Wagyu Beef Tataki', 'description' => 'Seared wagyu with ponzu dressing and daikon', 'price' => 52.00, 'sort_order' => 2],
            ['menu_category_id' => 2, 'name' => 'Lobster Thermidor', 'description' => 'Baked lobster with cognac cream sauce', 'price' => 58.00, 'sort_order' => 3],
            ['menu_category_id' => 2, 'name' => 'Miso Glazed Black Cod', 'description' => 'White miso, sake, and ginger glaze', 'price' => 42.00, 'sort_order' => 4],
            ['menu_category_id' => 2, 'name' => 'Pad Thai', 'description' => 'Stir-fried rice noodles with shrimp and peanuts', 'price' => 28.00, 'sort_order' => 5],
            ['menu_category_id' => 2, 'name' => 'Dim Sum Platter', 'description' => 'Selection of steamed dumplings and buns', 'price' => 35.00, 'sort_order' => 6],

            ['menu_category_id' => 3, 'name' => 'Mango Sticky Rice', 'description' => 'Sweet coconut sticky rice with fresh mango', 'price' => 14.00, 'sort_order' => 1],
            ['menu_category_id' => 3, 'name' => 'Matcha Tiramisu', 'description' => 'Japanese-Italian fusion dessert with matcha cream', 'price' => 16.00, 'sort_order' => 2],
            ['menu_category_id' => 3, 'name' => 'Passion Fruit Crème Brûlée', 'description' => 'Tahitian vanilla custard with torched sugar', 'price' => 15.00, 'sort_order' => 3],
            ['menu_category_id' => 3, 'name' => 'Sesame Panna Cotta', 'description' => 'Black sesame with ginger caramel sauce', 'price' => 13.00, 'sort_order' => 4],
            ['menu_category_id' => 3, 'name' => 'Tempura Fried Ice Cream', 'description' => 'Crispy tempura shell with vanilla ice cream', 'price' => 12.00, 'sort_order' => 5],

            ['menu_category_id' => 4, 'name' => 'Sakura Martini', 'description' => 'Cherry blossom vodka with elderflower liqueur', 'price' => 18.00, 'sort_order' => 1],
            ['menu_category_id' => 4, 'name' => 'Yuzu Sparkling', 'description' => 'Fresh yuzu, sparkling water, and mint', 'price' => 12.00, 'sort_order' => 2],
            ['menu_category_id' => 4, 'name' => 'Jasmine Iced Tea', 'description' => 'House-brewed jasmine tea with ice', 'price' => 8.00, 'sort_order' => 3],
            ['menu_category_id' => 4, 'name' => 'Sake Flight', 'description' => 'Curated selection of three premium sakes', 'price' => 28.00, 'sort_order' => 4],
            ['menu_category_id' => 4, 'name' => 'Oolong Tea', 'description' => 'Premium aged oolong tea', 'price' => 10.00, 'sort_order' => 5],
            ['menu_category_id' => 4, 'name' => 'Lychee Bellini', 'description' => 'Fresh lychee puree with prosecco', 'price' => 16.00, 'sort_order' => 6],
        ];

        foreach ($items as $item) {
            DB::table('menu_items')->insert(array_merge($item, [
                'image' => null,
                'is_available' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
