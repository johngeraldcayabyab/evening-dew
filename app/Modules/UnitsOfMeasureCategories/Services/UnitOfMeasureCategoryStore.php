<?php


namespace App\Modules\UnitsOfMeasureCategories\Services;


use App\Models\UnitOfMeasureCategory;

class UnitOfMeasureCategoryStore
{
    private UnitOfMeasureCategory $model;

    public function __construct(UnitOfMeasureCategory $model)
    {
        $this->model = $model;
    }

    public function store(array $data): UnitOfMeasureCategory
    {
        $model = $this->model;
        $model = isset($data['id']) ? $model->find($data['id']) : $model;
        $model->name = $data['name'];
        $model->save();
        return $model;
    }
}
