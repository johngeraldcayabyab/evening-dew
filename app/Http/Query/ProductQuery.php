<?php

namespace App\Http\Query;

class ProductQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'with_parents') {
                $model = $model->orderByCategory($request->orderByDirection);
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
        if ($request->with_parents) {
            $model = $model->whereCategory($request->with_parents);
        }
        return $model;
    }
}
