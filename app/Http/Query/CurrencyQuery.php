<?php

namespace App\Http\Query;

class CurrencyQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'currency') {
                $model = $model->orderByCurrency($request->orderByDirection);
            }
            if ($request->orderByColumn === 'name') {
                $model = $model->orderByName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'unit') {
                $model = $model->orderByUnit($request->orderByDirection);
            }
            if ($request->orderByColumn === 'sub_unit') {
                $model = $model->orderBySubUnit($request->orderByDirection);
            }
            if ($request->orderByColumn === 'rounding_factor') {
                $model = $model->orderByRoundingFactor($request->orderByDirection);
            }
            if ($request->orderByColumn === 'decimal_places') {
                $model = $model->orderByDecimalPlaces($request->orderByDirection);
            }
            if ($request->orderByColumn === 'symbol') {
                $model = $model->orderBySymbol($request->orderByDirection);
            }
            if ($request->orderByColumn === 'symbol_position') {
                $model = $model->orderBySymbolPosition($request->orderByDirection);
            }
            if ($request->orderByColumn === 'created_at') {
                $model = $model->orderByCreatedAt($request->orderByDirection);
            }
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    public function search($model, $request)
    {
        if ($request->currency) {
            $model = $model->whereCurrency($request->currency);
        }
        if ($request->name) {
            $model = $model->whereName($request->name);
        }
        if ($request->unit) {
            $model = $model->whereUnit($request->unit);
        }
        if ($request->sub_unit) {
            $model = $model->whereSubUnit($request->sub_unit);
        }
        if ($request->rounding_factor) {
            $model = $model->whereRoundingFactor($request->rounding_factor);
        }
        if ($request->decimal_places) {
            $model = $model->whereDecimalPlaces($request->decimal_places);
        }
        if ($request->symbol) {
            $model = $model->whereSymbol($request->symbol);
        }
        if ($request->symbol_position) {
            $model = $model->whereSymbolPosition($request->symbol_position);
        }
        return $model;
    }
}
