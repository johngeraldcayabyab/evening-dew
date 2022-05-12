<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'region' => ['required'],
            'region_code' => ['required'],
            'country_id' => ['nullable', "exists:countries,id"],
        ];
    }
}
