<?php

namespace App\Http\Controllers;


use App\Http\Requests\Store\MeasurementCategoryStoreRequest;
use App\Http\Requests\Update\MeasurementCategoryUpdateRequest;
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

    public function store(MeasurementCategoryStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(MeasurementCategory::create($request->validated())));
    }

    public function update(MeasurementCategoryUpdateRequest $request, MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new MeasurementCategory(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
