<?php

namespace App\Http\Query;

class MenuQuery
{
    public function sort($model, $request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
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
}
