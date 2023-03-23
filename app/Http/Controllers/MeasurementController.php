<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasurementRequest;
use App\Http\Resources\MeasurementResource;
use App\Models\GlobalSetting;
use App\Models\Measurement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Measurement();
        $model = $model->filterAndOrder($request);
        return MeasurementResource::collection($model);
    }

    public function show(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementResource($measurement));
    }

    public function store(MeasurementRequest $request): JsonResponse
    {
        return $this->responseCreate(Measurement::create($request->validated()));
    }

    public function update(MeasurementRequest $request, Measurement $measurement): JsonResponse
    {
        $measurement->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Measurement $measurement): JsonResponse
    {
        $measurement->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Measurement(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $inventoryDefaultMeasurementCategory = GlobalSetting::latestFirst()->inventoryDefaultMeasurementCategory;
        return [
            'type' => Measurement::REFERENCE,
            'ratio' => Measurement::DEFAULT_RATIO,
            'rounding_precision' => Measurement::DEFAULT_ROUNDING_PRECISION,
            'measurement_category' => $inventoryDefaultMeasurementCategory,
            'measurement_category_id' => $inventoryDefaultMeasurementCategory->id,
        ];
    }
}
