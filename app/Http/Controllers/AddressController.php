<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
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

    public function store(AddressRequest $request): JsonResponse
    {
        return $this->responseCreate(Address::create($request->validated()));
    }

    public function update(AddressRequest $request, Address $address): JsonResponse
    {
        $address->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Address $address): JsonResponse
    {
        $address->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Address(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $generalDefaultCountry = GlobalSetting::latestFirst()->generalDefaultCountry;
        return [
            'country' => $generalDefaultCountry,
            'country_id' => $generalDefaultCountry->id,
            'type' => Address::OTHERS
        ];
    }
}
