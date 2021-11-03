<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasurementCategoryRequest;
use App\Http\Resources\MeasurementCategoryResource;
use App\Http\Resources\MeasurementCategorySlugResource;
use App\Models\MeasurementCategory;
use Illuminate\Http\JsonResponse;

class MeasurementCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->responseRead(MeasurementCategoryResource::collection(MeasurementCategory::orderBy('created_at', 'desc')->get()));
    }

    public function show(MeasurementCategory $measurementCategory): JsonResponse
    {
        return $this->responseRead(new MeasurementCategoryResource($measurementCategory));
    }

    public function store(MeasurementCategoryRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new MeasurementCategory());
        return $this->responseCreate($model);
    }

    public function update(MeasurementCategoryRequest $request, MeasurementCategory $measurementCategory): JsonResponse
    {
        $this->persistUpdate($request, $measurementCategory);
        return $this->responseUpdate();
    }

    public function destroy(MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return $this->responseDelete();
    }

    public function slug(MeasurementCategory $measurementCategory): JsonResponse
    {
        return $this->responseRead(new MeasurementCategorySlugResource($measurementCategory));
    }
}
