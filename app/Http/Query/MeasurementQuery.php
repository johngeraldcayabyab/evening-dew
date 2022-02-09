<?php

namespace App\Http\Query;

class MeasurementQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
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

    public function search($model, $request)
    {
        if ($request->name) {
            $model = $model->whereName($request->name);
        }
        if ($request->type) {
            $model = $model->whereType($request->type);
        }
        if ($request->ratio) {
            $model = $model->whereRatio($request->ratio);
        }
        if ($request->rounding_precision) {
            $model = $model->whereRoundingPrecision($request->rounding_precision);
        }
        if ($request->measurement_category) {
            $model = $model->whereMeasurementCategory($request->measurement_category);
        }
        return $model;
    }
}
