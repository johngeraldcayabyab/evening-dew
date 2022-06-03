<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Shopify',
                'color' => '#96bf48',
            ],
            [
                'name' => 'Manual',
                'color' => '#0063dc',
            ],
            [
                'name' => 'Viber',
                'color' => '#59267c',
            ],
            [
                'name' => 'Messenger',
                'color' => '#006AFF',
            ],
            [
                'name' => 'Instagram',
                'color' => '#3f729b',
            ],
        ];

        foreach ($data as $datum) {
            Source::create($datum);
        }
    }
}
