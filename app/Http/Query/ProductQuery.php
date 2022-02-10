<?php

namespace App\Http\Query;

class ProductQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'name',
                'product_type',
                'invoicing_policy',
                'cost',
                'sales_price',
                'measurement',
                'purchase_measurement',
                'sales_measurement',
                'product_category',
                'internal_reference',
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
            'name',
            'product_type',
            'invoicing_policy',
            'cost',
            'sales_price',
            'measurement',
            'purchase_measurement',
            'sales_measurement',
            'product_category',
            'internal_reference',
        ]);
    }
}
