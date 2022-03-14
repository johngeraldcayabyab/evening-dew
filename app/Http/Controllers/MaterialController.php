<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\MaterialMassDestroyRequest;
use App\Http\Requests\Store\MaterialStoreRequest;
use App\Http\Requests\Update\MaterialUpdateRequest;
use App\Http\Resources\Collection\MaterialCollection;
use App\Http\Resources\Resource\MaterialResource;
use App\Http\Resources\Slug\MaterialSlugResource;
use App\Models\GlobalSetting;
use App\Models\Material;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MaterialController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Material();
        $model = $this->searchSortThenPaginate($model, $request);
        return new MaterialCollection($model);
    }

    public function show(Material $material): JsonResponse
    {
        return response()->json(new MaterialResource($material));
    }

    public function store(MaterialStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Material::create($request->validated())));
    }

    public function update(MaterialUpdateRequest $request, Material $material): JsonResponse
    {
        $material->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Material $material): JsonResponse
    {
        $material->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(MaterialMassDestroyRequest $request): JsonResponse
    {
        Material::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Material $material): JsonResponse
    {
        return response()->json(new MaterialSlugResource($material));
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Material(), $request);
        return response()->json(MaterialSlugResource::collection($model));
    }

    public function initial_values()
    {
        $inventoryDefaultMeasurement = GlobalSetting::latestFirst()->inventoryDefaultMeasurement;
        return [
            'quantity' => 1,
            'measurement_id' => $inventoryDefaultMeasurement->id,
            'material_type' => Material::MANUFACTURE_THIS_PRODUCT,
            'measurement' => $inventoryDefaultMeasurement,
        ];
    }
}
