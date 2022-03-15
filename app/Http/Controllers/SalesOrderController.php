<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Http\Requests\MassDestroy\SalesOrderMassDestroyRequest;
use App\Http\Requests\Store\SalesOrderStoreRequest;
use App\Http\Requests\Update\SalesOrderUpdateRequest;
use App\Http\Resources\Collection\SalesOrderCollection;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\SalesOrderResource;
use App\Http\Resources\Slug\SalesOrderSlugResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return new SalesOrderCollection($model);
    }

    public function show(SalesOrder $salesOrder): JsonResponse
    {
        return response()->json(new SalesOrderResource($salesOrder));
    }

    public function store(SalesOrderStoreRequest $request): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines']);
        $salesOrder = SalesOrder::create($salesOrderData);
        if (isset($data['sales_order_lines'])) {
            $salesOrderLinesData = $data['sales_order_lines'];
            SalesOrderLine::insertMany($salesOrderLinesData, $salesOrder->id);
        }
        if ($salesOrder->status === SalesOrder::DONE) {
            SalesOrderValidatedEvent::dispatch($salesOrder);
        }
        return response()->json([], STATUS_CREATE, $this->locationHeader($salesOrder));
    }

    public function update(SalesOrderUpdateRequest $request, SalesOrder $salesOrder): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines']);
        $salesOrder->update($salesOrderData);
        if (isset($data['sales_order_lines'])) {
            $salesOrderLinesData = $data['sales_order_lines'];
            SalesOrderLine::updateOrCreateMany($salesOrderLinesData, $salesOrder->id);
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

    public function mass_destroy(SalesOrderMassDestroyRequest $request): JsonResponse
    {
        SalesOrder::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new SalesOrder(), $request);
        return response()->json(OptionResource::collection($model));
    }

    public function initial_values()
    {
        return [
            'quotation_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'measurement' => GlobalSetting::latestFirst()->inventoryDefaultSalesMeasurement,
            'number' => Sequence::generateSalesOrderSequence(),
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
            'salesperson_id' => auth()->user()->id,
            'salesperson' => auth()->user(),
            'status' => Transfer::DRAFT,
        ];
    }
}
