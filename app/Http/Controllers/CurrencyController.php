<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\CurrencyMassDestroyRequest;
use App\Http\Requests\Store\CurrencyStoreRequest;
use App\Http\Requests\Update\CurrencyUpdateRequest;
use App\Http\Resources\Collection\CurrencyCollection;
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
        $headers = location_header(route('currencies.show', Currency::create($request->validated())));
        return response()->json([], STATUS_CREATE, $headers);
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

    public function slug(Currency $currency): JsonResponse
    {
        return response()->json(new CurrencySlugResource($currency));
    }

    public function option(Request $request): JsonResponse
    {
        $currency = new Currency();
        if ($request->search) {
            $currency = $currency->where('currency', 'like', "%$request->search%");
        }
        $currency = $currency->limit(SystemSetting::OPTION_LIMIT)->get();
        return response()->json(CurrencySlugResource::collection($currency));
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
