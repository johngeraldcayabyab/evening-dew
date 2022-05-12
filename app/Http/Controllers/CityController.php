<?php

namespace App\Http\Controllers;

use App\Http\Requests\CityRequest;
use App\Http\Resources\CityResource;
use App\Models\City;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CityController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new City();
        $model = $model->filterAndOrder($request);
        return CityResource::collection($model);
    }

    public function show(City $city): JsonResponse
    {
        return response()->json(new CityResource($city));
    }

    public function store(CityRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(City::create($request->validated())));
    }

    public function update(CityRequest $request, City $city): JsonResponse
    {
        $city->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(City $city): JsonResponse
    {
        $city->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new City(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
