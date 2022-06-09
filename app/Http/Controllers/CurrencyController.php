<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\CurrencyRequest;
use App\Http\Resources\CurrencyResource;
use App\Models\Currency;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CurrencyController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Currency();
        $model = $model->filterAndOrder($request);
        return CurrencyResource::collection($model);
    }

    public function show(Currency $currency): JsonResponse
    {
        return response()->json(new CurrencyResource($currency));
    }

    public function store(CurrencyRequest $request): JsonResponse
    {
        return $this->responseCreate(Currency::create($request->validated()));
    }

    public function update(CurrencyRequest $request, Currency $currency): JsonResponse
    {
        $currency->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Currency $currency): JsonResponse
    {
        $currency->delete();
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Currency(), $request);
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function initial_values()
    {
        return [
            'symbol_position' => Currency::AFTER_AMOUNT,
            'rounding_factor' => 0.010000,
            'decimal_places' => 2,
        ];
    }
}
