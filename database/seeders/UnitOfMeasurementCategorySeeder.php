<?php

namespace Database\Seeders;

use App\Models\UnitOfMeasurementCategory;
use App\Modules\UnitOfMeasurementsCategories\Services\UnitOfMeasurementCategoryStore;
use Illuminate\Database\Seeder;

class UnitOfMeasurementCategorySeeder extends Seeder
{
    private $unitOfMeasurementCategoryStore;

    public function __construct(UnitOfMeasurementCategory $unitOfMeasurementCategory)
    {
        $this->unitOfMeasurementCategoryStore = new UnitOfMeasurementCategoryStore($unitOfMeasurementCategory);
    }

    public function run()
    {
        $data = [
            ['name' => 'Units'],
            ['name' => 'Units'],
            ['name' => 'Units'],
            ['name' => 'Units'],
        ];

        foreach ($data as $datum) {
            $this->unitOfMeasurementCategoryStore->store($datum);
        }
    }
}
