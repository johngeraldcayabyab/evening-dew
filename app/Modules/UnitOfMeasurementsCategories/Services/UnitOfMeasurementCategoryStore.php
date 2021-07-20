<?php


namespace App\Modules\UnitOfMeasurementsCategories\Services;


use App\Models\UnitOfMeasurementCategory;

class UnitOfMeasurementCategoryStore
{
    private $model;

    public function __construct(UnitOfMeasurementCategory $model)
    {
        $this->model = $model;
    }

    public function store(array $data)
    {
        $model = $this->model;
        $model = isset($data['id']) ? $model->find($data['id']) : $model;
        $model->name = $data['name'];
        $model->save();
        return $model;
    }
}
