<?php

namespace App\Http\Query;

use Illuminate\Support\Str;

abstract class HttpQuery
{
    public function isSort($request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            return true;
        }
        return false;
    }

    public function isSortField($model, $request, $fields)
    {
        foreach ($fields as $field) {
            if ($request->orderByColumn === $field) {
                $funcName = "orderBy" . Str::studly($field);
                $model = $model->$funcName($request->orderByDirection);
            }
        }
        return $model;
    }

    public function isSearchField($model, $request, $fields)
    {
        foreach ($fields as $field) {
            if ($request->$field) {
                $funcName = "where" . Str::studly($field);
                $model = $model->$funcName($request->$field);
            }
        }
        return $model;
    }

    public abstract function sort($model, $request);

    public abstract function search($model, $request);
}
