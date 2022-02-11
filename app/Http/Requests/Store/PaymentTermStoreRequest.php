<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class PaymentTermStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
        ];
    }
}
