<?php

namespace Database\Seeders;

use App\Models\MeasureCategory;
use Illuminate\Database\Seeder;

class MeasureCategorySeeder extends Seeder
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
            MeasureCategory::create($datum);
        }
    }
}
