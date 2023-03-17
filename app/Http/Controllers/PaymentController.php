<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\GlobalSetting;
use App\Models\Payment;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaymentController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Payment();
        $model = $model->filterAndOrder($request);
        return PaymentResource::collection($model);
    }

    public function show(Payment $payment): JsonResponse
    {
        return response()->json(new PaymentResource($payment));
    }

    public function store(PaymentRequest $request): JsonResponse
    {
        return $this->responseCreate(Payment::create($request->validated()));
    }

    public function update(PaymentRequest $request, Payment $payment): JsonResponse
    {
        $payment->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Payment $payment): JsonResponse
    {
        $payment->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Payment(), $request);
        return $this->responseDelete();
    }

    public function initial_values()
    {
        $settings = GlobalSetting::latestFirst();
        $defaultCurrency = $settings->accountingDefaultCurrency;
        return [
            'payment_type' => Payment::SEND_MONEY,
            'partner_type' => Payment::VENDOR,
            'amount' => 0,
            'currency_id' => $defaultCurrency->id,
        ];
    }
}
