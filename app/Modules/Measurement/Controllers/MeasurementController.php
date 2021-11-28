<?php

namespace App\Modules\Measurement\Controllers;

use App\Modules\Measurement\Models\Measurement;
use App\Modules\Measurement\Requests\MeasurementMassDestroyRequest;
use App\Modules\Measurement\Requests\MeasurementStoreRequest;
use App\Modules\Measurement\Requests\MeasurementUpdateRequest;
use App\Modules\Measurement\Resources\MeasurementResource;
use App\Modules\Measurement\Resources\MeasurementSlugResource;
use Illuminate\Http\JsonResponse;

class MeasurementController
{
    public function index(): JsonResponse
    {
        return response()->json(MeasurementResource::collection(Measurement::orderBy('created_at', 'desc')->get()));
    }

    public function show(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementResource($measurement));
    }

    public function store(MeasurementStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('menus.show', Measurement::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
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

    public function mass_destroy(MeasurementMassDestroyRequest $request)
    {
        return $request->validated();
        Measurement::whereIn('id', $request->validated()['ids'])->delete();
        return response()->json([]);
    }

    public function slug(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementSlugResource($measurement));
    }
}
