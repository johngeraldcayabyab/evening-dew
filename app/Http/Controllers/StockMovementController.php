<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\StockMovementMassDestroyRequest;
use App\Http\Requests\Store\StockMovementStoreRequest;
use App\Http\Requests\Update\StockMovementUpdateRequest;
use App\Http\Resources\Collection\StockMovementCollection;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\StockMovementResource;
use App\Models\StockMovement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StockMovementController
{
    use ControllerHelperTrait;

    public function index(Request $request): StockMovementCollection
    {
        $model = new StockMovement();
        $model = $this->searchSortThenPaginate($model, $request);
        return new StockMovementCollection($model);
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

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new StockMovement(), $request);
        return response()->json(OptionResource::collection($model));
    }

    public function initial_values()
    {
        return [];
    }
}
