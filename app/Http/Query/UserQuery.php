<?php

namespace App\Http\Query;

class UserQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'name') {
                $model = $model->orderByName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'email') {
                $model = $model->orderByEmail($request->orderByDirection);
            }
            if ($request->orderByColumn === 'email_verified_at') {
                $model = $model->orderByEmailVerifiedAt($request->orderByDirection);
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
        if ($request->email) {
            $model = $model->whereEmail($request->email);
        }
        return $model;
    }
}
