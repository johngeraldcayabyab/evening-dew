<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Query\MeasurementQuery;
use App\Http\Requests\MassDestroy\MeasurementMassDestroyRequest;
use App\Http\Requests\Store\MeasurementStoreRequest;
use App\Http\Requests\Update\MeasurementUpdateRequest;
use App\Http\Resources\Collection\MeasurementCollection;
use App\Http\Resources\Resource\MeasurementResource;
use App\Http\Resources\Slug\MeasurementSlugResource;
use App\Models\Measurement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementController
{
    public function index(Request $request): ResourceCollection
    {
        $model = new Measurement();
        $requestQuery = new MeasurementQuery();
        $model = $requestQuery->search($model, $request);
        $model = $requestQuery->sort($model, $request);
        return new MeasurementCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementResource($measurement));
    }

    public function store(MeasurementStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('measurements.show', Measurement::create($request->validated())));
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

    public function mass_destroy(MeasurementMassDestroyRequest $request): JsonResponse
    {
        Measurement::whereIn('id', $request->validated()['ids'])->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Measurement $measurement): JsonResponse
    {
        return response()->json(new MeasurementSlugResource($measurement));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new Measurement();
        if ($request->search) {
            $model = $model->where('label', 'like', "%$request->search%");
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(MeasurementSlugResource::collection($model));
    }
}
