<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\CountryMassDestroyRequest;
use App\Http\Requests\Store\CountryStoreRequest;
use App\Http\Requests\Update\CountryUpdateRequest;
use App\Http\Resources\Collection\CountryCollection;
use App\Http\Resources\Resource\CountryResource;
use App\Http\Resources\Slug\CountrySlugResource;
use App\Models\Country;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountryController
{
    use ControllerHelperTrait;

    public function index(Request $request): CountryCollection
    {
        $model = new Country();
        $model = $this->searchSortThenPaginate($model, $request);
        return new CountryCollection($model);
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

    public function slug(Country $Country): JsonResponse
    {
        return response()->json(new CountrySlugResource($Country));
    }

    public function option(Request $request): JsonResponse
    {
        $country = new Country();
        if ($request->search) {
            $country = $country->countryName($request->search);
        }
        $country = $country->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(CountrySlugResource::collection($country));
    }
}
