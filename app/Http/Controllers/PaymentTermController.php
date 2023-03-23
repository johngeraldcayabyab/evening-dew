<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentTermRequest;
use App\Http\Resources\PaymentTermResource;
use App\Models\PaymentTerm;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PaymentTermController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new PaymentTerm();
        $model = $model->filterAndOrder($request);
        return PaymentTermResource::collection($model);
    }

    public function show(PaymentTerm $paymentTerm): JsonResponse
    {
        return response()->json(new PaymentTermResource($paymentTerm));
    }

    public function store(PaymentTermRequest $request): JsonResponse
    {
        return $this->responseCreate(PaymentTerm::create($request->validated()));
    }

    public function update(PaymentTermRequest $request, PaymentTerm $paymentTerm): JsonResponse
    {
        $paymentTerm->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(PaymentTerm $paymentTerm): JsonResponse
    {
        $paymentTerm->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new PaymentTerm(), $request);
        return $this->responseDelete();
    }
}
