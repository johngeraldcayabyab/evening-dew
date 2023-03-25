<?php

namespace Database\Seeders;

use App\Models\MeasurementCategory;
use Illuminate\Database\Seeder;

class MeasurementCategorySeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['name' => 'Units', 'is_default' => true,],
            ['name' => 'Weight'],
        ];
        foreach ($data as $datum) {
            MeasurementCategory::create($datum);
        }
    }
}
