<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasureCategoryRequest;
use App\Http\Resources\MeasureCategoryResource;
use App\Models\MeasureCategory;
use Illuminate\Http\JsonResponse;

class MeasureCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->responseRead(MeasureCategoryResource::collection(MeasureCategory::orderBy('created_at', 'desc')->get()));
    }

    public function store(MeasureCategoryRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new MeasureCategory());
        return $this->responseCreate($model);
    }

    public function show(MeasureCategory $measureCategory): JsonResponse
    {
        return $this->responseRead(new MeasureCategoryResource($measureCategory));
    }

    public function update(MeasureCategoryRequest $request, MeasureCategory $measureCategory): JsonResponse
    {
        $this->persistUpdate($request, $measureCategory);
        return $this->responseUpdate();
    }

    public function destroy(MeasureCategory $measureCategory): JsonResponse
    {
        $measureCategory->delete();
        return $this->responseDelete();
    }
}
