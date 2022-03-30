<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperationTypeRequest;
use App\Http\Resources\OperationTypeResource;
use App\Models\OperationType;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OperationTypeController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new OperationType();
        $model = $model->filterAndOrder($request);
        return OperationTypeResource::collection($model);
    }

    public function show(OperationType $operationType): JsonResponse
    {
        return response()->json(new OperationTypeResource($operationType));
    }

    public function store(OperationTypeRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(OperationType::create($request->validated())));
    }

    public function update(OperationTypeRequest $request, OperationType $operationType): JsonResponse
    {
        $operationType->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(OperationType $operationType): JsonResponse
    {
        $operationType->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new OperationType(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'reservation_method' => OperationType::AT_CONFIRMATION,
            'show_detailed_operation' => true,
            'reservation_days_before' => 0,
            'reservation_days_before_priority' => 0,
        ];
    }
}
