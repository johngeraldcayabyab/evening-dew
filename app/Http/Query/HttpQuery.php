<?php

namespace App\Http\Query;

abstract class HttpQuery
{
    public function isSort($request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
            return true;
        }
        return false;
    }

    public abstract function sort($model, $request);

    public abstract function search($model, $request);
}
