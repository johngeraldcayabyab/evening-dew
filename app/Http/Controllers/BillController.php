<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\BillRequest;
use App\Http\Resources\BillResource;
use App\Models\Bill;
use App\Models\BillLine;
use App\Models\Currency;
use App\Models\Journal;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class BillController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Bill();
        $model = $model->filterAndOrder($request);
        return BillResource::collection($model);
    }

    public function show(Bill $bill): JsonResponse
    {
        return response()->json(new BillResource($bill));
    }

    public function store(BillRequest $request): JsonResponse
    {
        $data = $request->validated();
        $billData = Arr::except($data, ['bill_lines']);
        $bill = Bill::create($billData);
        if (isset($data['bill_lines'])) {
            $billLinesData = $data['bill_lines'];
            BillLine::massUpsert($billLinesData, $bill);
        }
        return $this->responseCreate($bill);
    }

    public function update(BillRequest $request, Bill $bill): JsonResponse
    {
        $data = $request->validated();
        $billData = Arr::except($data, ['bill_lines', 'bill_lines_deleted']);
        $bill->update($billData);
        if (isset($data['bill_lines'])) {
            $billLinesData = $data['bill_lines'];
            BillLine::massUpsert($billLinesData, $bill);
        }
        if (isset($data['bill_lines_deleted'])) {
            BillLine::massDelete(collect($data['bill_lines_deleted'])->pluck('id'));
        }
        return $this->responseUpdate();
    }

    public function destroy(Bill $bill): JsonResponse
    {
        $bill->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Bill(), $request);
        return $this->responseDelete();
    }

    public function initial_values(Request $request)
    {
        $defaultCurrency = Currency::default();
        $billSequence = Sequence::where('sequence_code', 'bills.sequence')->first();
        $billSequenceNumber = Sequence::generateSequence($billSequence->id);
        $dateNow = now()->format(SystemSetting::DATE_TIME_FORMAT);
        $initialValues = [
            'number' => $billSequenceNumber,
            'currency_id' => $defaultCurrency->id,
            'currency' => $defaultCurrency,
            'bill_date' => $dateNow,
            'accounting_date' => $dateNow,
            'due_date' => $dateNow,
            'status' => Bill::DRAFT,
            'journal_id' => Journal::where('type', Journal::PURCHASE)->first()->id,
        ];
        return $initialValues;
    }
}
