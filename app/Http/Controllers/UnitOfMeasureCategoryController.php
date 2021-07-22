<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitOfMeasureCategoryRequest;
use App\Models\UnitOfMeasureCategory;
use Illuminate\Http\JsonResponse;

class UnitOfMeasureCategoryController extends Controller
{
    public function index()
    {
        return response()->json([UnitOfMeasureCategory::all()]);
    }

    public function store(UnitOfMeasureCategoryRequest $request)
    {
        $model = $this->persistCreate($request, new UnitOfMeasureCategory());
        return $this->responseCreate($model);
    }

    public function show(UnitOfMeasureCategory $unitOfMeasureCategory)
    {
        return response()->json($unitOfMeasureCategory);
    }

    public function update(UnitOfMeasureCategoryRequest $request, UnitOfMeasureCategory $unitOfMeasureCategory)
    {
        $this->persistUpdate($request, $unitOfMeasureCategory);
        return $this->responseUpdate();
    }

    public function destroy(UnitOfMeasureCategory $unitOfMeasureCategory)
    {
        $unitOfMeasureCategory->delete();
        return response()->json([], 204);
    }
}
