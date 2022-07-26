<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourierRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'color' => 'nullable',
        ];
    }
}
