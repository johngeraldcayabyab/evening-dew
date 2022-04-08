<?php

namespace App\Http\Controllers;

use App\Events\MatchStockMovementToTransferLine;
use App\Http\Requests\StockMovementRequest;
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
        $model = $model->filterAndOrder($request);
        return StockMovementResource::collection($model);
    }

    public function show(StockMovement $stockMovement): JsonResponse
    {
        return response()->json(new StockMovementResource($stockMovement));
    }

    public function store(StockMovementRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(StockMovement::create($request->validated())));
    }

    public function update(StockMovementRequest $request, StockMovement $stockMovement): JsonResponse
    {
        $stockMovement->update($request->validated());
        MatchStockMovementToTransferLine::dispatch($stockMovement);
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(StockMovement $stockMovement): JsonResponse
    {
        $stockMovement->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new StockMovement(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [];
    }
}
