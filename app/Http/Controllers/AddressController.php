<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\AddressStoreRequest;
use App\Http\Requests\Update\AddressUpdateRequest;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AddressController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Address();
        $model = $model->filterAndOrder($request);
        return AddressResource::collection($model);
    }

    public function show(Address $address): JsonResponse
    {
        return response()->json(new AddressResource($address));
    }

    public function store(AddressStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Address::create($request->validated())));
    }

    public function update(AddressUpdateRequest $request, Address $address): JsonResponse
    {
        $address->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Address $address): JsonResponse
    {
        $address->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Address(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        $generalDefaultCountry = GlobalSetting::latestFirst()->generalDefaultCountry;
        return [
            'country' => $generalDefaultCountry,
            'country_id' => $generalDefaultCountry->id,
            'type' => Address::DEFAULT
        ];
    }
}
