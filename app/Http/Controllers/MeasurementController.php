<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\MeasurementMassDestroyRequest;
use App\Http\Requests\Store\MeasurementStoreRequest;
use App\Http\Requests\Update\MeasurementUpdateRequest;
use App\Http\Resources\Collection\MeasurementCollection;
use App\Http\Resources\Resource\MeasurementResource;
use App\Http\Resources\Slug\MeasurementSlugResource;
use App\Models\GlobalSetting;
use App\Models\Measurement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Measurement();
        $model = $this->searchSortThenPaginate($model, $request);
        return new MeasurementCollection($model);
    }

    public function show(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementResource($measurement));
    }

    public function store(MeasurementStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Measurement::create($request->validated())));
    }

    public function update(MeasurementUpdateRequest $request, Measurement $measurement): JsonResponse
    {
        $measurement->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Measurement $measurement): JsonResponse
    {
        $measurement->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(MeasurementMassDestroyRequest $request): JsonResponse
    {
        Measurement::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementSlugResource($measurement));
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Measurement(), $request);
        return response()->json(MeasurementSlugResource::collection($model));
    }

    public function initial_values()
    {
        $inventoryDefaultMeasurementCategory = GlobalSetting::latestFirst()->inventoryDefaultMeasurementCategory;
        return [
            'type' => Measurement::REFERENCE,
            'ratio' => 1,
            'rounding_precision' => 0.01,
            'measurement_category' => $inventoryDefaultMeasurementCategory,
            'measurement_category_id' => $inventoryDefaultMeasurementCategory->id,
        ];
    }
}
