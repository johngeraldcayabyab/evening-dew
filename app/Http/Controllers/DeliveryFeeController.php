<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrencyRequest;
use App\Http\Resources\CurrencyResource;
use App\Http\Resources\DeliveryFeeResource;
use App\Models\DeliveryFee;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DeliveryFeeController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new DeliveryFee();
        $model = $model->filterAndOrder($request);
        return DeliveryFeeResource::collection($model);
    }

    public function show(DeliveryFee $deliveryFee): JsonResponse
    {
        return response()->json(new DeliveryFeeResource($deliveryFee));
    }

    public function store(CurrencyRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(DeliveryFee::create($request->validated())));
    }

    public function update(CurrencyRequest $request, DeliveryFee $currency): JsonResponse
    {
        $currency->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(DeliveryFee $currency): JsonResponse
    {
        $currency->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new DeliveryFee(), $request);
        return response()->json([], STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'symbol_position' => DeliveryFee::AFTER_AMOUNT,
            'rounding_factor' => 0.010000,
            'decimal_places' => 2,
        ];
    }
}
