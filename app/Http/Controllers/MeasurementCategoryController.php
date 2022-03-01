<?php

namespace App\Http\Controllers;


use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\MeasurementCategoryMassDestroyRequest;
use App\Http\Requests\Store\MeasurementCategoryStoreRequest;
use App\Http\Requests\Update\MeasurementCategoryUpdateRequest;
use App\Http\Resources\Collection\MeasurementCategoryCollection;
use App\Http\Resources\Resource\MeasurementCategoryResource;
use App\Http\Resources\Slug\MeasurementCategorySlugResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return new MeasurementCategoryCollection($model);
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

    public function mass_destroy(MeasurementCategoryMassDestroyRequest $request): JsonResponse
    {
        MeasurementCategory::massDelete($request->validated()['ids']);
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
            $model = $model->name($request->search);
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(MeasurementCategorySlugResource::collection($model));
    }
}
