<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\AddressMassDestroyRequest;
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
        $model = $this->searchSortThenPaginate($model, $request);
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

    public function mass_destroy(AddressMassDestroyRequest $request): JsonResponse
    {
        Address::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): ResourceCollection
    {
        $model = $this->searchThenSort(new Address(), $request);
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get();
        return AddressResource::collection($model);
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
