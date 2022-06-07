<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MeasurementCategoryRequest;
use App\Http\Resources\MeasurementCategoryResource;
use App\Models\MeasurementCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementCategoryController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new MeasurementCategory();
        $model = $model->filterAndOrder($request);
        return MeasurementCategoryResource::collection($model);
    }

    public function show(MeasurementCategory $measurementCategory): JsonResponse
    {
        return response()->json(new MeasurementCategoryResource($measurementCategory));
    }

    public function store(MeasurementCategoryRequest $request): JsonResponse
    {
        return response()->json([], SystemSetting::STATUS_CREATE, $this->locationHeader(MeasurementCategory::create($request->validated())));
    }

    public function update(MeasurementCategoryRequest $request, MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->update($request->validated());
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function destroy(MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new MeasurementCategory(), $request);
        return response()->json([], SystemSetting::STATUS_DELETE);
    }
}
