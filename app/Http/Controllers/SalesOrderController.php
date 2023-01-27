<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Events\SmNorthPaidEvent;
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

class SalesOrderController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new SalesOrder();
        if ($request->same_day) {
            $today = Carbon::today()->format('Y-m-d');
            $from = $today . " 00:00:00";
            $to = $today . " 23:59:59";
            $date = "{$from},{$to}";
            $request->shipping_date = $date;
            if ($request->source_id !== 6) {
                $request->quotation_date = $date;
            }
        }
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
            SalesOrderValidatedEvent::dispatch($salesOrder);
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
            SalesOrderValidatedEvent::dispatch($salesOrder);
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
        $initialValues = [
//            'shipping_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'quotation_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'measurement' => GlobalSetting::latestFirst()->inventoryDefaultSalesMeasurement,
            'number' => Sequence::generateSalesOrderSequence(),
            'shipping_policy' => Transfer::AS_SOON_AS_POSSIBLE,
//            'shipping_method' => Transfer::DELIVERY,
            'salesperson_id' => auth()->user()->id,
            'salesperson' => auth()->user(),
            'status' => SalesOrder::DRAFT,
//            'select_time' => '11_00_AM_01_00_PM',
            'vehicle_type' => SalesOrder::MOTORCYCLE,
        ];
        $sourceId = (int)$request->source_id;
        if ($sourceId) {
            $initialValues['source_id'] = $sourceId;
            $initialValues['source'] = Source::find($sourceId);
            if ($sourceId === 6) {
                $initialValues['shipping_date'] = now()->format(SystemSetting::DATE_TIME_FORMAT);
            }
        }

        return $initialValues;
    }

    public function sales_per_day(Request $request)
    {
        $requestFrom = $request->from;
        $requestTo = $request->to;
        $from = Carbon::parse("{$requestFrom} 00:00:00");
        $to = Carbon::parse("{$requestTo} 23:59:59");

        $salesPerDay = [];

        if ($request->date_unit === 'date') {
            $salesPerDay = DB::table('sales_orders')
                ->selectRaw('DATE(shipping_date) as year, SUM(subtotal) as total')
                ->whereBetween('shipping_date', [$from, $to]);
            if ($request->source_id) {
                $salesPerDay = $salesPerDay->where('source_id', $request->source_id);
            }
            $salesPerDay = $salesPerDay
                ->groupBy('year')
                ->orderBy('year', 'desc')
                ->get();
        }

        if ($request->date_unit === 'month') {
            $salesPerDay = DB::table('sales_orders')
                ->selectRaw('YEAR(shipping_date) as year,MONTH(shipping_date) as month,  SUM(subtotal) as total')
                ->whereBetween('shipping_date', [$from, $to]);
            if ($request->source_id) {
                $salesPerDay = $salesPerDay->where('source_id', $request->source_id);
            }
            $salesPerDay = $salesPerDay
                ->groupBy('year')
                ->groupBy('month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get();
        }

        if ($request->date_unit === 'year') {
            $salesPerDay = DB::table('sales_orders')
                ->selectRaw('YEAR(shipping_date) as year, SUM(subtotal) as total')
                ->whereBetween('quotation_date', [$from, $to]);
            if ($request->source_id) {
                $salesPerDay = $salesPerDay->where('source_id', $request->source_id);
            }
            $salesPerDay = $salesPerDay
                ->groupBy('year')
                ->orderBy('year', 'desc')
                ->get();
        }

        return $salesPerDay;
    }

    public function update_status(Request $request, SalesOrder $salesOrder)
    {
        $steps = $request->steps;
        if ($steps === 'paid' && $salesOrder->source_id === 6) {
            SmNorthPaidEvent::dispatch($salesOrder);
        }

        $currentSteps = explode(",", $salesOrder->steps);

        if (!in_array($steps, $currentSteps)) {
            $currentSteps[] = $steps;
        } else {
            if (($key = array_search($steps, $currentSteps)) !== false) {
                unset($currentSteps[$key]);
            }
        }

        $newSteps = implode(",", $currentSteps);

        $salesOrder->steps = $newSteps;

        $salesOrder->save();
        return [];
    }
}
