<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasurementRequest;
use App\Http\Resources\MeasurementResource;
use App\Http\Resources\MeasurementSlugResource;
use App\Models\Measurement;
use Illuminate\Http\JsonResponse;

class MeasurementController extends Controller
{
    public function index(): JsonResponse
    {
        return $this->responseRead(MeasurementResource::collection(Measurement::orderBy('created_at', 'desc')->get()));
    }

    public function show(Measurement $measurementCategory): JsonResponse
    {
        return $this->responseRead(new MeasurementResource($measurementCategory));
    }

    public function store(MeasurementRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new Measurement());
        return $this->responseCreate($model);
    }

    public function update(MeasurementRequest $request, Measurement $measurementCategory): JsonResponse
    {
        $this->persistUpdate($request, $measurementCategory);
        return $this->responseUpdate();
    }

    public function destroy(Measurement $measurementCategory): JsonResponse
    {
        $measurementCategory->delete();
        return $this->responseDelete();
    }

    public function slug(Measurement $measurementCategory): JsonResponse
    {
        return $this->responseRead(new MeasurementSlugResource($measurementCategory));
    }
}
