<?php


namespace App\Modules\UnitOfMeasurementsCategories\Services;


use App\Models\UnitOfMeasurementCategory;

class UnitOfMeasurementCategoryStore
{
    private $unitOfMeasurementCategory;

    public function __construct(UnitOfMeasurementCategory $unitOfMeasurementCategory)
    {
        $this->unitOfMeasurementCategory = $unitOfMeasurementCategory;
    }

    public function store(array $data)
    {
        $unitOfMeasurement = $this->unitOfMeasurementCategory;
        $unitOfMeasurement = isset($data['id']) ? $unitOfMeasurement->find($data['id']) : $unitOfMeasurement;
        $unitOfMeasurement->name = $data['name'];
        $unitOfMeasurement->save();
        return $unitOfMeasurement;
    }
}
