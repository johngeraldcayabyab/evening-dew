<?php

namespace App\Http\Controllers;

use App\Events\WarehouseCreated;
use App\Http\Requests\WarehouseRequest;
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

    public function store(WarehouseRequest $request): JsonResponse
    {
        $warehouse = Warehouse::create($request->validated());
        WarehouseCreated::dispatch($warehouse);
        return $this->responseCreate($warehouse);
    }

    public function update(WarehouseRequest $request, Warehouse $warehouse): JsonResponse
    {
        $warehouse->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Warehouse $warehouse): JsonResponse
    {
        $warehouse->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Warehouse(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        return [
            'manufacture_to_resupply' => Warehouse::DEFAULT_MANUFACTURE_TO_RESUPPLY,
            'buy_to_resupply' => Warehouse::DEFAULT_BUY_TO_RESUPPLY,
        ];
    }
}
