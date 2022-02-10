<?php

namespace App\Http\Query;

class CountryQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'country_name',
                'currency',
                'country_code',
                'country_calling_code',
                'vat_label',
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
            'country_name',
            'currency',
            'country_code',
            'country_calling_code',
            'vat_label',
            'measurement_category',
        ]);
    }
}
