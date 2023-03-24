<?php

namespace Database\Seeders;

use App\Models\Measurement;
use Illuminate\Database\Seeder;

class MeasurementSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'name' => 'Units',
                'type' => 'reference',
                'ratio' => 1.00,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 1,
                'is_default' => true,
            ],
            [
                'name' => 'Dozens',
                'type' => 'bigger',
                'ratio' => 12,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 1,
            ],
            [
                'name' => 'kg',
                'type' => 'reference',
                'ratio' => 1.00,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 2,
            ],
            [
                'name' => 'g',
                'type' => 'smaller',
                'ratio' => 1000.00,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 2,
            ],
            [
                'name' => 'oz',
                'type' => 'smaller',
                'ratio' => 35.27,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 2,
            ],
            [
                'name' => 'lb',
                'type' => 'smaller',
                'ratio' => 2.20,
                'rounding_precision' => 0.01,
                'measurement_category_id' => 2,
            ],
        ];
        foreach ($data as $datum) {
            Measurement::create($datum);
        }
    }
}
