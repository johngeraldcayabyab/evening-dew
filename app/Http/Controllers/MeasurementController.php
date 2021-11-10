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

    public function show(Measurement $measurement): JsonResponse
    {
        return $this->responseRead(new MeasurementResource($measurement));
    }

    public function store(MeasurementRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new Measurement());
        return $this->responseCreate($model);
    }

    public function update(MeasurementRequest $request, Measurement $measurement): JsonResponse
    {
        $this->persistUpdate($request, $measurement);
        return $this->responseUpdate();
    }

    public function destroy(Measurement $measurement): JsonResponse
    {
        $measurement->delete();
        return $this->responseDelete();
    }

    public function slug(Measurement $measurement): JsonResponse
    {
        return $this->responseRead(new MeasurementSlugResource($measurement));
    }
}
