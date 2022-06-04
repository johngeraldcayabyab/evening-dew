<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Http\Requests\SalesOrderRequest;
use App\Http\Resources\SalesOrderResource;
use App\Models\GlobalSetting;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Sequence;
use App\Models\Transfer;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class SalesOrderController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new SalesOrder();
        $model = $model->filterAndOrder($request);
        return SalesOrderResource::collection($model);
    }

    public function show(SalesOrder $salesOrder): JsonResponse
    {
        return response()->json(new SalesOrderResource($salesOrder));
    }

    public function store(SalesOrderRequest $request): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines']);
        $salesOrder = SalesOrder::create($salesOrderData);
        if (isset($data['sales_order_lines'])) {
            $salesOrderLinesData = $data['sales_order_lines'];
            SalesOrderLine::massUpsert($salesOrderLinesData, $salesOrder->id);
        }
        if ($salesOrder->status === SalesOrder::DONE) {
            SalesOrderValidatedEvent::dispatch($salesOrder);
        }
        return response()->json([], STATUS_CREATE, $this->locationHeader($salesOrder));
    }

    public function update(SalesOrderRequest $request, SalesOrder $salesOrder): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines', 'sales_order_lines_deleted']);
        $salesOrder->update($salesOrderData);
        if (isset($data['sales_order_lines'])) {
            $salesOrderLinesData = $data['sales_order_lines'];
            SalesOrderLine::massUpsert($salesOrderLinesData, $salesOrder->id);
        }
        if (isset($data['sales_order_lines_deleted'])) {
            SalesOrderLine::massDelete(collect($data['sales_order_lines_deleted'])->pluck('id'));
        }
        if ($salesOrder->status === SalesOrder::DONE) {
            SalesOrderValidatedEvent::dispatch($salesOrder);
        }
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(SalesOrder $salesOrder): JsonResponse
    {
        $salesOrder->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new SalesOrder(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values(Request $request)
    {
        $initialValues = [
            'quotation_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'measurement' => GlobalSetting::latestFirst()->inventoryDefaultSalesMeasurement,
            'number' => Sequence::generateSalesOrderSequence(),
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
            'shipping_method' => Transfer::DELIVERY,
            'salesperson_id' => auth()->user()->id,
            'salesperson' => auth()->user(),
            'status' => SalesOrder::DRAFT,
            'select_time' => '11_00_AM_01_00_PM',
            'vehicle_type' => SalesOrder::MOTORCYCLE,
        ];

        if ($request->source_id) {
            $initialValues['source_id'] = $request->source_id;
        }

        return $initialValues;
    }
}
