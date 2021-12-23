<?php

namespace App\Http\Controllers;


use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\MeasurementCategoryMassDestroyRequest;
use App\Http\Requests\Store\MeasurementCategoryStoreRequest;
use App\Http\Requests\Update\MeasurementCategoryUpdateRequest;
use App\Http\Resources\Single\MeasurementCategoryResource;
use App\Http\Resources\Slug\MeasurementCategorySlugResource;
use App\Models\MeasurementCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MeasurementCategoryController
{
    public function index(Request $request): JsonResponse
    {
        $model = new MeasurementCategory();
        if ($request->name) {
            $model = $model->name($request->name);
        }
        return response()->json(MeasurementCategoryResource::collection($model->orderBy('created_at', 'desc')->get()));
    }

    public function show(MeasurementCategory $measurementCategory): JsonResponse
    {
        return response()->json(new MeasurementCategoryResource($measurementCategory));
    }

    public function store(MeasurementCategoryStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('menus.show', MeasurementCategory::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
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

    public function mass_destroy(MeasurementCategoryMassDestroyRequest $request): JsonResponse
    {
        MeasurementCategory::whereIn('id', $request->validated()['ids'])->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function slug(MeasurementCategory $measurementCategory): JsonResponse
    {
        return response()->json(new MeasurementCategorySlugResource($measurementCategory));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new MeasurementCategory();
        if ($request->search) {
            $model = $model->where('name', 'like', "%$request->search%");
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(MeasurementCategorySlugResource::collection($model));
    }
}
