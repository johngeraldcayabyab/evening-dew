<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitOfMeasureCategoryRequest;
use App\Http\Resources\UnitOfMeasureCategoryResource;
use App\Models\UnitOfMeasureCategory;
use Illuminate\Http\JsonResponse;

class UnitOfMeasureCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->responseRead(UnitOfMeasureCategoryResource::collection(UnitOfMeasureCategory::orderBy('created_at', 'desc')->get()));
    }

    public function store(UnitOfMeasureCategoryRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new UnitOfMeasureCategory());
        return $this->responseCreate($model);
    }

    public function show(UnitOfMeasureCategory $unitOfMeasureCategory): JsonResponse
    {
        return $this->responseRead(new UnitOfMeasureCategoryResource($unitOfMeasureCategory));
    }

    public function update(UnitOfMeasureCategoryRequest $request, UnitOfMeasureCategory $unitOfMeasureCategory): JsonResponse
    {
        $this->persistUpdate($request, $unitOfMeasureCategory);
        return $this->responseUpdate();
    }

    public function destroy(UnitOfMeasureCategory $unitOfMeasureCategory): JsonResponse
    {
        $unitOfMeasureCategory->delete();
        return $this->responseDelete();
    }
}
