<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            ['customer_id' => 1, 'rating' => 5, 'comment' => 'An extraordinary culinary journey. The Peking Duck was absolutely divine, reminiscent of the finest restaurants in Beijing.'],
            ['customer_id' => 2, 'rating' => 5, 'comment' => 'Impeccable service and stunning ambiance. The tasting menu took my breath away. A true gem in the city.'],
            ['customer_id' => 3, 'rating' => 5, 'comment' => 'Finally, authentic Asian fine dining that exceeds expectations. Every dish tells a story of tradition and innovation.'],
            ['customer_id' => 4, 'rating' => 4, 'comment' => 'Beautiful presentation and delicious food. The private dining room was perfect for our anniversary celebration.'],
            ['customer_id' => 5, 'rating' => 5, 'comment' => 'The wagyu beef tataki was melt-in-your-mouth perfection. Will definitely be back for more.'],
            ['customer_id' => 6, 'rating' => 4, 'comment' => 'Great atmosphere and excellent service. The sake flight was a delightful experience.'],
        ];

        foreach ($reviews as $review) {
            DB::table('reviews')->insert(array_merge($review, [
                'is_approved' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
