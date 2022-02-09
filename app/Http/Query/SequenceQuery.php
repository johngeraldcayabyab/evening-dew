<?php

namespace App\Http\Query;

class SequenceQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'name') {
                $model = $model->orderByName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'sequence_code') {
                $model = $model->orderBySequenceCode($request->orderByDirection);
            }
            if ($request->orderByColumn === 'implementation') {
                $model = $model->orderByImplementation($request->orderByDirection);
            }
            if ($request->orderByColumn === 'prefix') {
                $model = $model->orderByPrefix($request->orderByDirection);
            }
            if ($request->orderByColumn === 'suffix') {
                $model = $model->orderBySuffix($request->orderByDirection);
            }
            if ($request->orderByColumn === 'sequence_size') {
                $model = $model->orderBySequenceSize($request->orderByDirection);
            }
            if ($request->orderByColumn === 'step') {
                $model = $model->orderByStep($request->orderByDirection);
            }
            if ($request->orderByColumn === 'next_number') {
                $model = $model->orderByNextNumber($request->orderByDirection);
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
        if ($request->sequence_code) {
            $model = $model->whereName($request->sequence_code);
        }
        if ($request->implementation) {
            $model = $model->whereName($request->implementation);
        }
        if ($request->prefix) {
            $model = $model->whereName($request->prefix);
        }
        if ($request->suffix) {
            $model = $model->whereName($request->suffix);
        }
        if ($request->sequence_size) {
            $model = $model->whereName($request->sequence_size);
        }
        if ($request->step) {
            $model = $model->whereName($request->step);
        }
        if ($request->next_number) {
            $model = $model->whereName($request->next_number);
        }
        return $model;
    }
}
