<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\WarehouseStoreRequest;
use App\Http\Requests\Update\WarehouseUpdateRequest;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WarehouseController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Warehouse();
        $model = $model->filterAndOrder($request);
        return WarehouseResource::collection($model);
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

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Warehouse(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'manufacture_to_resupply' => true,
            'buy_to_resupply' => true,
        ];
    }
}
