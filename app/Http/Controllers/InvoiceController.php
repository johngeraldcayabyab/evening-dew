<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Currency;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class InvoiceController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Invoice();
        $model = $model->filterAndOrder($request);
        return InvoiceResource::collection($model);
    }

    public function show(Invoice $invoice): JsonResponse
    {
        return response()->json(new InvoiceResource($invoice));
    }

    public function store(InvoiceRequest $request): JsonResponse
    {
        $data = $request->validated();
        $invoiceData = Arr::except($data, ['invoice_lines']);
        $invoice = Invoice::create($invoiceData);
        if (isset($data['invoice_lines'])) {
            $invoiceLinesData = $data['invoice_lines'];
            InvoiceLine::massUpsert($invoiceLinesData, $invoice);
        }
        return $this->responseCreate($invoice);
    }

    public function update(InvoiceRequest $request, Invoice $invoice): JsonResponse
    {
        $data = $request->validated();
        $invoiceData = Arr::except($data, ['invoice_lines', 'invoice_lines_deleted']);
        $invoice->update($invoiceData);
        if (isset($data['invoice_lines'])) {
            $invoiceLinesData = $data['invoice_lines'];
            InvoiceLine::massUpsert($invoiceLinesData, $invoice);
        }
        if (isset($data['invoice_lines_deleted'])) {
            InvoiceLine::massDelete(collect($data['invoice_lines_deleted'])->pluck('id'));
        }
        return $this->responseUpdate();
    }

    public function destroy(Invoice $invoice): JsonResponse
    {
        $invoice->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Invoice(), $request);
        return $this->responseDelete();
    }

    public function initial_values(Request $request)
    {
        $defaultCurrency = Currency::default();
        $initialValues = [
            'number' => Sequence::generateInvoiceSequence(),
            'currency_id' => $defaultCurrency->id,
            'currency' => $defaultCurrency,
            'salesperson_id' => auth()->user()->id,
            'salesperson' => auth()->user(),
            'status' => Invoice::DRAFT,
        ];
        return $initialValues;
    }
}
