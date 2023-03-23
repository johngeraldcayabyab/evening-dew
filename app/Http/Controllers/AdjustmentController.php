<?php

namespace App\Http\Controllers;

use App\Events\AdjustmentValidated;
use App\Http\Requests\AdjustmentRequest;
use App\Http\Resources\AdjustmentResource;
use App\Models\Adjustment;
use App\Models\AdjustmentLine;
use App\Models\GlobalSetting;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class AdjustmentController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Adjustment();
        $model = $model->filterAndOrder($request);
        return AdjustmentResource::collection($model);
    }

    public function show(Adjustment $adjustment): JsonResponse
    {
        return response()->json(new AdjustmentResource($adjustment));
    }

    public function store(AdjustmentRequest $request): JsonResponse
    {
        $data = $request->validated();
        $adjustmentData = Arr::except($data, ['adjustment_lines']);
        $adjustment = Adjustment::create($adjustmentData);
        if (isset($data['adjustment_lines'])) {
            $adjustmentLinesData = $data['adjustment_lines'];
            AdjustmentLine::massUpsert($adjustmentLinesData, $adjustment);
        }
        if ($adjustment->status === Adjustment::DONE) {
            AdjustmentValidated::dispatch($adjustment);
        }
        return $this->responseCreate($adjustment);
    }

    public function update(AdjustmentRequest $request, Adjustment $adjustment): JsonResponse
    {
        $data = $request->validated();
        $adjustmentData = Arr::except($data, ['adjustment_lines', 'adjustment_lines_deleted']);
        $adjustment->update($adjustmentData);
        if (isset($data['adjustment_lines'])) {
            $adjustmentLinesData = $data['adjustment_lines'];
            AdjustmentLine::massUpsert($adjustmentLinesData, $adjustment);
        }
        if (isset($data['adjustment_lines_deleted'])) {
            AdjustmentLine::massDelete(collect($data['adjustment_lines_deleted'])->pluck('id'));
        }
        if ($adjustment->status === Adjustment::DONE) {
            AdjustmentValidated::dispatch($adjustment);
        }
        return $this->responseUpdate();
    }

    public function destroy(Adjustment $adjustment): JsonResponse
    {
        $adjustment->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Adjustment(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $globalSetting = GlobalSetting::latestFirst();
        $inventoryDefaultWarehouse = $globalSetting->inventoryDefaultWarehouse;
        $inventoryDefaultProductCategory = $globalSetting->inventoryDefaultProductCategory;
        $adjustmentOperationType = $inventoryDefaultWarehouse->adjustmentOperationType;
        return [
            'number' => Sequence::generateSequence($adjustmentOperationType->reference_sequence_id),
            'status' => Adjustment::DRAFT,
            'warehouse_id' => $inventoryDefaultWarehouse->id,
            'product_category_id' => $inventoryDefaultProductCategory->id,
        ];
    }
}
