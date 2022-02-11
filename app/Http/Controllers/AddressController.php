<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\AddressMassDestroyRequest;
use App\Http\Requests\Store\AddressStoreRequest;
use App\Http\Requests\Update\AddressUpdateRequest;
use App\Http\Resources\Collection\AddressCollection;
use App\Http\Resources\Resource\AddressResource;
use App\Http\Resources\Slug\AddressSlugResource;
use App\Models\Address;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddressController
{
    use ControllerHelperTrait;

    public function index(Request $request): AddressCollection
    {
        $model = new Address();
        $model = $this->searchThenSort($model, $request);
        return new AddressCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Address $address): JsonResponse
    {
        return response()->json(new AddressResource($address));
    }

    public function store(AddressStoreRequest $request): JsonResponse
    {
        $headers = location_header(route('addresses.show', Address::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
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

    public function slug(Address $address): JsonResponse
    {
        return response()->json(new AddressSlugResource($address));
    }

    public function option(Request $request): JsonResponse
    {
        $address = new Address();
        if ($request->search) {
            $address = $address->where('address_name', 'like', "%$request->search%");
        }
        $address = $address->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(AddressSlugResource::collection($address));
    }

    public function initial_values()
    {
        return [
//            'sales_measurement_id' => GlobalSetting::inventoryDefaultSalesMeasurement(),
            'type' => Address::DEFAULT
        ];
    }
}
