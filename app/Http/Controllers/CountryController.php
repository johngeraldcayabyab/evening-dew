<?php

namespace App\Http\Controllers;

use App\Http\Requests\CountryRequest;
use App\Http\Resources\CountryResource;
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
        $model = $model->filterAndOrder($request);
        return CountryResource::collection($model);
    }

    public function show(Country $Country): JsonResponse
    {
        return response()->json(new CountryResource($Country));
    }

    public function store(CountryRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Country::create($request->validated())));
    }

    public function update(CountryRequest $request, Country $country): JsonResponse
    {
        $country->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Country $country): JsonResponse
    {
        $country->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Country(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
