<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccessRightRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'user_group_id' => ['nullable', "exists:user_groups,id"],
            'read_access' => ['nullable'],
            'write_access' => ['nullable'],
            'create_access' => ['nullable'],
            'delete_access' => ['nullable'],
        ];
    }
}
