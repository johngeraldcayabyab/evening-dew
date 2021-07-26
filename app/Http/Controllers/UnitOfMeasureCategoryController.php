<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitOfMeasureCategoryRequest;
use App\Http\Resources\UnitOfMeasureCategoryResource;
use App\Models\UnitOfMeasureCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitOfMeasureCategoryController extends Controller
{
    public function index()
    {
        return $this->responseRead(UnitOfMeasureCategoryResource::collection(UnitOfMeasureCategory::all()));
    }

    public function store(UnitOfMeasureCategoryRequest $request)
    {
        $model = $this->persistCreate($request, new UnitOfMeasureCategory());
        return $this->responseCreate($model);
    }

    public function show(UnitOfMeasureCategory $model)
    {
        return $this->responseRead(new UnitOfMeasureCategoryResource($model));
    }

    public function update(UnitOfMeasureCategoryRequest $request, UnitOfMeasureCategory $model)
    {
        $this->persistUpdate($request, $model);
        return $this->responseUpdate();
    }

    public function destroy(UnitOfMeasureCategory $model)
    {
        $model->delete();
        return $this->responseDelete();
    }
}
