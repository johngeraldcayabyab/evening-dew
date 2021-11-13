<?php

namespace App\Modules\MeasurementCategory\Controllers;

use App\Modules\MeasurementCategory\Models\MeasurementCategory;
use App\Modules\MeasurementCategory\Requests\MeasurementCategoryRequest;
use App\Modules\MeasurementCategory\Resources\MeasurementCategoryResource;
use App\Modules\MeasurementCategory\Resources\MeasurementCategorySlugResource;
use Illuminate\Http\JsonResponse;

class MeasurementCategoryController
{
    public function index(): JsonResponse
    {
        return response()->json(MeasurementCategoryResource::collection(MeasurementCategory::orderBy('created_at', 'desc')->get()));
    }

    public function show(MeasurementCategory $measurementCategory): JsonResponse
    {
        return response()->json(new MeasurementCategoryResource($measurementCategory));
    }

    public function store(MeasurementCategoryRequest $request): JsonResponse
    {
        MeasurementCategory::create($request->validated());
        return response()->json([], STATUS_CREATE);
    }

    public function update(MeasurementCategoryRequest $request, MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function slug(MeasurementCategory $measurementCategory): JsonResponse
    {
        return response()->json(new MeasurementCategorySlugResource($measurementCategory));
    }
}
