<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperationTypeRequest;
use App\Http\Resources\OperationTypeResource;
use App\Models\OperationType;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OperationTypeController extends Controller
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
        return $this->responseCreate(OperationType::create($request->validated()));
    }

    public function update(OperationTypeRequest $request, OperationType $operationType): JsonResponse
    {
        $operationType->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(OperationType $operationType): JsonResponse
    {
        $operationType->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new OperationType(), $request);
        return $this->responseDelete();
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
