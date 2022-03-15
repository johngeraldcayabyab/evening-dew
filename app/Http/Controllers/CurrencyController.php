<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\CurrencyMassDestroyRequest;
use App\Http\Requests\Store\CurrencyStoreRequest;
use App\Http\Requests\Update\CurrencyUpdateRequest;
use App\Http\Resources\Collection\CurrencyCollection;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\CurrencyResource;
use App\Http\Resources\Slug\CurrencySlugResource;
use App\Models\Currency;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CurrencyController
{
    use ControllerHelperTrait;

    public function index(Request $request): CurrencyCollection
    {
        $model = new Currency();
        $model = $this->searchSortThenPaginate($model, $request);
        return new CurrencyCollection($model);
    }

    public function show(Currency $currency): JsonResponse
    {
        return response()->json(new CurrencyResource($currency));
    }

    public function store(CurrencyStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Currency::create($request->validated())));
    }

    public function update(CurrencyUpdateRequest $request, Currency $currency): JsonResponse
    {
        $currency->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Currency $currency): JsonResponse
    {
        $currency->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(CurrencyMassDestroyRequest $request): JsonResponse
    {
        Currency::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Currency(), $request);
        return response()->json(OptionResource::collection($model));
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
