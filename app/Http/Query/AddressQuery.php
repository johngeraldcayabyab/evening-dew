<?php

namespace App\Http\Query;

class AddressQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'address_name') {
                $model = $model->orderByAddressName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'street_1') {
                $model = $model->orderByStreet1($request->orderByDirection);
            }
            if ($request->orderByColumn === 'street_2') {
                $model = $model->orderByStreet2($request->orderByDirection);
            }
            if ($request->orderByColumn === 'city') {
                $model = $model->orderByCity($request->orderByDirection);
            }
            if ($request->orderByColumn === 'state') {
                $model = $model->orderByState($request->orderByDirection);
            }
            if ($request->orderByColumn === 'zip') {
                $model = $model->orderByZip($request->orderByDirection);
            }
            if ($request->orderByColumn === 'country') {
                $model = $model->orderByCountry($request->orderByDirection);
            }
            if ($request->orderByColumn === 'contact') {
                $model = $model->orderByContact($request->orderByDirection);
            }
            if ($request->orderByColumn === 'type') {
                $model = $model->orderByType($request->orderByDirection);
            }
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    public function search($model, $request)
    {
        if ($request->address_name) {
            $model = $model->whereAddressName($request->address_name);
        }
        if ($request->street_1) {
            $model = $model->whereStreet1($request->street_1);
        }
        if ($request->street_2) {
            $model = $model->whereStreet2($request->street_2);
        }
        if ($request->city) {
            $model = $model->whereCity($request->city);
        }
        if ($request->state) {
            $model = $model->whereState($request->state);
        }
        if ($request->zip) {
            $model = $model->whereZip($request->zip);
        }
        if ($request->country) {
            $model = $model->whereCountry($request->country);
        }
        if ($request->contact) {
            $model = $model->whereContact($request->contact);
        }
        if ($request->type) {
            $model = $model->whereType($request->type);
        }
        return $model;
    }
}
