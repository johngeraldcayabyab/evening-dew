<?php

namespace Database\Seeders;

use App\Modules\UnitOfMeasurementsCategories\Services\UnitOfMeasurementCategoryStore;
use Illuminate\Database\Seeder;

class UnitOfMeasurementCategorySeeder extends Seeder
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
            resolve(UnitOfMeasurementCategoryStore::class)->store($datum);
        }
    }
}
