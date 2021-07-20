<?php

namespace Database\Seeders;

use App\Modules\UnitsOfMeasureCategories\Services\UnitOfMeasureCategoryStore;
use Illuminate\Database\Seeder;

class UnitOfMeasureCategorySeeder extends Seeder
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
            resolve(UnitOfMeasureCategoryStore::class)->store($datum);
        }
    }
}
