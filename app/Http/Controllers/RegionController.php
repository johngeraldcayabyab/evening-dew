<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Http\Resources\AddressResource;
use App\Models\Region;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RegionController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Region();
        $model = $model->filterAndOrder($request);
        return AddressResource::collection($model);
    }

    public function show(Region $address): JsonResponse
    {
        return response()->json(new AddressResource($address));
    }

    public function store(AddressRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Region::create($request->validated())));
    }

    public function update(AddressRequest $request, Region $address): JsonResponse
    {
        $address->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Region $address): JsonResponse
    {
        $address->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Region(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        $generalDefaultCountry = GlobalSetting::latestFirst()->generalDefaultCountry;
        return [
            'country' => $generalDefaultCountry,
            'country_id' => $generalDefaultCountry->id,
            'type' => Region::DEFAULT
        ];
    }
}
