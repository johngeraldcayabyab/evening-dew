<?php

namespace App\Http\Query;

class UserQuery
{
    public function sort($model, $request)
    {
        if ($request->orderByColumn && $request->orderByDirection) {
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
