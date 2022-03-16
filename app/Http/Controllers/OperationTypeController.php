<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\OperationTypeMassDestroyRequest;
use App\Http\Requests\Store\OperationTypeStoreRequest;
use App\Http\Requests\Update\OperationTypeUpdateRequest;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return OperationTypeResource::collection($model);
    }

    public function show(OperationType $operationType): JsonResponse
    {
        return response()->json(new OperationTypeResource($operationType));
    }

    public function store(OperationTypeStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(OperationType::create($request->validated())));
    }

    public function update(OperationTypeUpdateRequest $request, OperationType $operationType): JsonResponse
    {
        $operationType->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(OperationType $operationType): JsonResponse
    {
        $operationType->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(OperationTypeMassDestroyRequest $request): JsonResponse
    {
        OperationType::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): ResourceCollection
    {
        $model = $this->searchThenSort(new OperationType(), $request);
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get();
        return OperationTypeResource::collection($model);
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
