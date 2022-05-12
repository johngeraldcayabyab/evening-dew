<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'province' => ['nullable'],
            'region_id' => ['nullable', "exists:regions,id"],
        ];
    }
}
