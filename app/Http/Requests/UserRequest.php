<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required',
            'password' => 'nullable|confirmed|min:6',
            'avatar' => 'nullable'
        ];
    }
}
