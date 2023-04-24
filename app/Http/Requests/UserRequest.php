<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        $id = $this->user->id ?? null;
        return [
            'name' => "required|unique:users,name,{$id}",
            'email' => "required|unique:users,email,{$id}",
            'password' => 'nullable|confirmed|min:6',
            'app_menu_id' => ['required', 'exists:app_menus,id'],
            'avatar' => 'nullable',
        ];
    }
}
