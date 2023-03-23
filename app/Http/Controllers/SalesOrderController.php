<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidated;
use App\Http\Requests\SalesOrderRequest;
use App\Http\Resources\SalesOrderResource;
use App\Models\GlobalSetting;
use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use App\Models\Sequence;
use App\Models\Source;
use App\Models\Transfer;
use App\Traits\ControllerHelperTrait;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class SalesOrderController extends Controller
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
            SalesOrderLine::massUpsert($salesOrderLinesData, $salesOrder);
        }
        if ($salesOrder->status === SalesOrder::DONE) {
            SalesOrderValidated::dispatch($salesOrder);
        }
        return $this->responseCreate($salesOrder);
    }

    public function update(SalesOrderRequest $request, SalesOrder $salesOrder): JsonResponse
    {
        $data = $request->validated();
        $salesOrderData = Arr::except($data, ['sales_order_lines', 'sales_order_lines_deleted']);
        $salesOrder->update($salesOrderData);
        if (isset($data['sales_order_lines'])) {
            $salesOrderLinesData = $data['sales_order_lines'];
            SalesOrderLine::massUpsert($salesOrderLinesData, $salesOrder);
        }
        if (isset($data['sales_order_lines_deleted'])) {
            SalesOrderLine::massDelete(collect($data['sales_order_lines_deleted'])->pluck('id'));
        }
        if ($salesOrder->status === SalesOrder::DONE) {
            SalesOrderValidated::dispatch($salesOrder);
        }
        return $this->responseUpdate();
    }

    public function destroy(SalesOrder $salesOrder): JsonResponse
    {
        $salesOrder->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new SalesOrder(), $request);
        return $this->responseDelete();
    }

    public function initial_values(Request $request)
    {
        $salesOrderSequence = Sequence::where('sequence_code', 'sales_order.sequence')->first();
        $salesOrderSequenceNumber = Sequence::generateSequence($salesOrderSequence->id);
        $initialValues = [
            'shipping_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'quotation_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'measurement' => GlobalSetting::latestFirst()->inventoryDefaultSalesMeasurement,
            'number' => $salesOrderSequenceNumber,
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
            'shipping_method' => Transfer::DELIVERY,
            'salesperson_id' => auth()->user()->id,
            'salesperson' => auth()->user(),
            'status' => SalesOrder::DRAFT,
        ];
        $sourceId = (int)$request->source_id;
        if ($sourceId) {
            $initialValues['source_id'] = $sourceId;
            $initialValues['source'] = Source::find($sourceId);
        }

        return $initialValues;
    }

    public function sales_per_day(Request $request)
    {
        $requestFrom = $request->from;
        $requestTo = $request->to;
        $from = Carbon::parse("{$requestFrom} 00:00:00");
        $to = Carbon::parse("{$requestTo} 23:59:59");
        $salesPerDay = DB::table('sales_orders')
            ->selectRaw('DATE(quotation_date) as time, SUM(subtotal) as total')
            ->whereBetween('quotation_date', [$from, $to])
            ->groupBy('time')
            ->orderBy('time', 'asc')
            ->get();
        return $salesPerDay;
    }
}
