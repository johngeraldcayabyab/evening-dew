<?php

namespace App\Http\Query;

class MeasurementCategoryQuery
{
    public function sort($model, $request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            if ($request->orderByColumn === 'name') {
                $model = $model->orderByName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'created_at') {
                $model = $model->orderByCreatedAt($request->orderByDirection);
            }
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }
}
