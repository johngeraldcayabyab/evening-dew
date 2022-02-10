<?php

namespace App\Http\Query;

class SequenceQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'name',
                'sequence_code',
                'implementation',
                'prefix',
                'suffix',
                'sequence_size',
                'step',
                'next_number',
                'created_at',
            ]);
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    public function search($model, $request)
    {
        return $this->isSearchField($model, $request, [
            'name',
            'sequence_code',
            'implementation',
            'prefix',
            'suffix',
            'sequence_size',
            'step',
            'next_number',
        ]);
    }
}
