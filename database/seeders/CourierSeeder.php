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
                'color' => '#0fa9de00',
            ],
            [
                'name' => 'Lalamove',
                'color' => '#f1672200',
            ]
        ];

        foreach ($data as $datum) {
            Courier::create($datum);
        }
    }
}
