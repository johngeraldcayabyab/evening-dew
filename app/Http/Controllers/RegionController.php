<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegionRequest;
use App\Http\Resources\RegionResource;
use App\Models\Region;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RegionController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Region();
        $model = $model->filterAndOrder($request);
        return RegionResource::collection($model);
    }

    public function show(Region $region): JsonResponse
    {
        return response()->json(new RegionResource($region));
    }

    public function store(RegionRequest $request): JsonResponse
    {
        return $this->responseCreate(Region::create($request->validated()));
    }

    public function update(RegionRequest $request, Region $region): JsonResponse
    {
        $region->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Region $region): JsonResponse
    {
        $region->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Region(), $request);
        return $this->responseDelete();
    }
}
