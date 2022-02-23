<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\SalesOrderMassDestroyRequest;
use App\Http\Requests\Store\SalesOrderStoreRequest;
use App\Http\Requests\Update\SalesOrderUpdateRequest;
use App\Http\Resources\Collection\SalesOrderCollection;
use App\Http\Resources\Resource\SalesOrderResource;
use App\Http\Resources\Slug\SalesOrderSlugResource;
use App\Models\GlobalSetting;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Sequence;
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
        $salesOrderLinesData = $data['sales_order_lines'];
        $salesOrder = SalesOrder::create($salesOrderData);
        SalesOrderLine::insertMany($salesOrderLinesData, $salesOrder->id);
        return response()->json([], STATUS_CREATE, $this->locationHeader($salesOrder));
    }

    public function update(SalesOrderUpdateRequest $request, SalesOrder $salesOrder): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines']);
        $salesOrder->update($salesOrderData);
        $salesOrderLinesData = $data['sales_order_lines'];
        SalesOrderLine::updateOrCreateMany($salesOrderLinesData, $salesOrder->id);
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

    public function slug(SalesOrder $salesOrder): JsonResponse
    {
        return response()->json(new SalesOrderSlugResource($salesOrder));
    }

    public function option(Request $request): JsonResponse
    {
        $model = new SalesOrder();
        if ($request->search) {
            $model = $model->where('number', 'like', "%$request->search%");
        }
        $model = $model->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(SalesOrderSlugResource::collection($model));
    }

    public function initial_values()
    {
//        $globalSetting = GlobalSetting::latestFirst();
//        $inventoryDefaultMeasurement = $globalSetting->inventoryDefaultMeasurement;
        return [
//            'measurement' => $inventoryDefaultMeasurement,
//            'measurement_id' => $inventoryDefaultMeasurement->id,
//            'sales_order_lines' => [
//                ['measurement_id' => $inventoryDefaultMeasurement->id]
//            ],
            'number' => Sequence::generateSalesOrderSequence()
        ];
    }
}
