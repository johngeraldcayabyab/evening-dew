<?php

namespace Database\Seeders;

use App\Models\Courier;
use Illuminate\Database\Seeder;

class CourierSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Grab',
                'color' => '#2bae66ff',
            ],
            [
                'name' => 'Angkas',
                'color' => '#096dd9',
            ],
            [
                'name' => 'Lalamove',
                'color' => '#d46b08',
            ]
        ];

        foreach ($data as $datum) {
            Courier::create($datum);
        }
    }
}
