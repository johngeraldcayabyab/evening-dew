<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|confirmed|min:6',
            'avatar' => 'nullable'
        ];
    }
}
