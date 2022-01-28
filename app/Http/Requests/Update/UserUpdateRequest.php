<?php

namespace App\Http\Requests\Update;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required',
        ];
    }
}
