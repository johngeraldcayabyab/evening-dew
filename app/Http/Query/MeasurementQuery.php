<?php

namespace App\Http\Query;

class MeasurementQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'name',
                'type',
                'ratio',
                'rounding_precision',
                'measurement_category',
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
            'type',
            'ratio',
            'rounding_precision',
            'measurement_category',
        ]);
    }
}
