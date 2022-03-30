<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\LocationMassDestroyRequest;
use App\Http\Requests\Store\LocationStoreRequest;
use App\Http\Requests\Update\LocationUpdateRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LocationController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Location();
        $model = $model->filterAndOrder($request);
        return LocationResource::collection($model);
    }

    public function show(Location $location): JsonResponse
    {
        return response()->json(new LocationResource($location));
    }

    public function store(LocationStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Location::create($request->validated())));
    }

    public function update(LocationUpdateRequest $request, Location $location): JsonResponse
    {
        $location->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Location $location): JsonResponse
    {
        $location->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(LocationMassDestroyRequest $request): JsonResponse
    {
        Location::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'type' => Location::INTERNAL
        ];
    }
}
