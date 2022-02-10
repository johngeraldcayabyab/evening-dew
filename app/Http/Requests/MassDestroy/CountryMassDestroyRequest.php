<?php

namespace App\Http\Requests\MassDestroy;

use Illuminate\Foundation\Http\FormRequest;

class CountryMassDestroyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids.*' => 'exists:countries,id'
        ];
    }
}
