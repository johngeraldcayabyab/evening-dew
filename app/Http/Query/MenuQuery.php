<?php

namespace App\Http\Query;

class MenuQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'label') {
                $model = $model->orderByLabel($request->orderByDirection);
            }
            if ($request->orderByColumn === 'url') {
                $model = $model->orderByUrl($request->orderByDirection);
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
        if ($request->label) {
            $model = $model->whereLabel($request->label);
        }
        if ($request->url) {
            $model = $model->whereUrl($request->url);
        }
        return $model;
    }
}
