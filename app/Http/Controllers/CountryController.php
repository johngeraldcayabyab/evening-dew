<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\CountryMassDestroyRequest;
use App\Http\Requests\Store\CountryStoreRequest;
use App\Http\Requests\Update\CountryUpdateRequest;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\CountryResource;
use App\Models\Country;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CountryController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Country();
        $model = $this->searchSortThenPaginate($model, $request);
        return CountryResource::collection($model);
    }

    public function show(Country $Country): JsonResponse
    {
        return response()->json(new CountryResource($Country));
    }

    public function store(CountryStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Country::create($request->validated())));
    }

    public function update(CountryUpdateRequest $request, Country $country): JsonResponse
    {
        $country->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Country $country): JsonResponse
    {
        $country->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(CountryMassDestroyRequest $request): JsonResponse
    {
        Country::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Country(), $request);
        return response()->json(OptionResource::collection($model));
    }
}
