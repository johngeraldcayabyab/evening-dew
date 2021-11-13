<?php

namespace App\Modules\MeasurementCategory\Seeders;

use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use Illuminate\Database\Seeder;

class MeasurementCategorySeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['name' => 'Units'],
            ['name' => 'Weight'],
            ['name' => 'Working Time'],
            ['name' => 'Length / Distance'],
            ['name' => 'Volume'],
            ['name' => 'Time'],
        ];

        foreach ($data as $datum) {
            MeasurementCategory::create($datum);
        }
    }
}
