<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\WarehouseMassDestroyRequest;
use App\Http\Requests\Store\WarehouseStoreRequest;
use App\Http\Requests\Update\WarehouseUpdateRequest;
use App\Http\Resources\Collection\WarehouseCollection;
use App\Http\Resources\Resource\WarehouseResource;
use App\Http\Resources\Slug\WarehouseSlugResource;
use App\Models\Warehouse;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WarehouseController
{
    use ControllerHelperTrait;

    public function index(Request $request): WarehouseCollection
    {
        $model = new Warehouse();
        $model = $this->searchSortThenPaginate($model, $request);
        return new WarehouseCollection($model);
    }

    public function show(Warehouse $warehouse): JsonResponse
    {
        return response()->json(new WarehouseResource($warehouse));
    }

    public function store(WarehouseStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Warehouse::create($request->validated())));
    }

    public function update(WarehouseUpdateRequest $request, Warehouse $warehouse): JsonResponse
    {
        $warehouse->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Warehouse $warehouse): JsonResponse
    {
        $warehouse->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(WarehouseMassDestroyRequest $request): JsonResponse
    {
        Warehouse::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Warehouse(), $request);
        return response()->json(WarehouseSlugResource::collection($model));
    }

    public function initial_values()
    {
        return [
            'manufacture_to_resupply' => true,
            'buy_to_resupply' => true,
        ];
    }
}
