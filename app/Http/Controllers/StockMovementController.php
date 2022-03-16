<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\StockMovementMassDestroyRequest;
use App\Http\Requests\Store\StockMovementStoreRequest;
use App\Http\Requests\Update\StockMovementUpdateRequest;
use App\Http\Resources\StockMovementResource;
use App\Models\StockMovement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StockMovementController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new StockMovement();
        $model = $this->searchSortThenPaginate($model, $request);
        return StockMovementResource::collection($model);
    }

    public function show(StockMovement $stockMovement): JsonResponse
    {
        return response()->json(new StockMovementResource($stockMovement));
    }

    public function store(StockMovementStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(StockMovement::create($request->validated())));
    }

    public function update(StockMovementUpdateRequest $request, StockMovement $stockMovement): JsonResponse
    {
        $stockMovement->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(StockMovement $stockMovement): JsonResponse
    {
        $stockMovement->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(StockMovementMassDestroyRequest $request): JsonResponse
    {
        StockMovement::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [];
    }
}
