<?php

namespace App\Http\Query;

class CountryQuery extends HttpQuery
{
    public function sort($model, $request)
    {
        if ($this->isSort($request)) {
            if ($request->orderByColumn === 'country_name') {
                $model = $model->orderByCountryName($request->orderByDirection);
            }
            if ($request->orderByColumn === 'currency') {
                $model = $model->orderByCurrency($request->orderByDirection);
            }
            if ($request->orderByColumn === 'countryCode') {
                $model = $model->orderByCountryCode($request->orderByDirection);
            }
            if ($request->orderByColumn === 'country_calling_code') {
                $model = $model->orderByCountryCallingCode($request->orderByDirection);
            }
            if ($request->orderByColumn === 'vat_label') {
                $model = $model->orderByVatLabel($request->orderByDirection);
            }
        } else {
            $model = $model->orderByCreatedAt('desc');
        }
        return $model;
    }

    public function search($model, $request)
    {
        if ($request->country_name) {
            $model = $model->whereCountryName($request->country_name);
        }
        if ($request->currency) {
            $model = $model->whereCurrency($request->currency);
        }
        if ($request->country_code) {
            $model = $model->whereCountryCode($request->country_code);
        }
        if ($request->country_calling_code) {
            $model = $model->whereCountryCallingCode($request->country_calling_code);
        }
        if ($request->vat_label) {
            $model = $model->whereVatLabel($request->vat_label);
        }
        return $model;
    }
}
