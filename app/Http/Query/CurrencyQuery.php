<?php

namespace App\Http\Query;

class CurrencyQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'currency',
                'name',
                'unit',
                'sub_unit',
                'rounding_factor',
                'decimal_places',
                'symbol',
                'symbol_position',
                'created_at',
            ]);
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    public function search($model, $request)
    {
        return $this->isSearchField($model, $request, [
            'currency',
            'name',
            'unit',
            'sub_unit',
            'rounding_factor',
            'decimal_places',
            'symbol',
            'symbol_position',
        ]);
    }
}
