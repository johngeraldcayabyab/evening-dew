<?php

namespace App\Http\Query;

class MeasurementQuery
{
    public function sort($model, $request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            if ($request->orderByColumn === 'name') {
                $model = $model->orderByName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'type') {
                $model = $model->orderByType($request->orderByDirection);
            }
            if ($request->orderByColumn === 'ratio') {
                $model = $model->orderByRatio($request->orderByDirection);
            }
            if ($request->orderByColumn === 'rounding_precision') {
                $model = $model->orderByRoundingPrecision($request->orderByDirection);
            }
            if ($request->orderByColumn === 'measurement_category') {
                $model = $model->orderByMeasurementCategory($request->orderByDirection);
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
