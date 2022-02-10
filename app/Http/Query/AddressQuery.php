<?php

namespace App\Http\Query;

class AddressQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            $model = $this->isSortField($model, $request, [
                'address_name',
                'street_1',
                'street_2',
                'city',
                'state',
                'zip',
                'country',
                'contact',
                'type',
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
            'address_name',
            'street_1',
            'street_2',
            'city',
            'state',
            'zip',
            'country',
            'contact',
            'type',
        ]);
    }
}
