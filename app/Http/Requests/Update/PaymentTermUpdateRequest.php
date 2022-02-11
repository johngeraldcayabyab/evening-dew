<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class PaymentTermUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
        ];
    }
}
