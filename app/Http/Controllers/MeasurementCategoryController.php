<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasurementCategoryRequest;
use App\Http\Resources\MeasurementCategoryResource;
use App\Models\MeasurementCategory;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementCategoryController extends Controller
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
        return $this->responseCreate(MeasurementCategory::create($request->validated()));
    }

    public function update(MeasurementCategoryRequest $request, MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(MeasurementCategory $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new MeasurementCategory(), $request);
        return $this->responseDelete();
    }
}
