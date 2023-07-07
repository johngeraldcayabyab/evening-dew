<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OptionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'value' => 'nullable',
        ];
    }
}
