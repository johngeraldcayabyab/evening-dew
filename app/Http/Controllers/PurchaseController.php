<?php

namespace App\Http\Controllers;

use App\Events\PurchaseValidated;
use App\Http\Requests\PurchaseRequest;
use App\Http\Resources\PurchaseResource;
use App\Models\GlobalSetting;
use App\Models\Purchase;
use App\Models\PurchaseLine;
use App\Models\Sequence;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Arr;

class PurchaseController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Purchase();
        $model = $model->filterAndOrder($request);
        return PurchaseResource::collection($model);
    }

    public function show(Purchase $purchase): JsonResponse
    {
        return response()->json(new PurchaseResource($purchase));
    }

    public function store(PurchaseRequest $request): JsonResponse
    {
        $data = $request->validated();
        $purchaseData = Arr::except($data, ['purchase_lines']);
        $purchase = Purchase::create($purchaseData);
        if (isset($data['purchase_lines'])) {
            $purchaseLinesData = $data['purchase_lines'];
            PurchaseLine::massUpsert($purchaseLinesData, $purchase);
        }
        if ($purchase->status === Purchase::DONE) {
            PurchaseValidated::dispatch($purchase);
        }
        return $this->responseCreate($purchase);
    }

    public function update(PurchaseRequest $request, Purchase $purchase): JsonResponse
    {
        $data = $request->validated();
        $purchaseData = Arr::except($data, ['purchase_lines', 'purchase_lines_deleted']);
        $purchase->update($purchaseData);
        if (isset($data['purchase_lines'])) {
            $purchaseLinesData = $data['purchase_lines'];
            PurchaseLine::massUpsert($purchaseLinesData, $purchase);
        }
        if (isset($data['purchase_lines_deleted'])) {
            PurchaseLine::massDelete(collect($data['purchase_lines_deleted'])->pluck('id'));
        }
        if ($purchase->status === Purchase::DONE) {
            PurchaseValidated::dispatch($purchase);
        }
        return $this->responseUpdate();
    }

    public function destroy(Purchase $purchase): JsonResponse
    {
        $purchase->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Purchase(), $request);
        return $this->responseDelete();
    }

    public function initial_values(Request $request)
    {
        $settings = GlobalSetting::latestFirst();
        $defaultCurrency = $settings->accountingDefaultCurrency;
        $purchaseSequence = Sequence::where('sequence_code', 'purchase.sequence')->first();
        $purchaseSequenceNumber = Sequence::generateSequence($purchaseSequence->id);
        $initialValues = [
            'number' => $purchaseSequenceNumber,
            'currency_id' => $defaultCurrency->id,
            'currency' => $defaultCurrency,
            'purchase_representative_id' => auth()->user()->id,
            'purchase_representative' => auth()->user(),
            'status' => Purchase::DRAFT,
        ];
        return $initialValues;
    }
}
